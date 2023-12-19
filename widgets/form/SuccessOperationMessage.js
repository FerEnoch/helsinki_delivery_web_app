import { codecProRegular } from '@/shared/config/fonts'
import classes from './SuccessOperationMessage.module.css'
import { i18n } from '@/shared/model/i18n'
import { memo, useCallback, useEffect } from 'react'
import { ORDER_OPERATION_TIME } from '@/features/formFill/config/orderOperationTime'

const { ORDER_SUCCESS: { text, action, contact: [questionText, contactLink] } } = i18n.LANG.ESP.UI
const { label: contactPath } = i18n.LANG.ESP.UI.MENU.CONTACT
const { SUCCESS_OPERATION_MAX_TIME_MS } = ORDER_OPERATION_TIME

export default memo(function SuccessOperationMessage ({ handleBackHomeOperation }) {
  const pushTo = useCallback((path) => () => handleBackHomeOperation(path),
    [handleBackHomeOperation])

  useEffect(() => {
    const backHomeTimeout = setTimeout(pushTo('/'),
      SUCCESS_OPERATION_MAX_TIME_MS
    )
    return () => clearTimeout(backHomeTimeout)
  }, [pushTo])

  return (
    <div className={classes.message_wrapper}>
      <p className={`${classes.message_text}  ${codecProRegular.className}`}>
        {text}
      </p>
      <section className={`${classes.contact_text}  ${codecProRegular.className}`}>
        <p>
          {questionText}
        </p>
        <button
          onClick={pushTo(`/info/${encodeURIComponent(contactPath)}`)}
          className={classes.contact_link}
        >
          {contactLink}
        </button>
      </section>
      <button
        onClick={pushTo('/')}
        className={`${classes.back_home_button} ${codecProRegular.className}`}
      >
        {action}
      </button>
    </div>
  )
}
)
