'use client'
import classes from './PaymentOptions.module.css'
import PaymentOption from './PaymentOption'
import { PAYMENT_OPTIONS } from '@/shared/model/payment_options'

export default function PaymentOptions () {
  return (
    <section className={classes.payment_options_container}>
      {
        PAYMENT_OPTIONS.map(({ id, label, comment }, methodIndex) => {
          return (
            <PaymentOption
              key={id}
              id={id}
              label={label}
              comment={comment}
            >
              {PAYMENT_OPTIONS[methodIndex].icon}
            </PaymentOption>
          )
        })
      }
    </section>
  )
}
