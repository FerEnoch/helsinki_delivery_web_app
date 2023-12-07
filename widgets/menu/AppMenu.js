import { memo, useEffect, useRef } from 'react'
import classes from './AppMenu.module.css'
import { getMenuTitles } from './lib/getMenu'
import MenuTitle from './MenuTitle'
import TriangleButton from '@/shared/ui/lib/TriangleButton'

export default memo(function AppMenu ({ toggleMenu, closeMenu }) {
  const menuRef = useRef(null)
  const titles = getMenuTitles()

  useEffect(() => {
    window.addEventListener('keydown', closeMenu)
    return () => {
      window.removeEventListener('keydown', null)
    }
  }, [closeMenu])

  return (
    <div ref={menuRef} className={classes.menu_popover}>
      <ul className={classes.menu_list}>
        <div>
          <TriangleButton
            onClick={toggleMenu}
            customClasses={classes.close_triangle}
            width={18}
            height={18}
          />
        </div>
        {titles.map(title => {
          return (
            <MenuTitle
              key={title}
              title={title}
              onClick={toggleMenu}
            />
          )
        })}
      </ul>
    </div>
  )
}
)
