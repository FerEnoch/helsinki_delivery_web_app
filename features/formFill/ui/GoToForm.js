'use client'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import classes from './GoToForm.module.css'
import { i18n } from '@/shared/model/i18n'

const { CART: { FOOTER_BUTTONS: { GO_TO_FORM } } } = i18n.LANG.ESP.UI
const actionText = GO_TO_FORM.toUpperCase()

export default function GoToForm ({ goToForm }) {
  return (
    <>
      <div
        className={classes.go_to_form_button}
        onClick={goToForm}
      >
        <section className={classes.go_to_form_action}>
          <p className={classes.action_text}> {actionText} </p>
          <span className={classes.triangle_button}>
            <TriangleButton
              slideDirection='x'
              width={20}
              height={20}
              triangleStyle={{ fill: 'white' }}
            />
          </span>
        </section>
      </div>
    </>
  )
}
