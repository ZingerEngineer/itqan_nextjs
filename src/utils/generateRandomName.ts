import path from 'path'

/**
 * Sanitizes a string by removing or replacing unsafe characters.
 * @param str - The string to sanitize.
 * @returns The sanitized string.
 */
const sanitizeString = (str: string): string => {
  return str
    .replace(/[^a-zA-Z0-9-_\.]/g, '_') // Replace unsafe characters with underscores
    .replace(/_+/g, '_') // Replace multiple underscores with a single one
    .trim() // Remove leading and trailing whitespace
}

/**
 * Generates a unique and sanitized file name suitable for cloud storage.
 * @param originalName - The original file name (e.g., "photo.png").
 * @returns A new, unique, and sanitized file name (e.g., "photo_1633072800000_8374.png").
 */
export const generateRandomFileName = (originalName: string): string => {
  // Extract the file extension
  const extension = path.extname(originalName) // e.g., ".png"

  // Extract the base name without extension
  const baseName = path.basename(originalName, extension) // e.g., "photo"

  // Sanitize the base name
  const sanitizedBaseName = sanitizeString(baseName)

  // Generate a unique identifier using timestamp and random number
  const timestamp = Date.now() // Current timestamp in milliseconds
  const randomNumber = Math.floor(Math.random() * 10000) // Random number between 0 and 9999

  // Combine the sanitized base name, timestamp, and random number
  const uniqueId = `${timestamp}_${randomNumber}` // e.g., "1633072800000_8374"

  // Construct the new file name
  const newFileName = `${sanitizedBaseName}_${uniqueId}${extension}` // e.g., "photo_1633072800000_8374.png"

  return newFileName
}
