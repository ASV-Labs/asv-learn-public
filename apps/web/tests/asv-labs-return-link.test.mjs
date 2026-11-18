import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const source = fs.readFileSync(
  new URL('../components/Objects/Menus/OrgMenu.tsx', import.meta.url),
  'utf8',
)

test('global Learn navigation includes an accessible ASV Labs return link', () => {
  assert.equal((source.match(/href="https:\/\/asv-labs\.com\/"/g) || []).length, 2)
  assert.equal((source.match(/aria-label="ASV Labs home"/g) || []).length, 2)
  assert.match(source, /hidden md:inline-flex min-h-11/)
  assert.match(source, /inline-flex min-h-11 w-full/)
  assert.doesNotMatch(source, /target="_blank"/)
})

