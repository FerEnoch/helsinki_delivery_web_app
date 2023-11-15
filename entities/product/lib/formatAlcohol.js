export const formatAlcohol = (alcohol) => {
  let number
  if (alcohol.includes('%')) {
    const string = alcohol.replace('%', '')
    number = Number(string)
  } else {
    number = Number(alcohol)
  }
  return number
}
