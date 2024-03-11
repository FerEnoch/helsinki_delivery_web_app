'use client'
import classes from './ComboDescription.module.css'
import { useAppStore } from '@/entities/lib/store'
import Link from 'next/link'

export default function ComboDescription ({ products }) {
  const { stockProducts } = useAppStore()
  return (
    <>
      {
        products?.map(([prodId, prodQuantity]) => {
          const foundProd = stockProducts.find(({ id }) => id === prodId)
          if (!foundProd) return null
          return (
            <div key={prodId} className={classes.prod}>
              <span className={classes.prod_name}>
                <Link
                  href={`/${encodeURIComponent(foundProd.category)}/detail/${encodeURIComponent(foundProd.id)}`}
                  prefetch={false}
                >
                  {foundProd.name}
                </Link>
              </span>
              <span className={classes.prod_quantity}>
                {`x${prodQuantity}`}
              </span>
            </div>
          )
        })
          .filter(Boolean)
    }
    </>
  )
}
