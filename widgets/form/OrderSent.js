import classes from './OrderSent.module.css'
import { i18n } from '@/shared/model/i18n'
import { HelsinkiTruck } from '@/shared/ui/lib/svg/HelsinkiTruck'

const { ORDER_SUCCESS } = i18n.LANG.ESP.UI
const processingOrderSuccessTitle = ORDER_SUCCESS.title.toUpperCase()
const processingOrderSuccessMessage = ORDER_SUCCESS.message.toUpperCase()

export default function OrderSent () {
  return (
    <div className={classes.success_view_container}>
      <h1 className={classes.success_title}>
        {processingOrderSuccessTitle}
      </h1>
      <div className={classes.success_image}>
        <HelsinkiTruck
          width={300}
          height={300}
        />
      </div>
      <p className={classes.success_message}>{processingOrderSuccessMessage}</p>
    </div>
  )
}
