'use client'
import TrashCube from '@/shared/ui/lib/svg/TrashCube'
import classes from './ClearCart.module.css'
import { useAppStore } from '@/entities/lib/store'

export default function ClearCart ({ label }) {
  const { clearCart } = useAppStore()

  return (
    <button
      className={classes.clear_cart_button}
      onClick={() => clearCart()}
    >
      <span className={classes.trash_cube}>
        <TrashCube
          width={26}
          height={26}
          fill='red'
        />
      </span>
      <p className={classes.text}>{label.toUpperCase()}</p>
    </button>
  )
}
