'use client'
import CartIconArrowDown from '@/shared/ui/lib/svg/CartIconArrowDown'
import classes from './OfferedProduct.module.css'
import { useState } from 'react'
import OffertModalDialog from './OffertModalDialog'
import IceOrCigarSlider from './IceOrCigarSlider'

export default function OfferedProduct ({ children, label, products, categoryOffering }) {
  const [openModalDialog, setOpenModalDialog] = useState(false)

  const closeDialog = () => setOpenModalDialog(false)

  return (
    <>
      <OffertModalDialog
        openModal={openModalDialog}
        closeDialog={closeDialog}
      >
        <IceOrCigarSlider
          products={products}
          label={label}
          categoryOffering={categoryOffering}
        />
      </OffertModalDialog>
      <button className={classes.prod_wrapper} onClick={() => setOpenModalDialog(true)}>
        <span className={classes.product_icon}>
          {children}
        </span>
        <div className={classes.action_icon}>
          <div>
            <CartIconArrowDown
              width={25}
              height={25}
            />
          </div>
        </div>
      </button>
    </>
  )
}
