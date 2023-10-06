import CartIconArrowDown from '@/shared/ui/lib/svg/CartIconArrowDown'
import classes from './AddToCartButton.module.css'

export default function AddToCartButton ({ disabled, onClick }) {
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
