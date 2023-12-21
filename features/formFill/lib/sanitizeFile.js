export function sanitizeFile (file) {
  if (!file) return null
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf']
  return file && allowedTypes.includes(file.type)
}