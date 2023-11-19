'use client'
import MenuIcon from '@/shared/ui/lib/svg/MenuIcon'
import classes from './HeaderMenuIcon.module.css'
import { useCallback, useState } from 'react'
import AppMenu from './AppMenu'

export default function HeaderMenuIcon () {
  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenMenu = useCallback(() => setOpenMenu(isOpen => !isOpen), [])

  return (
    <>
      <button popoverTarget='menu' className={classes.button_menu}>
        <MenuIcon
          onClick={handleOpenMenu}
          popoverTarget='menu'
          className={classes.icon_menu}
          width={25}
          height={25}
          fill='white'
        />
      </button>
      {
        openMenu && <AppMenu handleOpenMenu={handleOpenMenu} />
      }
    </>
  )
}
