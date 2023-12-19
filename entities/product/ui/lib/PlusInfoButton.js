'use client'
import { codecProRegular } from '@/shared/config/fonts'
import classes from './PlusInfoButton.module.css'

export default function PlusInfoButton () {
  return (
    <button className={`${classes.plusInfoButton} ${codecProRegular.className}`}>
      +i
    </button>
  )
}
