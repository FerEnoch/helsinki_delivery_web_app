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
  it('Should build final cart: only 1 combo', () => {
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

  it('Should build final cart: 1 combo & extra products', () => {
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
      { id: '#043', quantity: 1 },
      { id: '#157', quantity: 2 }
    ]

    const finalCart = useFinalCart(cart)
    const finalCartMap = finalCart.map(({ id, quantity }) => ({ id, quantity }))

    expect(finalCartMap).toEqual(expectedFinalCartMap)
  })

  it('Should build final cart: diff repetitions of the same combo', () => {
    const firstAsert = [
      [
        {
          quantity: 2,
          isCombo: true,
          id: '*002',
          products: [['#003', '2'], ['#055', '2'], ['#157', '2']]
        }
      ],
      [
        { id: '#003', quantity: 4 },
        { id: '#055', quantity: 4 },
        { id: '#157', quantity: 4 }
      ]
    ]

    const secondAssert = [
      [
        {
          quantity: 3,
          isCombo: true,
          id: '*002',
          products: [['#013', '2'], ['#155', '2'], ['#007', '2']]
        }
      ],
      [
        { id: '#013', quantity: 6 },
        { id: '#155', quantity: 6 },
        { id: '#007', quantity: 6 }
      ]
    ]

    const thirddAssert = [
      [
        {
          quantity: 7,
          isCombo: true,
          id: '*002',
          products: [['#103', '2'], ['#005', '2'], ['#017', '2']]
        }
      ],
      [
        { id: '#103', quantity: 14 },
        { id: '#005', quantity: 14 },
        { id: '#017', quantity: 14 }
      ]
    ]

    const asserts = [firstAsert, secondAssert, thirddAssert]
    asserts.forEach(([input, expected]) => {
      const finalCart = useFinalCart(input)
      const finalCartMap = finalCart.map(({ id, quantity }) => ({ id, quantity }))

      expect(finalCartMap).toEqual(expected)
    })
  })

  it('Should build final cart: 2 of the same combo & individual products', () => {
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

  it('Should build final cart: diff combos, one each', () => {
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

  it('Should build final cart: diff combos, diff quantities each', () => {
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

  it('Should build final cart: diff combos w/dif quantity each, repeated prods', () => {
    const firstAsert = [[
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
        products: [['#003', '2'], ['#025', '2'], ['#007', '2']]
      }
    ], [
      { id: '#003', quantity: 4 },
      { id: '#055', quantity: 2 },
      { id: '#157', quantity: 2 },
      { id: '#025', quantity: 2 },
      { id: '#007', quantity: 2 }
    ]]

    const secondAssert = [[
      {
        quantity: 3,
        isCombo: true,
        id: '*002',
        products: [['#003', '2'], ['#055', '2'], ['#157', '2']]
      },
      {
        quantity: 1,
        isCombo: true,
        id: '*001',
        products: [['#003', '2'], ['#025', '2'], ['#055', '2']]
      }
    ], [
      { id: '#003', quantity: 8 },
      { id: '#055', quantity: 8 },
      { id: '#157', quantity: 6 },
      { id: '#025', quantity: 2 }
    ]]

    const thirddAssert = [[
      {
        quantity: 3,
        isCombo: true,
        id: '*002',
        products: [['#003', '2'], ['#055', '2'], ['#157', '2']]
      },
      {
        quantity: 2,
        isCombo: true,
        id: '*001',
        products: [['#003', '2'], ['#025', '2'], ['#055', '2']]
      }
    ], [
      { id: '#003', quantity: 10 },
      { id: '#055', quantity: 10 },
      { id: '#157', quantity: 6 },
      { id: '#025', quantity: 4 }
    ]]

    const asserts = [firstAsert, secondAssert, thirddAssert]
    asserts.forEach(([input, expected]) => {
      const finalCart = useFinalCart(input)
      const finalCartMap = finalCart.map(({ id, quantity }) => ({ id, quantity }))

      expect(finalCartMap).toEqual(expected)
    })
  })

  it('Should build final cart: diff combos w/dif quantity each, & individual prods', () => {
    const firstAsert = [[
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
        products: [['#003', '2'], ['#025', '2'], ['#007', '2']]
      },
      {
        id: '#040', isCombo: false, quantity: 14
      }
    ], [
      { id: '#003', quantity: 6 },
      { id: '#055', quantity: 2 },
      { id: '#157', quantity: 2 },
      { id: '#025', quantity: 4 },
      { id: '#007', quantity: 4 },
      { id: '#040', quantity: 14 }
    ]]

    const secondAssert = [[
      {
        quantity: 3,
        isCombo: true,
        id: '*002',
        products: [['#003', '2'], ['#055', '2'], ['#157', '2']]
      },
      {
        quantity: 1,
        isCombo: true,
        id: '*001',
        products: [['#003', '2'], ['#025', '2'], ['#055', '2']]
      },
      {
        id: '#003', isCombo: false, quantity: 3
      }
    ], [
      { id: '#003', quantity: 11 },
      { id: '#055', quantity: 8 },
      { id: '#157', quantity: 6 },
      { id: '#025', quantity: 2 }
    ]]

    const thirddAssert = [[
      {
        quantity: 3,
        isCombo: true,
        id: '*002',
        products: [['#003', '2'], ['#055', '2'], ['#157', '2']]
      },
      {
        quantity: 2,
        isCombo: true,
        id: '*001',
        products: [['#003', '2'], ['#025', '2'], ['#055', '2']]
      },
      { id: '#055', isCombo: false, quantity: 3 },
      { id: '#017', isCombo: false, quantity: 1 },
      { id: '#025', isCombo: false, quantity: 1 },
      { id: '#020', isCombo: false, quantity: 2 }
    ], [
      { id: '#003', quantity: 10 },
      { id: '#055', quantity: 13 },
      { id: '#157', quantity: 6 },
      { id: '#025', quantity: 5 },
      { id: '#017', quantity: 1 },
      { id: '#020', quantity: 2 }
    ]]

    const asserts = [firstAsert, secondAssert, thirddAssert]
    asserts.forEach(([input, expected]) => {
      const finalCart = useFinalCart(input)
      const finalCartMap = finalCart.map(({ id, quantity }) => ({ id, quantity }))

      expect(finalCartMap).toEqual(expected)
    })
  })
})
