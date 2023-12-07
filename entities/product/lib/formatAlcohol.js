export const formatAlcohol = (alcohol) => {
  let string = String(alcohol)
  if (string.includes('%')) string = string.replace('%', '')
  return string
}
