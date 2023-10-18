'use client'
import Link from 'next/link'
import classes from './HeaderCartIcon.module.css'
import Cart from '@/shared/ui/lib/svg/Cart'
import { useAppStore } from '@/entities/lib/store'
import SmallCircle from '@/shared/ui/lib/svg/SmallCircle'
import { Suspense, useEffect, useState } from 'react'

export default function HeaderCartIcon () {
  const { cart, getCartTotalAmount } = useAppStore()
  const [productAdded, setProductAdded] = useState(false)
  const [previousTotalAmount, setPreviousTotalAmount] = useState(getCartTotalAmount())
  const [isAdding, setIsAdding] = useState(true)

  const currentTotalAmount = getCartTotalAmount()

  useEffect(() => {
    setIsAdding(() => previousTotalAmount > currentTotalAmount || previousTotalAmount === currentTotalAmount)
    setPreviousTotalAmount(currentTotalAmount)
  }, [previousTotalAmount, currentTotalAmount])

  useEffect(() => {
    if (!isAdding) return
    setProductAdded(true)
    const timer = setTimeout(() => setProductAdded(false), 250)
    return () => timer && clearTimeout(timer)
  }, [isAdding])

  return (
    <div className={classes.button_cart}>
      <Link href='/cart'>
        <Cart
          className={`${classes.icon_cart} ${productAdded ? classes.bump : ''}`}
          width={25}
          height={25}
          fill='white'
        />
        {
            cart.length > 0 && (
              <Suspense>
                <span className={classes.small_circle}>
                  <SmallCircle radius={8} />
                </span>
              </Suspense>
            )
          }
      </Link>
    </div>
  )
}
