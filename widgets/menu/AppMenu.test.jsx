import { render, screen } from '@testing-library/react'
import { it, vi, describe, expect } from 'vitest'
import AppMenu from './AppMenu'
import { i18n } from '@/shared/model/i18n'

describe('Menu', () => {
  it('Should render all menu titles as links', () => {
    render(<AppMenu toggleMenu={vi.fn()} closeMenu={vi.fn()} />)

    const menuTexts = i18n.LANG.ESP.UI.MENU
    const titles = screen.getAllByRole('link')

    expect(titles).toHaveLength(Object.keys(menuTexts).length)
  })
})
