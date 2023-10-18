import { i18n } from '@/shared/model/i18n'
import classes from './SubmitFormButton.module.css'
import HelsinkiLogo from '@/shared/ui/lib/svg/HelsinkiLogo'

const { CLIENT_FORM } = i18n.LANG.ESP.UI

export default function SubmitFormButton ({ isLoading, disabled }) {
  return (
    <footer className={classes.form_footer}>
      {
        isLoading
          ? (
            <div className={classes.loading_logo_wrapper}>
              <HelsinkiLogo
                className={classes.SVGLogo}
                width={100}
                height={100}
                pathStyle={{ fill: '#eee', fillOpacity: 0.9 }}
              />
            </div>
            )
          : (
            <button
              disabled={disabled}
              type='submit'
              className={classes.submit_button}
            >
              <p>{CLIENT_FORM.FORM_SUBMIT}</p>
            </button>
            )
      }
    </footer>
  )
}
