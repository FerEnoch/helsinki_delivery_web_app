'use client'
import MenuIcon from '@/shared/ui/lib/svg/MenuIcon'
import classes from './HeaderMenuIcon.module.css'
import { getMenuTitles } from './lib/getMenuTitles'
import { useState } from 'react'

export default function HeaderMenuIcon () {
  const [openMenu, setOpenMenu] = useState(false)
  const titles = getMenuTitles()
  return (
    <div className={classes.button_menu}>
      <MenuIcon
        onClick={() => setOpenMenu((isOpen) => !isOpen)}
        className={classes.icon_menu} width={25} height={25} fill='white'
      />
      {
        openMenu && (
          <div
            popover
            className={classes.menu_popover}
          >
            <ul className={classes.menu_list}>
              {
        titles.map(title => {
          const formattedTitle = title.toUpperCase()

          return (
            <li
              className={classes.menu_title}
              key={title}
            >
              {formattedTitle}
            </li>
          )
        })
      }
            </ul>
          </div>
        )
      }
    </div>
  )
}
