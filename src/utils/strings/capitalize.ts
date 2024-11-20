/**
 * Capitalizes the first character of the string and lowercases the rest.
 * @param str - The input string to capitalize.
 * @returns The capitalized string.
 */
function capitalize(str: string): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export default capitalize
