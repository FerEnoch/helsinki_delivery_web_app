import { CASH_DISCOUNT_PERCENTAGE } from '@/shared/config/cashDiscount'

export function getCartAmount ({ cart, paymentMethod, selectedDeliveryMethod }) {
  let productsTotal = cart.reduce((total, product) => {
    return total + (Number(product.price) * product.quantity)
  }, 0)

  const deliveryMethodTotal = cart.length > 0 ? selectedDeliveryMethod?.price : 0

  let cashDiscount
  if (paymentMethod?.isCash) {
    cashDiscount = productsTotal * CASH_DISCOUNT_PERCENTAGE / 100
    productsTotal = productsTotal - cashDiscount
  }

  return {
    productsTotal,
    cashDiscount,
    finalPrice: (productsTotal + deliveryMethodTotal).toFixed(2)
  }
}
