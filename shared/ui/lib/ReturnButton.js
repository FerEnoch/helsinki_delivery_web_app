'use client'
import classes from './ReturnButton.module.css'
import { useRouter } from 'next/navigation'
import TriangleButton from './TriangleButton'
import { codecProRegular } from '@/shared/config/fonts'

export default function ReturnButton () {
  const router = useRouter()
  return (
    <div
      onClick={() => router.back()}
      className={classes.back_button_wrapper}
    >
      <span className={classes.back_button_triangle}>
        <TriangleButton
          slideDirection='x'
          width={10}
          height={10}
          triangleStyle={{
            fill: 'black'
          }}
        />
      </span>
      <input
        type='button'
        className={`${classes.back_button_input} ${codecProRegular.className}`}
        value='Volver'
      />
    </div>
  )
}
