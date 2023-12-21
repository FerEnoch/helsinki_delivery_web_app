const MB_1 = 1048576 // 1 MB in bytes

export function sanitizeFile (file) {
  if (!file) return null
  if (file.size > MB_1 * 3) return null // max file size of 3MB

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf']
  return file && allowedTypes.includes(file.type)
}
