'use client'
import { useEffect, useState } from 'react'
import classes from './SelectQuantitySection.module.css'
import { CART_OPERATIONS, UPDATE_QUANTITY } from '../lib/updateQuantityOperations'

export default function SelectQuantitySection ({ disabled, setProductQuantity }) {
  const [count, setCount] = useState(1)

  const handleUpdateQuantity = (OPERATION) => UPDATE_QUANTITY[OPERATION](setCount)

  useEffect(() => {
    setProductQuantity(count)
  }, [count, setProductQuantity])

  return (
    <div className={classes.select_quantity_wrapper}>
      <button
        disabled={disabled}
        className={classes.operation_button}
        onClick={handleUpdateQuantity(CART_OPERATIONS.DECREMENT)}
      >
        -
      </button>
      <div
        className={classes.count}
        style={{ color: `${disabled ? 'rgb(122, 100, 100)' : '#000'}` }}
      >
        {count}
      </div>
      <button
        disabled={disabled}
        className={classes.operation_button}
        onClick={handleUpdateQuantity(CART_OPERATIONS.INCREMENT)}
      >
        +
      </button>
    </div>
  )
}
