'use client'
import Triangle from '@/shared/ui/lib/svg/Triangle'
import Breadcrumb from './Breadcrumb'
import classes from './CategoryTitleNav.module.css'
import { usePathname, useRouter } from 'next/navigation'

export default function CategoryTitleNav ({ category, type = '' }) {
  const router = useRouter()
  const pathName = usePathname()

  const goHome = () => {
    if (pathName.includes('detail')) router.back()
    else router.push('/')
  }

  return (
    <nav className={classes.nav_container}>
      <button onClick={goHome} className={classes.back_link}>
        <Triangle
          style={{ fill: 'black', transform: 'rotate(-90deg) scale(1.8, 1)' }}
          width={20}
          height={20}
        />
      </button>
      <Breadcrumb
        category={category}
        type={type}
      />
    </nav>
  )
}
