import { OFFERED_PRODUCTS } from '../adds_products'
import { PAYMENT_OPTIONS } from '../payment_options'
import { TIME_BLOCKER } from '../timeBlockerMessages'

import { MENU } from '../menu'
import { CASH_DISCOUNT_PERCENTAGE } from '@/shared/config/cacheDiscount'

export const i18n = {
  TRADE_MARK: 'Helsinki Delivery',
  DEVELOPER: 'Powered by Dynamo',
  LANG: {
    ESP: {
      APP_TITLE: 'Helsinki Devlivery App',
      APP_DESCRIPTION: 'Conocé nuestros productos y hacé tu pedido online. Te enviamos cualquier bebida o accesorio al instante',
      UI: {
        MENU,
        DISCOUNT_PIN: `${CASH_DISCOUNT_PERCENTAGE}% OFF`,
        TOAST: {
          TAKE_AWAY_LABEL: 'Lo paso a buscar!',
          DISCOUNT: `Estás de suerte!\nTenemos ${CASH_DISCOUNT_PERCENTAGE}% de descuento por pago efectivo!`,
          SEE_BUSINESS_HOURS: 'Días y horarios de atención',
          AGE_POLICY: {
            MESSAGE: 'Debes tener más de 18 años para comprar bebidas alcohólicas',
            FAQ: 'Revisar política',
            AGREE: 'De acuerdo'
          },
          TIME_BLOCKER
        },
        ZONES_PROMPT: {
          PROMPT: 'Atención\nAntes de seguir, revisa si estás dentro de las zonas de envío',
          BUTTON: 'Ver zonas de envío',
          MAP_BUTTON: 'Ver mapa de entregas'
        },
        BLOCKED_APP_PROMPT: {
          ATTENTION: 'Atención\n',
          BUTTON: 'Ver días y horarios de atención',
          AGREE: 'De acuerdo'
        },
        SEARCH_BAR: {
          PLACEHOLDER: 'Buscá tu producto',
          NOT_FOUND_PRODUCTS: 'No se encuentran productos. Prueba modificar el texto'
        },
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
            GO_TO_PAYMENTS: 'Ver formas de pago',
            CONFIRM_ORDER: 'Confirmar solicitud',
            GO_TO_FORM: 'Datos de envío'
          },
          PAYMENT_OPTIONS,
          PAY_METHOD: '3 - Aboná en tu app de pagos preferida'
        },
        DETAIL_CARD_PRODUCT: {
          BODY: {
            generic_description: 'Llevamos nuestros productos directo a la puerta de tu casa'
          },
          FOOTER: {
            action: 'No te olvides del hielo y los cigarrillos',
            generic_action: {
              /** The order of category array (index) is important for images of the DetailProduct component */
              categories: [/extras/i, /tabaquer[ií]a/i],
              text: 'No te olvides de completar tu carrito y envianos tu pedido'
            },
            OFFERED_PRODUCTS
          }
        },
        CLIENT_FORM: {
          FORM_TITLE: 'Completá el formulario con tus datos',
          FIELD_NAME: {
            LABEL: 'Nombre',
            ON_INVALID: '** No se permiten caracteres especiales'
          },
          FIELD_ADDRESS: {
            LABEL: 'Dirección de entrega',
            EXTRA_INFO: 'Añadir información extra',
            SUMMARY: 'Información extra o aclaración que necesitemos saber para el envío',
            ON_INVALID: '** No se permiten caracteres especiales',
            TAKE_AWAY: 'Punto de encuentro:\nUrquiza y Cándido Pujato\nHora: a coordinar'
          },
          FIELD_PHONE: {
            LABEL: 'Nº telefónico',
            ON_INVALID: '** Por favor inserta solo números',
            INITIAL_CHAR_NUM: '0',
            INITIAL_PHONE_NUM: '15',
            ON_TOO_SHORT: '** Por favor escribe el número completo'
          },
          FIELD_RECEIPT: {
            LABEL: 'Adjunta tu comprobante de pago',
            ON_INVALID: '** Por favor adjunta un comprobante de pago válido'
          },
          FORM_SUBMIT: 'Enviar pedido'
        },
        ORDER_PROCESSING: {
          title: 'Estamos procesando tu pedido',
          message: 'Aguarda unos instantes'
        },
        ORDER_SUCCESS: {
          title: 'Tu pedido está en camino',
          takeAwayTitle: 'Nos veremos en el punto de encuentro',
          message: 'Gracias por tu compra',
          text: 'Si es necesario nos comunicaremos con vos',
          contact: ['¿Alguna duda?', 'Contactate con nosotros'],
          action: 'Volver a inicio'
        },
        ERROR: {
          NOT_FOUND: {
            LABEL: 'Lo sentimos...',
            MESSAGE: 'Parece que no hay nada por aquí...'
          },
          APP_ERROR: {
            LABEL: 'Oops...',
            MESSAGE: 'Algo ha sucedido y la app está temporalmente fuera de servicio',
            MESSAGE_2: 'Intenta de nuevo más tarde por favor'
          }
        }
      },
      G_DRIVE_UI: {
        ORDER: {
          NO_RECEIPT_MESSAGE: 'Paga en efectivo',
          TAKE_AWAY_MESSAGE: 'TAKE-AWAY'
        }
      }
    }
  }
}
