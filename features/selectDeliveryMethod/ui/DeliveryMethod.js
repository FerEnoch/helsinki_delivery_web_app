'use client'
import classes from './DeliveryMethod.module.css'
import { codecProRegular } from '@/shared/config/fonts'
// import { HelsinkiTruck } from '@/shared/ui/lib/svg/HelsinkiTruck'
//       <div className={classes.item_image} />
//           <span className={classes.image_mask}>
//             <HelsinkiTruck />
//           </span>

export default function DeliveryMethod ({ label, info, price }) {
  const formattedLabel = label.toUpperCase()
  const formattedPrice = `$${price}`
  return (
    <article className={classes.delivery_cost_item}>
      <div className={`${classes.item_content} ${codecProRegular.className}`}>
        <div className={classes.item_header}>
          <h2 className={classes.label}>{formattedLabel}</h2>
          <h2 className={classes.info}>{info}</h2>
        </div>
        <h2 className={classes.price}>{formattedPrice}</h2>
      </div>
    </article>
  )
}
