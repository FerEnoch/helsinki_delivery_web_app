'use client'
import Lupe from '@/shared/ui/lib/svg/Lupe'
import classes from './SearchBar.module.css'
import { usePathname } from 'next/navigation'

export default function SearchBar () {
  const pathName = usePathname()
  const showSeachBarStyle = { display: pathName.includes('cart') ? 'none' : 'flex' }

  return (
    <div
      role='search'
      className={classes.search_container}
      style={showSeachBarStyle}
    >
      <input
        id='search_input'
        className={classes.input_search}
        type='text'
        placeholder='buscador'
      />
      <label htmlFor='search_input'>
        <span className={classes.search_lupe}>
          <Lupe
            className={classes.icon_lupe}
            width={25}
            height={25}
            fill='white'
          />
        </span>
      </label>
    </div>
  )
}
