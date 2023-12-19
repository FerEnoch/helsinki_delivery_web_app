import classes from './FormLoadingState.module.css'
import { i18n } from '@/shared/model/i18n'
import { BoxWorker } from '@/shared/ui/lib/svg/BoxWorker'

const { ORDER_PROCESSING } = i18n.LANG.ESP.UI
const processingOrderTitle = ORDER_PROCESSING.title.toUpperCase()
const processingOrderMessage = ORDER_PROCESSING.message.toUpperCase()

export default function FormLoadingState () {
  return (
    <div className={classes.loading_view_container}>
      <h1 className={classes.loading_title}>{processingOrderTitle}</h1>
      <BoxWorker
        width={240}
        height={240}
      />
      <p className={classes.loading_message}>{processingOrderMessage}</p>
    </div>
  )
}
