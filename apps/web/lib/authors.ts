/**
 * Learner-facing author labels.
 * Platform seed users (username `admin`) must not appear as `@admin` on public course UI.
 */

export type AuthorUserLike = {
  username?: string | null
  first_name?: string | null
  last_name?: string | null
}

const DEFAULT_ORG_BRAND = 'ASV Labs'

export function isPlatformSeedAuthor(user: AuthorUserLike | null | undefined): boolean {
  const username = (user?.username || '').trim().toLowerCase()
  return username === 'admin'
}

/** Display name for course author chips / bylines. Never returns `@admin`. */
export function getLearnerAuthorDisplayName(
  user: AuthorUserLike | null | undefined,
  options?: { orgBrand?: string | null }
): string {
  const brand = (options?.orgBrand || '').trim() || DEFAULT_ORG_BRAND

  if (!user || isPlatformSeedAuthor(user)) {
    return brand
  }

  const first = (user.first_name || '').trim()
  const last = (user.last_name || '').trim()
  if (first && last) return `${first} ${last}`
  if (first || last) return first || last

  const username = (user.username || '').trim()
  return username ? `@${username}` : brand
}

/** Optional `@username` subtitle. Hidden for platform seed admin. */
export function getLearnerAuthorUsernameLabel(
  user: AuthorUserLike | null | undefined
): string | null {
  if (!user || isPlatformSeedAuthor(user)) return null
  const username = (user.username || '').trim()
  return username ? `@${username}` : null
}
