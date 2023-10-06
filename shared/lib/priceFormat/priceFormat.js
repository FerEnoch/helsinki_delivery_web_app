const options = {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 1,
  trailingZeroDisplay: 'stripIfInteger'
}
const intlFormater = new Intl.NumberFormat('es-AR', options)

export const priceFormater = intlFormater.format
