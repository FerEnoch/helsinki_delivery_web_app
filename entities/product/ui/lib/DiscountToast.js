import { i18n } from '@/shared/model/i18n'
import classes from './DiscountToast.module.css'

import { codecProRegular } from '@/shared/config/fonts'
import Image from 'next/image'
const { DISCOUNT } = i18n.LANG.ESP.UI.TOAST

export default function DiscountToast () {
  return (
    <div className={`${classes.toast_wrapper} ${codecProRegular.className}`}>
      <h4 className={classes.discount_text}>
        {DISCOUNT}
      </h4>
      <Image
        className={classes.viking_image}
        alt='Vikingo del logo de Helsinki con un jarrón de cerveza expumante'
        src='/assets/drinking_viking.png'
        width={55}
        height={80}
      />
    </div>
  )
}
