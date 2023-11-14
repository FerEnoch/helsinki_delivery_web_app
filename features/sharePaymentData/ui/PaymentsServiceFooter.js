import classes from './PaymentsServiceFooter.module.css'
import { ShareIcon } from '@/shared/ui/lib/svg/ShareIcon'
import { CopyPasteIcon } from '@/shared/ui/lib/svg/CopyPasteIcon'
import { useSharePaymentData } from '@/features/sharePaymentData/model/useSharePaymentData'
import { codecProBold } from '@/shared/config/fonts'
import { memo } from 'react'

const SHARE_BUTTON_TYPES = {
  COPY_PASTE: 'COPY',
  SHARE_API: 'SHARE'
}

export default memo(function PaymentsServiceFooter ({ kindOfService }) {
  const {
    shareUIButtonText,
    shareData,
    isShareApiCompatible,
    copyPasteUIButtonText
  } = useSharePaymentData(kindOfService)

  const handleShare = (type) => async () => {
    const { SHARE_API } = SHARE_BUTTON_TYPES
    if (!shareData) return
    if (type === SHARE_API && isShareApiCompatible) {
      return await navigator.share(shareData)
    } else {
      const textToClipboard = `${shareData.title}\n${shareData.text}`
      return await navigator.clipboard.writeText(textToClipboard)
    }
  }

  return (
    <section className={`${classes.pay_method_footer} ${codecProBold.className}`}>
      <div className={classes.buttons_container}>
        {
        isShareApiCompatible &&
        (
          <div className={classes.share_button_wrapper} onClick={handleShare(SHARE_BUTTON_TYPES.SHARE_API)}>
            <button className={classes.share_button}>
              <div className={classes.share_icon}>
                <ShareIcon />
              </div>
              <h3 className={classes.share_text}>{shareUIButtonText}</h3>
            </button>
          </div>
        )
        }
        <div className={classes.share_button_wrapper} onClick={handleShare(SHARE_BUTTON_TYPES.COPY_PASTE)}>
          <button className={classes.share_button}>
            <div className={classes.share_icon}>
              <CopyPasteIcon />
            </div>
            <h3 className={classes.share_text}>{copyPasteUIButtonText}</h3>
          </button>
        </div>
      </div>
    </section>
  )
}
)
