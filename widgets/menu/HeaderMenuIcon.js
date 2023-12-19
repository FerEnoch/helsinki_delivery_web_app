'use client'
import MenuIcon from '@/shared/ui/lib/svg/MenuIcon'
import classes from './HeaderMenuIcon.module.css'
import { useCallback, useState } from 'react'
import AppMenu from './AppMenu'

export default function HeaderMenuIcon () {
  const [openMenu, setOpenMenu] = useState(false)

  const toggleMenu = useCallback(() => setOpenMenu(isOpen => !isOpen), [])
  const closeMenu = useCallback(() => setOpenMenu(false), [])

  return (
    <>
      <button className={classes.button_menu}>
        <MenuIcon
          onClick={toggleMenu}
          className={classes.icon_menu}
          width={25}
          height={25}
          fill='white'
        />
      </button>
      {
        openMenu && <AppMenu toggleMenu={toggleMenu} closeMenu={closeMenu} />
      }
    </>
  )
}
