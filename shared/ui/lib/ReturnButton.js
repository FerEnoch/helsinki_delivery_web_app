'use client'
import classes from './ReturnButton.module.css'
// import { useRouter } from 'next/navigation'
import TriangleButton from './TriangleButton'
import { codecProRegular } from '@/shared/config/fonts'
import { i18n } from '@/shared/model/i18n'

const {
  CART: {
    FOOTER_BUTTONS: {
      BACK
    }
  }
} = i18n.LANG.ESP.UI

export default function ReturnButton () {
  // const router = useRouter()

  const revalidatePath = () => {
    window.location.reload()
    // router.back()
  }

  return (
    <div
      onClick={revalidatePath}
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
        value={BACK}
      />
    </div>
  )
}
