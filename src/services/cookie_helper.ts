export function setPermanentCookie(name: string, value: string): void {
  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; Secure; SameSite=Lax`
}

export function setTimedCookie(
  name: string,
  value: string,
  minutes: number
): void {
  const date = new Date()
  date.setTime(date.getTime() + minutes * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; Secure; SameSite=Lax`
}

export function readCookie(findedCookie: string): string | null {
  const cookieArray = document.cookie.split(';')

  for (const cookie of cookieArray) {
    const [key, value] = cookie.split('=')

    if (key.trim() === findedCookie) {
      return decodeURIComponent(value)
    }
  }

  return null
}
