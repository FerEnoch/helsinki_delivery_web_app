'use client'
import { i18n } from '@/shared/model/i18n'
import Triangle from '@/shared/ui/lib/svg/Triangle'
import { useRouter } from 'next/navigation'
import classes from './PaymentsPageHeader.module.css'

const { CART: cartTexts } = i18n.LANG.ESP.UI

export default function PaymentsPageHeader () {
  const router = useRouter()
  return (
    <header className={classes.header_container}>
      <button onClick={() => router.back()} className={classes.back_link}>
        <Triangle
          style={{ fill: 'black', transform: 'rotate(-90deg) scale(1.8, 1)' }}
          width={20}
          height={20}
        />
      </button>
      <h2 className={classes.title}>{cartTexts.SECOND_STEP_TITLE.toUpperCase()}</h2>
    </header>
  )
}
