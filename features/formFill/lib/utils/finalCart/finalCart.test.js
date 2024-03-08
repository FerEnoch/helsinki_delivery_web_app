import { describe, it, expect, vi, afterEach } from 'vitest'
import { useFinalCart } from '.'
import { initialStock } from '@/__test__/clientStock/initialStock'

vi.mock('@/entities/lib/store', () => ({
  useAppStore: () => ({ stockProducts: initialStock })
}))

afterEach(() => {
  const reset = vi.resetAllMocks
  reset()
})

describe('FinalCart', () => {
  it('Should build final cart with only 1 combo', () => {
    const cart = [
      {
        quantity: 1,
        isCombo: true,
        id: '*002',
        products: [['#003', '2'], ['#055', '2'], ['#157', '2']]
      }
    ]

    const expectedFinalCartMap = [
      { id: '#003', quantity: 2 },
      { id: '#055', quantity: 2 },
      { id: '#157', quantity: 2 }
    ]

    const finalCart = useFinalCart(cart)
    const finalCartMap = finalCart.map(({ id, quantity }) => ({ id, quantity }))

    expect(finalCartMap).toEqual(expectedFinalCartMap)
  })

  it('Should build final cart with 1 combo and extra products', () => {
    const cart = [
      { quantity: 1, isCombo: false, id: '#003' },
      { quantity: 10, isCombo: false, id: '#055' },
      { quantity: 1, isCombo: false, id: '#043' },
      {
        quantity: 1,
        isCombo: true,
        id: '*002',
        products: [['#003', '2'], ['#055', '2'], ['#157', '2']]
      }
    ]

    const expectedFinalCartMap = [
      { id: '#003', quantity: 3 },
      { id: '#055', quantity: 12 },
      { id: '#157', quantity: 2 },
      { id: '#043', quantity: 1 }
    ]

    const finalCart = useFinalCart(cart)
    const finalCartMap = finalCart.map(({ id, quantity }) => ({ id, quantity }))

    expect(finalCartMap).toEqual(expectedFinalCartMap)
  })

  it('Should build final cart with 2 of the same combo', () => {
    const cart = [
      {
        quantity: 2,
        isCombo: true,
        id: '*002',
        products: [['#003', '2'], ['#055', '2'], ['#157', '2']]
      }
    ]

    const expectedFinalCartMap = [
      { id: '#003', quantity: 4 },
      { id: '#055', quantity: 4 },
      { id: '#157', quantity: 4 }
    ]

    const finalCart = useFinalCart(cart)
    const finalCartMap = finalCart.map(({ id, quantity }) => ({ id, quantity }))

    expect(finalCartMap).toEqual(expectedFinalCartMap)
  })

  it('Should build final cart with 2 of the same combo and individual products', () => {
    const cart = [
      {
        quantity: 2,
        isCombo: true,
        id: '*002',
        products: [['#003', '2'], ['#055', '2'], ['#157', '2']]
      },
      { quantity: 1, isCombo: false, id: '#003' },
      { quantity: 1, isCombo: false, id: '#043' }
    ]

    const expectedFinalCartMap = [
      { id: '#003', quantity: 5 },
      { id: '#055', quantity: 4 },
      { id: '#157', quantity: 4 },
      { id: '#043', quantity: 1 }
    ]

    const finalCart = useFinalCart(cart)
    const finalCartMap = finalCart.map(({ id, quantity }) => ({ id, quantity }))

    expect(finalCartMap).toEqual(expectedFinalCartMap)
  })

  it('Should build final cart with different combos, one each', () => {
    const cart = [
      {
        quantity: 1,
        isCombo: true,
        id: '*002',
        products: [['#003', '2'], ['#055', '2'], ['#157', '2']]
      },
      {
        quantity: 1,
        isCombo: true,
        id: '*001',
        products: [['#013', '2'], ['#025', '2'], ['#007', '2']]
      }
    ]

    const expectedFinalCartMap = [
      { id: '#003', quantity: 2 },
      { id: '#055', quantity: 2 },
      { id: '#157', quantity: 2 },
      { id: '#013', quantity: 2 },
      { id: '#025', quantity: 2 },
      { id: '#007', quantity: 2 }
    ]

    const finalCart = useFinalCart(cart)
    const finalCartMap = finalCart.map(({ id, quantity }) => ({ id, quantity }))

    expect(finalCartMap).toEqual(expectedFinalCartMap)
  })

  it('Should build final cart with different combos, diff quantities each', () => {
    const cart = [
      {
        quantity: 1,
        isCombo: true,
        id: '*002',
        products: [['#003', '2'], ['#055', '2'], ['#157', '2']]
      },
      {
        quantity: 2,
        isCombo: true,
        id: '*001',
        products: [['#013', '2'], ['#025', '2'], ['#007', '2']]
      }
    ]

    const expectedFinalCartMap = [
      { id: '#003', quantity: 2 },
      { id: '#055', quantity: 2 },
      { id: '#157', quantity: 2 },
      { id: '#013', quantity: 4 },
      { id: '#025', quantity: 4 },
      { id: '#007', quantity: 4 }
    ]

    const finalCart = useFinalCart(cart)
    const finalCartMap = finalCart.map(({ id, quantity }) => ({ id, quantity }))

    expect(finalCartMap).toEqual(expectedFinalCartMap)
  })

  // it('Should build final cart: different combos with same quantity, and repeated prods.', () => {
  //   const cart = [
  //     {
  //       quantity: 1,
  //       isCombo: true,
  //       id: '*002',
  //       products: [['#003', '2'], ['#055', '2'], ['#157', '2']]
  //     },
  //     {
  //       quantity: 1,
  //       isCombo: true,
  //       id: '*001',
  //       products: [['#003', '2'], ['#025', '2'], ['#007', '2']]
  //     }
  //   ]

  //   const expectedFinalCartMap = [
  //     { id: '#003', quantity: 4 },
  //     { id: '#055', quantity: 2 },
  //     { id: '#157', quantity: 2 },
  //     { id: '#025', quantity: 2 },
  //     { id: '#007', quantity: 2 }
  //   ]

  //   const finalCart = useFinalCart(cart)
  //   const finalCartMap = finalCart.map(({ id, quantity }) => ({ id, quantity }))

  //   expect(finalCartMap).toEqual(expectedFinalCartMap)
  // })
})
