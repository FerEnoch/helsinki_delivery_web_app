export const UPDATE_QUANTITY = {
  INCREMENT: (update) => () => update(prevNum => {
    /* CONSULTAR SI HAY ALGÚN LÍMITE DE COMPRA (POR LA CAPACIDAD EL DELIVERY)  */
    if (prevNum === 10) {
      return 10
    } else {
      return prevNum + 1
    }
  }),
  DECREMENT: (update, minimun = 1) => () => update(prevNum => {
    if (prevNum === minimun) {
      return minimun
    } else {
      return prevNum - 1
    }
  })
}

export const CART_OPERATIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT'
}
