import Link from 'next/link'
import classes from './Header.module.css'
import { formatTradeMark } from '@/shared/lib/textFormat/giveFormat'
import SearchBar from '@/features/search/ui/SearchBar'
import HeaderCartIcon from '@/entities/cart/ui/HeaderCartIcon'
import HeaderMenuIcon from '@/widgets/menu/HeaderMenuIcon'

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
        <HeaderMenuIcon />
        <HeaderCartIcon />
      </div>
      <SearchBar />
    </header>
  )
}
