import classes from './DataForm.module.css'
import ClientDataFields from './ClientDataFields'
import ClientForm from './ClientForm'
import FormHeader from './FormHeader'
import FormFooter from '@/features/formFill/ui/FormFooter'
import SubmitButton from '@/features/formFill/lib/ui/SubmitButton'
import { i18n } from '@/shared/model/i18n'
import { useAppStore } from '@/entities/lib/store'

const { CLIENT_FORM: { FORM_TITLE } } = i18n.LANG.ESP.UI

export default function DataForm ({ closeDialog }) {
  const { paymentMethod: { receipt } } = useAppStore()
  const isReceiptRequired = receipt === 'REQUIRED'
  const cartStepNumber = isReceiptRequired ? 4 : 3

  return (
    <ClientForm>
      <div className={classes.red_line} />
      <FormHeader title={`${cartStepNumber}-${FORM_TITLE}`} />
      <ClientDataFields />
      <FormFooter closeDialog={closeDialog}>
        <SubmitButton />
      </FormFooter>
    </ClientForm>
  )
}
