import { OFFERED_PRODUCTS } from './adds_products'
import { PAYMENT_OPTIONS } from './payment_options'

export const i18n = {
  TRADE_MARK: 'Helsinki Delivery',
  DEVELOPER: 'Powered by Dynamo',
  LANG: {
    ESP: {
      APP_TITLE: 'Helsinki Devlivery App',
      APP_DESCRIPTION: 'Conocé nuestros productos y hacé tu pedido online. Te enviamos cualquier bebida o accesorio al instante',
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
            GO_TO_PAYMENTS: 'Ver formas de pago',
            CONFIRM_ORDER: 'Confirmar solicitud',
            GO_TO_FORM: 'Datos de envío'
          },
          PAYMENT_OPTIONS,
          PAY_METHOD: '3 - Aboná en tu app de pagos preferida'
        },
        MENU: {
          ABOUT: 'Quienes somos',
          CONTACT: 'Contacto',
          FAQ: 'Preguntas frecuentes',
          ATTENTION: 'Día y horario de pedidos',
          DELIVERY_ZONE: 'Zonas de entrega'
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
            ON_INVALID: '** No se permiten caracteres especiales'
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
          message: 'Gracias por tu compra',
          text: (contact) => `Cualquier cosa que suceda nos comunicaremos con vos. Podés ponerte en contacto con nosotros al ${contact}`,
          action: 'Volver a inicio'
        }
      },
      G_DRIVE_UI: {
        ORDER: {
          NO_RECEIPT_MESSAGE: 'No se adjuntó comprobante de pago'
        }
      }
    }
  }
}
