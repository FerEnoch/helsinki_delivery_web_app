import { codecProRegular } from '@/shared/config/fonts'
import classes from './Method.module.css'
import { useAppStore } from '@/entities/lib/store'

export default function Method ({ label, price, info, renderOptions }) {
  const { setDeliveryMethod } = useAppStore()
  const formattedLabel = label.toUpperCase()
  const formattedPrice = `$${price}`

  const selectDeliveryMethod = () => setDeliveryMethod({
    label,
    price,
    info
  })

  return (
    <div
      onClick={selectDeliveryMethod}
      className={`
          ${classes.item_content} 
          ${codecProRegular.className}
        `}
    >
      <header className={classes.item_header}>
        <div className={`${renderOptions && classes.hide}`}>
          <p className={classes.label}>{formattedLabel}</p>
          <p className={classes.info}>{info}</p>
        </div>
      </header>
      <p className={classes.price}>{formattedPrice}</p>
    </div>
  )
}
