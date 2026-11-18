const CONTENT_PREFIX = '/content/'
const INTRO_VIDEO_PATH = /\/courses\/[^/]+\/thumbnails\/[^/]+\.mp4$/i
const MAX_INTRO_BYTES = 32 * 1024 * 1024

function parseSingleByteRange(value, size) {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(value?.trim() ?? '')
  if (!match || (!match[1] && !match[2]) || !Number.isSafeInteger(size) || size <= 0) {
    return null
  }

  let start
  let end

  if (!match[1]) {
    const suffixLength = Number(match[2])
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) return null
    start = Math.max(size - suffixLength, 0)
    end = size - 1
  } else {
    start = Number(match[1])
    end = match[2] ? Number(match[2]) : size - 1
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end)) return null
    if (start >= size || start > end) return null
    end = Math.min(end, size - 1)
  }

  return { start, end }
}

async function restoreIntroRange(request, response) {
  const rangeHeader = request.headers.get('range')
  const url = new URL(request.url)
  if (
    request.method !== 'GET' ||
    !rangeHeader ||
    response.status !== 200 ||
    !INTRO_VIDEO_PATH.test(url.pathname)
  ) {
    return response
  }

  const declaredLength = Number(response.headers.get('content-length'))
  if (Number.isFinite(declaredLength) && declaredLength > MAX_INTRO_BYTES) {
    return response
  }

  const body = new Uint8Array(await response.arrayBuffer())
  if (body.byteLength > MAX_INTRO_BYTES) {
    return new Response('Intro video exceeds the byte-range repair limit.', { status: 502 })
  }

  const range = parseSingleByteRange(rangeHeader, body.byteLength)
  if (!range) {
    return new Response(null, {
      status: 416,
      headers: { 'Content-Range': `bytes */${body.byteLength}` }
    })
  }

  const headers = new Headers(response.headers)
  headers.delete('Content-Encoding')
  headers.set('Accept-Ranges', 'bytes')
  headers.set('Content-Range', `bytes ${range.start}-${range.end}/${body.byteLength}`)
  headers.set('Content-Length', String(range.end - range.start + 1))

  return new Response(body.slice(range.start, range.end + 1), {
    status: 206,
    headers
  })
}

export async function proxyContent(request, fetchImpl = fetch) {
  const url = new URL(request.url)
  if (url.hostname !== 'learn.asv-labs.com' || !url.pathname.startsWith(CONTENT_PREFIX)) {
    return new Response('Not found', { status: 404 })
  }

  // A Worker subrequest goes to the origin and does not re-enter this route.
  // Disable edge caching for this subrequest so Range reaches the origin
  // unchanged; the browser can still cache according to the origin response.
  const originHeaders = new Headers(request.headers)
  originHeaders.set('Accept-Encoding', 'identity')
  const originRequest = new Request(request, { headers: originHeaders })

  const originResponse = await fetchImpl(originRequest, {
    cf: {
      cacheEverything: false,
      cacheTtl: 0,
      cacheTtlByStatus: {
        '200-599': 0
      }
    }
  })

  const response = await restoreIntroRange(request, originResponse)
  const headers = new Headers(response.headers)
  headers.set('Cache-Control', 'public, max-age=86400, no-transform')
  headers.set('CDN-Cache-Control', 'no-store')
  headers.set('X-ASV-Learn-Range-Worker', request.headers.has('range') ? 'range-present-v2' : 'no-range-v2')

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  })
}

export default {
  fetch(request) {
    return proxyContent(request)
  }
}
