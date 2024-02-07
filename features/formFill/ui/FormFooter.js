import { i18n } from '@/shared/model/i18n'
import classes from './FormFooter.module.css'
import { memo } from 'react'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import { useAppStore } from '@/entities/lib/store'

const { CART: { FOOTER_BUTTONS: { BACK } } } = i18n.LANG.ESP.UI
const backButtonText = BACK.toUpperCase()

export default memo(function FormFooter ({ closeDialog, children }) {
  const { showPurchaseSummary, togglePurchaseSummary } = useAppStore()

  return (
    <footer className={classes.form_footer}>
      <div
        onClick={showPurchaseSummary ? closeDialog : togglePurchaseSummary}
        className={classes.back_button_wrapper}
      >
        <span className={classes.back_button_triangle}>
          <TriangleButton
            slideDirection='x'
            width={18}
            height={18}
            triangleStyle={{ fill: 'white' }}
          />
        </span>
        <input
          type='button'
          className={classes.back_button_input}
          value={backButtonText}
        />
      </div>
      {children}
    </footer>
  )
})
