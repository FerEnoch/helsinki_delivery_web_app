import classes from './ClientDataFields.module.css'
import NameInput from '@/features/formFill/ui/NameInput'
import AddressInput from '@/features/formFill/ui/AddressInput'
import PhoneInput from '@/features/formFill/ui/PhoneInput'
import ReceiptInput from '@/features/formFill/ui/ReceiptInput'
import { useHandleAddressDetails } from '@/features/formFill/lib/useHandleAddressDetails'
import { useAppStore } from '@/entities/lib/store'
import { codecProRegular } from '@/shared/config/fonts'

/**
 * TO DO - handle api error
 */

export default function ClientDataFields () {
  const { paymentMethod: { receipt } } = useAppStore()
  const { isDetailsOpen, setDetailsOpenState } = useHandleAddressDetails()
  const isReceiptRequired = receipt === 'REQUIRED'

  return (
    <main className={`${classes.dialog_main} ${codecProRegular.className}`}>
      <section className={classes.form_first_section}>
        <NameInput />
        <AddressInput isDetailsOpen={isDetailsOpen} setDetailsOpenState={setDetailsOpenState} />
        <PhoneInput isDetailsOpen={isDetailsOpen} />
      </section>
      {
         isReceiptRequired && (
           <>
             <div className={classes.red_line} />
             <section className={classes.form_receipt_section}>
               <ReceiptInput />
             </section>
           </>
         )
        }
    </main>
  )
}
