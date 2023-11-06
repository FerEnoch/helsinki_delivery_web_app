import classes from './PaymentsServiceFooter.module.css'
import { ShareIcon } from '@/shared/ui/lib/svg/ShareIcon'
import { CopyPasteIcon } from '@/shared/ui/lib/svg/CopyPasteIcon'
import { useSharePaymentData } from '@/features/sharePaymentData/model/useSharePaymentData'

const SHARE_TYPES = {
  COPY_PASTE: 'COPY',
  SHARE_API: 'SHARE'
}

export default function PaymentsServiceFooter ({ kindOfService }) {
  const { shareUIButtonText, shareData, isShareApiCompatible, copyPasteUIButtonText } = useSharePaymentData(kindOfService)

  const handleShare = (type) => async () => {
    const { SHARE_API } = SHARE_TYPES
    if (!shareData) return
    if (type === SHARE_API && isShareApiCompatible) {
      return await navigator.share(shareData)
    } else {
      const textToClipboard = `${shareData.title}\n${shareData.text}\n${shareData?.url || shareData?.transferData}`
      return await navigator.clipboard.writeText(textToClipboard)
    }
  }

  return (
    <section className={classes.pay_method_footer}>
      <div className={classes.buttons_container}>
        {
        isShareApiCompatible &&
        (
          <div className={classes.share_button_wrapper} onClick={handleShare(SHARE_TYPES.SHARE_API)}>
            <div className={classes.share_icon}>
              <ShareIcon />
            </div>
            <button className={classes.share_button}>
              <h3>{shareUIButtonText}</h3>
            </button>
          </div>
        )
        }
        <div className={classes.share_button_wrapper} onClick={handleShare(SHARE_TYPES.COPY_PASTE)}>
          <div className={classes.share_icon}>
            <CopyPasteIcon />
          </div>
          <button className={classes.share_button}>
            <h3>{copyPasteUIButtonText}</h3>
          </button>
        </div>
      </div>
    </section>
  )
}
