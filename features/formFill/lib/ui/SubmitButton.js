import TriangleButton from '@/shared/ui/lib/TriangleButton'
import classes from './SubmitButton.module.css'
import { i18n } from '@/shared/model/i18n'
import { useEnableSubmit } from '../useEnableSubmit'

const { CLIENT_FORM: { FORM_SUBMIT } } = i18n.LANG.ESP.UI
const submitText = FORM_SUBMIT.toUpperCase()

export default function SubmitButton () {
  const { submitButtonDisabled } = useEnableSubmit()

  return (
    <button
      className={classes.submit_button_wrapper}
      type='submit'
      disabled={submitButtonDisabled}
    >
      <p> {submitText} </p>
      {!submitButtonDisabled && (
        <span className={classes.submit_button_triangle}>
          <TriangleButton
            slideDirection='x'
            width={18}
            height={18}
            triangleStyle={{ fill: 'white' }}
          />
        </span>
      )}
    </button>
  )
}
