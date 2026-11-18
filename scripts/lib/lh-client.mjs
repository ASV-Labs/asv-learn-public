/**
 * Shared LearnHouse local API helpers for catalog import scripts.
 */
import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { homedir } from 'node:os'

export const BASE = (process.env.LH_BASE_URL || 'http://localhost:8088').replace(/\/$/, '')
export const API = `${BASE}/api/v1`
export const ORG_SLUG = process.env.LH_ORG_SLUG || 'charles-learning-lab'

export function loadPassword() {
  if (process.env.LH_PASSWORD) return process.env.LH_PASSWORD
  const credPath = resolve(homedir(), '.learnhouse/local-community-admin.txt')
  if (!existsSync(credPath)) throw new Error('Set LH_PASSWORD or provide ~/.learnhouse/local-community-admin.txt')
  const text = readFileSync(credPath, 'utf8')
  const m = text.match(/Admin password:\s*(.+)/)
  if (!m) throw new Error('Could not parse admin password from credentials file')
  return m[1].trim()
}

export function loadEmail() {
  if (process.env.LH_EMAIL) return process.env.LH_EMAIL
  const credPath = resolve(homedir(), '.learnhouse/local-community-admin.txt')
  if (existsSync(credPath)) {
    const text = readFileSync(credPath, 'utf8')
    const m = text.match(/Admin email:\s*(.+)/)
    if (m) return m[1].trim()
  }
  return 'admin@school.dev'
}

export async function loginCookie() {
  const email = loadEmail()
  const password = loadPassword()
  const body = new URLSearchParams({ username: email, password })
  const loginRes = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!loginRes.ok) throw new Error(`login failed: ${loginRes.status} ${await loginRes.text()}`)
  const setCookie = loginRes.headers.getSetCookie?.() || []
  const cookie = setCookie.map((c) => c.split(';')[0]).join('; ')
  const data = await loginRes.json()
  const token = data.access_token || data.tokens?.access_token || data.token
  if (!token && !cookie) throw new Error('login response missing token/cookie')
  return { token, cookie }
}

export async function api(auth, method, path, { json, formData, query } = {}) {
  const url = new URL(`${API}${path}`)
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v))
    }
  }

  const attempts = auth.cookie
    ? [
        {
          headers: {
            Cookie: auth.cookie,
            ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
          },
        },
      ]
    : [
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
          },
        },
      ]

  let lastErr
  for (const attempt of attempts) {
    let body
    if (formData) body = formData
    else if (json !== undefined) body = JSON.stringify(json)

    const res = await fetch(url, { method, headers: attempt.headers, body })
    const text = await res.text()
    let data
    try {
      data = text ? JSON.parse(text) : null
    } catch {
      data = text
    }
    if (res.ok) return data
    lastErr = new Error(
      `${method} ${path} -> ${res.status}: ${typeof data === 'string' ? data : JSON.stringify(data).slice(0, 500)}`
    )
    if (res.status !== 401 && res.status !== 403) break
  }
  throw lastErr
}

export async function listOrgCourses(auth, orgSlug = ORG_SLUG) {
  return api(auth, 'GET', `/courses/org_slug/${orgSlug}/page/1/limit/100`)
}

export async function getOrg(auth, orgSlug = ORG_SLUG) {
  return api(auth, 'GET', `/orgs/slug/${orgSlug}`)
}
