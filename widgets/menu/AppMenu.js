import { memo } from 'react'
import classes from './AppMenu.module.css'
import { getMenuTitles } from './lib/getMenu'
import MenuTitle from './MenuTitle'
import TriangleButton from '@/shared/ui/lib/TriangleButton'

export default memo(function AppMenu ({ handleOpenMenu }) {
  const titles = getMenuTitles()

  return (
    <div popover id='menu' auto modal className={classes.menu_popover}>
      <ul className={classes.menu_list}>
        <div>
          <TriangleButton
            onClick={handleOpenMenu}
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
              onClick={handleOpenMenu}
            />
          )
        })}
      </ul>
    </div>
  )
}
)
