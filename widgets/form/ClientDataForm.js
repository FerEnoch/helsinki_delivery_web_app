import classes from './ClientDataForm.module.css'
import { memo, useEffect, useRef } from 'react'
import { i18n } from '@/shared/model/i18n'
import NameInput from '@/features/formFill/ui/NameInput'
import AddressInput from '@/features/formFill/ui/AddressInput'
import PhoneInput from '@/features/formFill/ui/PhoneInput'
import FormFooter from '@/features/formFill/ui/FormFooter'
import ReceiptInput from '@/features/formFill/ui/ReceiptInput'
import { useFormData } from '@/features/formFill/lib/useFormData'
import { useHandleAddressDetails } from '@/features/formFill/lib/useHandleAddressDetails'

/**
 * TO DO - handle api error
 */
const { CLIENT_FORM, ORDER_PROCESSING, ORDER_SUCCESS } = i18n.LANG.ESP.UI
const formTitle = CLIENT_FORM.FORM_TITLE.toUpperCase()
const processingOrderTitle = ORDER_PROCESSING.title.toUpperCase()
const processingOrderMessage = ORDER_PROCESSING.message
const processingOrderSuccessTitle = ORDER_SUCCESS.title
const processingOrderSuccessMessage = ORDER_SUCCESS.message

export default memo(function ClientDataForm ({ showContinueShoppingButton }) {
  const fileRef = useRef()
  const {
    isLoading,
    successfullOperation,
    submitButtonDisabled,
    showReceiptInput,
    submitHandler
  } = useFormData(fileRef)

  const { isDetailsOpen, setDetailsOpenState } = useHandleAddressDetails()

  useEffect(() => {
    showContinueShoppingButton(successfullOperation)
  }, [successfullOperation, showContinueShoppingButton])

  return (
    <form
      onSubmit={submitHandler}
      className={`
          ${classes.form_container}
          ${isLoading ? classes.form_container_loading : ''}
          ${successfullOperation ? classes.form_container_success : ''}
        `}
    >
      <header className={classes.form_header}>
        <h3>
          {
        isLoading && !successfullOperation
          ? ''
          : !successfullOperation && formTitle
          }
        </h3>
      </header>
      <section className={classes.form_main}>
        {
        isLoading && !successfullOperation
          ? (
            <div className={classes.processing_texts_wrapper}>
              <h1>{processingOrderTitle}</h1>
              <p>{processingOrderMessage}</p>
            </div>
            )
          : (
              successfullOperation && !isLoading
                ? (
                  <>
                    <h1>{processingOrderSuccessTitle}</h1>
                    <p>{processingOrderSuccessMessage}</p>
                  </>
                  )
                : (
                  <>
                    <NameInput />
                    <AddressInput isDetailsOpen={isDetailsOpen} setDetailsOpenState={setDetailsOpenState} />
                    <PhoneInput isDetailsOpen={isDetailsOpen} />
                  </>
                  )
            )
        }
      </section>
      {
       showReceiptInput && <ReceiptInput ref={fileRef} />
      }
      <FormFooter
        loadingState={isLoading && !successfullOperation}
        successState={successfullOperation && !isLoading}
        buttonDisabled={submitButtonDisabled}
      />
    </form>
  )
})
