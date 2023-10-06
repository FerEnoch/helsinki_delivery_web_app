import { OFFERED_PRODUCTS } from './adds_products'

export const i18n = {
  TRADE_MARK: 'Helsinki Delivery',
  DEVELOPER: 'Powered by Dynamo',
  LANG: {
    ESP: {
      APP_TITLE: 'Helsinki Devlivery Web App',
      APP_DESCRIPTION: 'Hacé tu pedido y mandalo por WhatsApp!',
      UI: {
        CART: {
          FIRST_STEP_TITLE: '1 - Revisa tu compra',
          FIRST_STEP_ADDS: 'No te olvides de agregar',
          UNIT_MEASURE: 'Unidades',
          EMPTY_CART_MESSAGE: 'No hay productos por aqui',
          ADDS_LABELS: OFFERED_PRODUCTS,
          CONTINUE_SHOPPING: 'Seguir comprando',
          FOOTER_BUTTONS: {
            BACK: 'Volver',
            CLEAR_CART: 'Vaciar carrito',
            TOTAL_CART_AMOUNT: 'Monto total',
            NEXT_STEP: 'Ver formas de pago'
          }
        },
        MENU: 'Menu',
        PRESENTATION: 'Quienes somos',
        CONTACT: 'Contacto',
        DETAIL_CARD_PRODUCT: {
          BODY: {
            generic_description: 'Llevamos nuestros productos directo a la puerta de tu casa'
          },
          FOOTER: {
            generic_action: {
              /** The order of category array (index) is important for images of the DetailProduct component */
              categories: [/extras/i, /tabaquer[ií]a/i],
              text: 'No te olvides de completar tu carrito y envianos tu pedido por WhatsApp'
            },
            action: 'No te olvides del hielo y los cigarrillos',
            OFFERED_PRODUCTS
          }
        }
      }
    }
  }
}
