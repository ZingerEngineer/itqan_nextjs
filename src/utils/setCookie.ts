// Utility function to set a cookie
export function setCookie(
  name: string,
  value: string,
  days: number,
  path: string = '/'
) {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000) // Convert days to milliseconds

  const cookieString = `${name}=${encodeURIComponent(
    value
  )};expires=${expires.toUTCString()};path=${path}`

  // For client-side (browser)
  if (typeof document !== 'undefined') {
    document.cookie = cookieString
  }

  // For server-side (Node.js)
  return cookieString // You can return this string to use it in the response headers on server-side
}
