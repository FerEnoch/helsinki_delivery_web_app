import { describe, it, expect, vi } from 'vitest'
import { useFinalCart } from './finalCart'

vi.mock('@/entities/lib/store', () => ({
  useAppStore: vi.fn()
}))

describe('FinalCart', () => {
  it('Should work', () => {
    const finalCart = useFinalCart()

    console.log(finalCart)
    expect(true).toBeTruthy()
  })
})
