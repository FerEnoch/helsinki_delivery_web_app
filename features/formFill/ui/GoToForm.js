'use client'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import classes from './GoToForm.module.css'
import { useState } from 'react'
import FormDialog from './FormDialog'
import { useAppStore } from '@/entities/lib/store'

export default function GoToForm ({ label }) {
  const [openModalDialog, setOpenModalDialog] = useState(false)
  const { cart } = useAppStore()
  const isCartEmpty = cart.length === 0

  const closeDialog = () => setOpenModalDialog(false)

  return (
    <>
      <div
        disabled={isCartEmpty}
        className={classes.go_to_form_button}
      >
        <section
          onClick={() => cart.length > 0 && setOpenModalDialog(true)}
          className={classes.go_to_form_action}
        >

          <p className={classes.text}>
            {label.toUpperCase()}
          </p>
          <span className={classes.triangle_button}>
            <TriangleButton
              slideDirection='x'
              width={12}
              height={12}
              triangleStyle={{ fill: 'white' }}
            />
          </span>
        </section>
      </div>
      <FormDialog
        openModal={openModalDialog}
        closeDialog={closeDialog}
      />
    </>
  )
}
