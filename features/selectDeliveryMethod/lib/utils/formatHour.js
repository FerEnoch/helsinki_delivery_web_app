export function formatHour (number) {
  let formattedString = ''
  if (Number.isInteger(number)) {
    formattedString = `${number < 10 ? `0${number}` : number}:00`
  } else {
    let [integer, decimal] = number.toString().split('.')
    integer = integer < 10 ? `0${integer}` : integer
    decimal = `${decimal}${decimal?.length === 1 ? '0' : ''}`
    formattedString = `${integer}:${decimal}`
  }
  return formattedString
}
