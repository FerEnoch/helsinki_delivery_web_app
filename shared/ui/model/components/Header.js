import Link from 'next/link'
import classes from './Header.module.css'
import { formatTradeMark } from '@/shared/lib/textFormat/giveFormat'
import Menu from '@/shared/ui/lib/svg/Menu'
import SearchBar from '@/features/search/ui/SearchBar'
import HeaderCartIcon from '@/entities/cart/ui/HeaderCartIcon'

export default function Header () {
  const tradeMarkName = formatTradeMark().split(' ')
  const firstNameTM = tradeMarkName[0]
  const secondNameTM = tradeMarkName[1]

  return (
    <header className={classes.header_container}>
      <Link href='/' prefetch={false}>
        <h1 className={classes.name_first}>{firstNameTM}</h1>
        <h1 className={classes.name_second}>{secondNameTM}</h1>
      </Link>
      <div className={classes.position_icons}>
        <div className={classes.button_menu}>
          <Menu
            className={classes.icon_menu}
            width={25}
            height={25}
            fill='white'
          />
        </div>
        <HeaderCartIcon />
      </div>
      <SearchBar />
    </header>
  )
}
