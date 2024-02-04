import { codecProRegular } from '@/shared/config/fonts'
import classes from './PurchaseSummaryPageFooter.module.css'
import { useRouter } from 'next/navigation'
import { i18n } from '@/shared/model/i18n'
// import { useClearData } from '@/features/formFill/lib/useClearData'

const { ORDER_SUCCESS: { actions: { backHome } } } = i18n.LANG.ESP.UI

export default function PurchaseSummaryPageFooter () {
  // const { handleClearData } = useClearData()
  const router = useRouter()

  const handleBackHome = () => {
    // handleClearData()
    router.push('/')
  }

  return (
    <footer className={classes.form_footer}>
      <button
        onClick={handleBackHome}
        className={`${classes.back_home_button} ${codecProRegular.className}`}
      >
        {backHome}
      </button>
    </footer>
  )
}
