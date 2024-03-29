import { i18n } from '@/shared/model/i18n'
import classes from './DiscountToast.module.css'
import { codecProRegular } from '@/shared/config/fonts'
// import Image from 'next/image'

const { DISCOUNT } = i18n.LANG.ESP.UI.TOAST
const [title, ...info] = DISCOUNT.split('\n')

export default function DiscountToast () {
  return (
    <div className={`${classes.toast_wrapper} ${codecProRegular.className}`}>
      <div className={classes.info}>
        <h4 className={classes.discount_title}>
          {title}
        </h4>
        {
        info.map(sentence => {
          return (
            <p
              className={classes.discount_text}
              key={sentence}
            >
              {sentence.toUpperCase()}
            </p>
          )
        })
        }
      </div>
      {/* eslint-disable-next-line */}
      <img
        className={classes.viking_image}
        alt='Vikingo del logo de Helsinki con un jarrón de cerveza expumante'
        src='/assets/drinking_viking.png'
        // width={10}
        // height={10}
      />
    </div>
  )
}
