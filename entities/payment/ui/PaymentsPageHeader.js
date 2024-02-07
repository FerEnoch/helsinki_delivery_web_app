'use client'
import Triangle from '@/shared/ui/lib/svg/Triangle'
import { useRouter } from 'next/navigation'
import classes from './PaymentsPageHeader.module.css'

export default function PaymentsPageHeader ({ label }) {
  const router = useRouter()

  const goBack = () => router.back()
  const pageTitle = label.toUpperCase()

  return (
    <header className={classes.header_container}>
      <button onClick={goBack} className={classes.back_link}>
        <Triangle
          style={{ fill: 'black', transform: 'rotate(-90deg) scale(1.8, 1)' }}
          width={20}
          height={20}
        />
      </button>
      <h2 className={classes.title}>{pageTitle}</h2>
    </header>
  )
}
