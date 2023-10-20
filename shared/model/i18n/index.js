import { OFFERED_PRODUCTS } from './adds_products'
import { PAYMENT_OPTIONS } from './payment_options'

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
          SECOND_STEP_TITLE: '2 - Elegi tu forma de pago',
          UNIT_MEASURE: 'Unidades',
          EMPTY_CART_MESSAGE: 'No hay productos en tu carrito',
          ADDS_LABELS: OFFERED_PRODUCTS,
          CONTINUE_SHOPPING: 'Seguir comprando',
          FOOTER_BUTTONS: {
            BACK: 'Volver',
            CLEAR_CART: 'Vaciar carrito',
            TOTAL_CART_AMOUNT: 'Monto total',
            NEXT_STEP: 'Ver formas de pago',
            FORM: {
              GO_TO_FORM: 'Datos para el envío',
              NAME: 'Tu nombre',
              TEL: 'Tu teléfono',
              DIR: 'Tu dirección'
            }
          },
          PAYMENT_OPTIONS
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
        },
        CLIENT_FORM: {
          FORM_TITLE: 'Tus datos para el envío',
          FIELD_NAME: {
            LABEL: 'Tu nombre',
            ON_INVALID: '** No se permiten caracteres especiales'
          },
          FIELD_ADDRESS: {
            LABEL: '¿Dónde te lo llevamos?',
            EXTRA_INFO: 'Añadir información extra',
            SUMMARY: '¿Alguna información extra o aclaración que necesitemos saber para el envío?',
            ON_INVALID: '** No se permiten caracteres especiales'
          },
          FIELD_PHONE: {
            LABEL: 'Tu teléfono',
            ON_INVALID: '** Por favor inserta solo números',
            INITIAL_CHAR_NUM: '0',
            INITIAL_PHONE_NUM: '15'
          },
          FIELD_RECEIPT: {
            LABEL: 'Adjunta tu comprobante de pago',
            ON_INVALID: '** Por favor adjunta el comprobante de pago'
          },
          FORM_SUBMIT: 'Enviar pedido'
        }
      }
    }
  }
}
