'use client'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import classes from './GoToForm.module.css'
import FormDialog from '@/widgets/form/FormDialog'
import { useFormModal } from '../lib/useFormModal'
import { useMemo, useRef } from 'react'

export default function GoToForm ({ label }) {
  const dialogRef = useRef()
  const { isDisabledModalOpening, openFormDialog } = useFormModal(dialogRef)
  const actionText = label.toUpperCase()

  const formDialog = useMemo(() => <FormDialog ref={dialogRef} />, [])

  return (
    <>
      <div
        disabled={isDisabledModalOpening}
        className={classes.go_to_form_button}
      >
        <section onClick={openFormDialog} className={classes.go_to_form_action}>
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
      {formDialog}
    </>
  )
}
