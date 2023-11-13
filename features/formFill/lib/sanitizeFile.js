export function sanitizeFile (file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  return file && allowedTypes.includes(file.type)
}
