import { memo, useCallback, useState } from 'react'
import classes from './AppMenu.module.css'
import { getMenuTitles } from './lib/getMenuTitles'
import MenuTitle from './MenuTitle'
import TriangleButton from '@/shared/ui/lib/TriangleButton'

export default memo(function AppMenu ({ handleOpenMenu }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const titles = getMenuTitles()

  const handleSelectItem = useCallback(item => () => setSelectedItem(item), [])
  console.log(selectedItem)

  return (
    <div popover id='menu' auto modal className={classes.menu_popover}>
      <ul className={classes.menu_list}>
        <div>
          <TriangleButton
            onClick={handleOpenMenu}
            customClasses={`${classes.close_triangle} ${selectedItem && classes.item_selected}`}
            width={15} height={15}
          />
        </div>
        {titles.map(title => {
          const formattedTitle = title.toUpperCase()
          return (
            <MenuTitle
              key={formattedTitle}
              title={formattedTitle}
              onClick={handleSelectItem}
            />
          )
        })}
      </ul>
    </div>
  )
}
)
