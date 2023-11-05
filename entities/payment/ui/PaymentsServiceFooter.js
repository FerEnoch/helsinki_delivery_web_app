import classes from './PaymentsServiceFooter.module.css'
import { ShareIcon } from '@/shared/ui/lib/svg/ShareIcon'
import { CopyPasteIcon } from '@/shared/ui/lib/svg/CopyPasteIcon'
import { useSharePaymentData } from '@/features/sharePaymentData/model/useSharePaymentData'

export default function PaymentsServiceFooter ({ kindOfService }) {
  const { shareUIButtonText, shareData, isQRShareable } = useSharePaymentData(kindOfService)

  const handleShare = async () => {
    if (!shareData) return
    if (isQRShareable) {
      return await navigator.share(shareData)
    } else {
      const textToClipboard = `${shareData.title}\n${shareData.text}\n${shareData?.url || shareData?.transferData}`
      return await navigator.clipboard.writeText(textToClipboard)
    }
  }

  return (
    <section className={classes.pay_method_footer}>
      <div className={classes.share_button_wrapper} onClick={handleShare}>
        <div className={classes.share_icon}>
          {
          isQRShareable
            ? (
              <ShareIcon />
              )
            : (
              <CopyPasteIcon />
              )
          }
        </div>
        <button className={classes.share_button}>
          <h3>{shareUIButtonText}</h3>
        </button>
      </div>
    </section>
  )
}
