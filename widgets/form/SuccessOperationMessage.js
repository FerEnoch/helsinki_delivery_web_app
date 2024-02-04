import { codecProRegular } from '@/shared/config/fonts'
import classes from './SuccessOperationMessage.module.css'
import { i18n } from '@/shared/model/i18n'
import { memo } from 'react'
import Link from 'next/link'
import { useClearData } from '@/features/formFill/lib/useClearData'
import { useRouter } from 'next/navigation'
// import { ORDER_OPERATION_TIME: { SUCCESS_OPERATION_MAX_TIME_MS } } from '@/features/formFill/config/orderOperationTime'

const { ORDER_SUCCESS: { text, actions: { endOperation, viewPurchaseSummary }, contact: [questionText, contactLink] } } = i18n.LANG.ESP.UI
const { CONTACT: { label: contactPath }, PURCHASE_SUMMARY: { label: purchaseSummaryPath } } = i18n.LANG.ESP.UI.MENU
// // const { SUCCESS_OPERATION_MAX_TIME_MS } = ORDER_OPERATION_TIME

export default memo(function SuccessOperationMessage ({ closeDialog }) {
  const { handleClearData } = useClearData()
  const router = useRouter()

  const handleEndOperation = () => {
    handleClearData()
    closeDialog()
    router.push('/')
  }

  // useEffect(() => {
  // const backHomeTimeout = setTimeout(handleBackHomeOperation,
  //   SUCCESS_OPERATION_MAX_TIME_MS
  // )
  // return () => clearTimeout(backHomeTimeout)
  // }, [])

  return (
    <div className={classes.message_wrapper}>
      <p className={`${classes.message_text}  ${codecProRegular.className}`}>
        {text}
      </p>
      <section className={classes.buttons_section}>
        <Link
          prefetch={false}
          href={`/info/${encodeURIComponent(purchaseSummaryPath)}`}
          className={`${classes.back_home_button} ${codecProRegular.className}`}
        >
          {viewPurchaseSummary}
        </Link>
        <button
          onClick={handleEndOperation}
          className={`${classes.back_home_button} ${codecProRegular.className}`}
        >
          {endOperation}
        </button>
      </section>
      <section className={`${classes.contact_text}  ${codecProRegular.className}`}>
        <p>
          {questionText}
        </p>
        <Link
          prefetch={false}
          href={`/info/${encodeURIComponent(contactPath)}`}
          className={classes.contact_link}
        >
          {contactLink}
        </Link>
      </section>
    </div>
  )
}
)
