import classes from './SuccessHero.module.css'
import { HelsinkiTruck } from '@/shared/ui/lib/svg/HelsinkiTruck'
import { i18n } from '@/shared/model/i18n'
import { memo } from 'react'
import { useAppStore } from '@/entities/lib/store'

const { ORDER_SUCCESS: { title, takeAwayTitle, message } } = i18n.LANG.ESP.UI
const processingOrderSuccessMessage = message.toUpperCase()

export default memo(function SuccessHero () {
  const { client: { takeAway } } = useAppStore()

  const processingOrderSuccessTitle = takeAway ? takeAwayTitle.toUpperCase() : title.toUpperCase()

  return (
    <div className={classes.hero_container}>
      <h1 className={classes.success_title}>
        {processingOrderSuccessTitle}
      </h1>
      <div className={classes.success_image}>
        <HelsinkiTruck width={300} height={300} />
      </div>
      <p className={classes.success_message}>
        {processingOrderSuccessMessage}
      </p>
    </div>
  )
})
