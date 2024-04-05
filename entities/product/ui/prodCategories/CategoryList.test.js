import { screen, render, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import CategoryList from './CategoryList'
import { initialProdsData } from '@/__test__/mock_db/initialProdsData'

vi.mock('@/shared/config/fonts', () => ({
  Unica_One: () => ({ className: 'fontClass' }),
  Poppins: () => ({ className: 'fontClass' }),
  localFont: () => ({ className: 'fontClass' }),
  codecProRegular: () => ({ className: 'fontClass' })
}))

vi.mock('../../lib/useProducts', () => ({
  useProducts: vi.fn()
}))
vi.mock('../../lib/useInitialToast', () => ({
  useInitialToast: vi.fn()
}))

describe('Home page categories', () => {
  test('Should render all categories and combos', async () => {
    const combosLabels = []
    const categories = initialProdsData.map(({ firestoreID, categoryData }) => {
      const data = JSON.parse(categoryData)
      const isCombo = data.filter(({ isCombo }) => isCombo)
      if (isCombo.length > 0) {
        combosLabels.push(firestoreID)
        return null
      }
      return firestoreID
    }).filter(Boolean)

    render(<CategoryList categories={categories} combosLabels={combosLabels} />)

    await Promise.all(categories.concat(combosLabels).map(async (category, _, arr) => {
      await waitFor(() => expect(screen.getByText(new RegExp(category, 'i'))))
    }))
  })
})
