import { memo } from 'react'
import classes from './MenuTitle.module.css'
import Link from 'next/link'

export default memo(function MenuTitle ({ title, onClick }) {
  const formattedTitle = title.toUpperCase()

  return (
    <li
      className={classes.menu_title}
      onClick={onClick}
      role='button'
    >
      <Link href={`/info/${encodeURIComponent(title)}`}>
        {formattedTitle}
      </Link>
    </li>
  )
}
)
