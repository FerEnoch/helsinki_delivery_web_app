import CartIconArrowDown from '@/shared/ui/lib/svg/CartIconArrowDown'
import classes from './AddToCartButton.module.css'
import { useAppStore } from '@/entities/lib/store'
import { useEffect } from 'react'
import { useClearData } from '@/features/formFill/lib/useClearData'

export default function AddToCartButton ({ disabled, onClick }) {
  const { formSuccessfulSubmitOperation } = useAppStore()
  const { handleClearData } = useClearData()

  useEffect(() => {
    if (formSuccessfulSubmitOperation) handleClearData()
  }, [formSuccessfulSubmitOperation, handleClearData])

  return (
    <button
      disabled={disabled}
      className={classes.add_to_cart_button}
      onClick={onClick}
    >
      <CartIconArrowDown
        disabled={disabled}
        width={25}
        height={25}
      />
    </button>
  )
}
