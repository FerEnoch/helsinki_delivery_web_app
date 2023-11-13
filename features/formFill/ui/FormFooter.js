import { i18n } from '@/shared/model/i18n'
import classes from './FormFooter.module.css'
import { useEnableSubmit } from '../lib/useEnableSubmit'
import { memo } from 'react'
import TriangleButton from '@/shared/ui/lib/TriangleButton'

const {
  CART: { FOOTER_BUTTONS: { BACK } },
  CLIENT_FORM: { FORM_SUBMIT }
} = i18n.LANG.ESP.UI
const backButtonText = BACK.toUpperCase()
const submitText = FORM_SUBMIT.toUpperCase()

export default memo(function FormFooter ({ closeFormDialog }) {
  const { submitButtonDisabled } = useEnableSubmit()

  return (
    <footer className={classes.form_footer}>
      <div
        onClick={closeFormDialog}
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
      <button
        className={classes.submit_button_wrapper}
        type='submit'
        disabled={submitButtonDisabled}
      >
        <p> {submitText} </p>
        <span className={classes.submit_button_triangle}>
          <TriangleButton
            slideDirection='x'
            width={18}
            height={18}
            triangleStyle={{ fill: 'white' }}
          />
        </span>
      </button>
    </footer>
  )
})
