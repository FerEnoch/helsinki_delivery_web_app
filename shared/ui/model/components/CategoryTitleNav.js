'use client'
import Breadcrumb from './Breadcrumb'
import classes from './CategoryTitleNav.module.css'
import Triangle from '../../lib/svg/Triangle'
import { useRouter } from 'next/navigation'

export default function CategoryTitleNav ({ category, type = '' }) {
  const router = useRouter()
  const goBack = () => router.back()

  return (
    <nav className={classes.nav_container}>
      <button onClick={goBack} className={classes.back_link}>
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
