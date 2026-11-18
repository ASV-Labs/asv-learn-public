import assert from 'node:assert/strict'
import test from 'node:test'

import { proxyContent } from '../src/index.mjs'

test('rejects requests outside the Learn content route', async () => {
  const response = await proxyContent(new Request('https://learn.asv-labs.com/courses'))
  assert.equal(response.status, 404)
})

test('preserves a Safari byte range and the origin 206 response', async () => {
  const request = new Request(
    'https://learn.asv-labs.com/content/orgs/asv/course/intro.mp4',
    { headers: { Range: 'bytes=0-1' } }
  )

  let receivedRequest
  let receivedOptions
  const response = await proxyContent(request, async (originRequest, options) => {
    receivedRequest = originRequest
    receivedOptions = options
    return new Response(new Uint8Array([0, 0]), {
      status: 206,
      headers: {
        'Accept-Ranges': 'bytes',
        'Content-Range': 'bytes 0-1/3995663',
        'Content-Type': 'video/mp4'
      }
    })
  })

  assert.equal(receivedRequest.headers.get('range'), 'bytes=0-1')
  assert.equal(receivedOptions.cf.cacheTtl, 0)
  assert.equal(response.status, 206)
  assert.equal(response.headers.get('accept-ranges'), 'bytes')
  assert.equal(response.headers.get('content-range'), 'bytes 0-1/3995663')
  assert.equal(response.headers.get('content-type'), 'video/mp4')
  assert.equal(response.headers.get('cache-control'), 'public, max-age=86400, no-transform')
  assert.equal(response.headers.get('cdn-cache-control'), 'no-store')
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), new Uint8Array([0, 0]))
})

test('repairs a cached full intro response into the requested Safari byte range', async () => {
  const request = new Request(
    'https://learn.asv-labs.com/content/orgs/asv/courses/course-id/thumbnails/intro.mp4',
    { headers: { Range: 'bytes=2-4' } }
  )

  const response = await proxyContent(request, async (originRequest) => {
    assert.equal(originRequest.headers.get('accept-encoding'), 'identity')
    return new Response(new Uint8Array([10, 11, 12, 13, 14, 15]), {
      status: 200,
      headers: {
        'Content-Length': '6',
        'Content-Type': 'video/mp4',
        'Content-Encoding': 'gzip'
      }
    })
  })

  assert.equal(response.status, 206)
  assert.equal(response.headers.get('accept-ranges'), 'bytes')
  assert.equal(response.headers.get('content-range'), 'bytes 2-4/6')
  assert.equal(response.headers.get('content-length'), '3')
  assert.equal(response.headers.get('content-encoding'), null)
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), new Uint8Array([12, 13, 14]))
})

test('does not buffer or rewrite non-intro content responses', async () => {
  const request = new Request(
    'https://learn.asv-labs.com/content/orgs/asv/courses/course-id/lesson.mp4',
    { headers: { Range: 'bytes=2-4' } }
  )

  const response = await proxyContent(request, async () => new Response('unchanged', { status: 200 }))
  assert.equal(response.status, 200)
  assert.equal(await response.text(), 'unchanged')
})
