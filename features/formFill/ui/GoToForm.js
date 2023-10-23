'use client'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import classes from './GoToForm.module.css'
import { useCallback, useState } from 'react'
import { useAppStore } from '@/entities/lib/store'
import FormDialog from '@/widgets/form/FormDialog'

export default function GoToForm ({ label }) {
  const [openModalDialog, setOpenModalDialog] = useState(false)
  const { cart, paymentMethod } = useAppStore()

  const cartHasProducts = cart.length > 0

  const closeDialog = useCallback(() => setOpenModalDialog(false), [])

  const openDialog = useCallback(() => {
    cartHasProducts && paymentMethod?.label && setOpenModalDialog(true)
  }, [cartHasProducts, paymentMethod])

  return (
    <>
      <div
        disabled={!cartHasProducts || !paymentMethod?.label}
        className={classes.go_to_form_button}
      >
        <section
          onClick={openDialog}
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
        modalOpenState={openModalDialog}
        closeDialog={closeDialog}
      />
    </>
  )
}
