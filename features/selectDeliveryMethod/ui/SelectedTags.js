import { codecProRegular } from '@/shared/config/fonts'
import classes from './SelectedTags.module.css'
import { useAppStore } from '@/entities/lib/store'

export default function SelectedTags ({ children }) {
  const { selectedDeliveryMethod } = useAppStore()

  const { label, info, price } = selectedDeliveryMethod

  const formattedPrice = `$${price}`
  const formattedLabel = label?.toUpperCase()

  return (
    <div
      className={`
          ${classes.item_content} 
          ${codecProRegular.className}
        `}
    >
      <div className={classes.item_header}>
        <p className={classes.label}>{formattedLabel}</p>
        <p className={classes.info}>{info}</p>
      </div>
      {children}
      <div className={classes.price}>
        <p>{formattedPrice}</p>
      </div>
    </div>
  )
}
