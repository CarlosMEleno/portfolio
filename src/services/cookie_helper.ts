/**
 * Set a cookie that expires in 1 year
 * @param name - Cookie name
 * @param value - Cookie value
 */
export function setPermanentCookie(name: string, value: string): void {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; Secure; SameSite=Lax`
}

/**
 * Set a cookie with custom expiration time
 * @param name - Cookie name
 * @param value - Cookie value
 * @param minutes - Minutes until expiration
 */
export function setTimedCookie(
  name: string,
  value: string,
  minutes: number
): void {
  const date = new Date()
  date.setTime(date.getTime() + minutes * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; Secure; SameSite=Lax`
}

/**
 * Read a cookie value by name
 * @param cookieName - Name of the cookie to read
 * @returns Cookie value or null if not found
 */
export function readCookie(cookieName: string): string | null {
  const cookieArray: string[] = document.cookie.split(';')

  for (const cookie of cookieArray) {
    const [key, value] = cookie.split('=')

    if (key.trim() === cookieName) {
      return decodeURIComponent(value)
    }
  }

  return null
}
