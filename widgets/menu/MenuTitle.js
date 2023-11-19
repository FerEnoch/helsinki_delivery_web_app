import { memo } from 'react'
import classes from './MenuTitle.module.css'

export default memo(function MenuTitle ({ title, onClick }) {
  return (
    <li
      className={classes.menu_title}
      onClick={onClick(title)}
    >
      {title}
    </li>
  )
}
)
