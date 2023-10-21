import { i18n } from '@/shared/model/i18n'
import classes from './SubmitFormButton.module.css'
import HelsinkiLogo from '@/shared/ui/lib/svg/HelsinkiLogo'

const { CLIENT_FORM } = i18n.LANG.ESP.UI

export default function FormFooter ({ loadingState, successState, buttonDisabled }) {
  return (
    <footer className={classes.form_footer}>
      {
        loadingState
          ? (
            <div className={classes.loading_logo_wrapper}>
              <HelsinkiLogo
                className={classes.SVGLogo}
                width={100}
                height={100}
                pathStyle={{ fill: '#000', fillOpacity: 0.9 }}
              />
            </div>
            )
          : (
              !successState && (
                <button
                  disabled={buttonDisabled}
                  type='submit'
                  className={classes.submit_button}
                >
                  <p>{CLIENT_FORM.FORM_SUBMIT}</p>
                </button>
              )
            )
      }
    </footer>
  )
}
