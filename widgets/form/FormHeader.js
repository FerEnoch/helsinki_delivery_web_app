import { useAppStore } from '@/entities/lib/store'
import classes from './FormHeader.module.css'
import { i18n } from '@/shared/model/i18n'

const { CLIENT_FORM } = i18n.LANG.ESP.UI
const formTitle = CLIENT_FORM.FORM_TITLE.toUpperCase()

export default function FormHeader () {
  const { paymentMethod: { receipt } } = useAppStore()
  const isReceiptRequired = receipt === 'REQUIRED'
  const cartStepNumber = isReceiptRequired ? 4 : 3

  return (
    <header className={classes.form_header}>
      <h3 className={classes.form_title}> {cartStepNumber}-{formTitle} </h3>
    </header>
  )
}
