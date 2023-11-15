import { codecProRegular } from '@/shared/config/fonts'
import classes from './SuccessOperationMessage.module.css'
import { i18n } from '@/shared/model/i18n'
import { memo, useEffect } from 'react'
import { ORDER_OPERATION_TIME } from '@/features/formFill/config/orderOperationTime'

const { ORDER_SUCCESS: { text, action } } = i18n.LANG.ESP.UI
const { SUCCESS_OPERATION_MAX_TIME_MS } = ORDER_OPERATION_TIME

export default memo(function SuccessOperationMessage ({ handleBackHomeOperation }) {
  useEffect(() => {
    const backHomeTimeout = setTimeout(() => handleBackHomeOperation(),
      SUCCESS_OPERATION_MAX_TIME_MS
    )
    return () => {
      clearTimeout(backHomeTimeout)
    }
  }, [handleBackHomeOperation])

  return (
    <div className={classes.message_wrapper}>
      <p className={`${classes.text}  ${codecProRegular.className}`}>
        {text(3445665445)}
      </p>
      <button
        onClick={handleBackHomeOperation}
        className={`${classes.back_home_button} ${codecProRegular.className}`}
      >
        {action}
      </button>
    </div>
  )
}
)
