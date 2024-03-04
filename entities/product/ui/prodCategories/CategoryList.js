'use client'
import classes from './CategoryList.module.css'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import { useProducts } from '../../lib/useProducts'
import Category from './Category'
import { Toaster } from 'sonner'
import { useInitialToast } from '../../lib/useInitialToast'
import { useEffect } from 'react'

export default function CategoryList ({ categories, combosLabels }) {
  useProducts()
  useInitialToast()

  useEffect(() => {
    if (!categories?.length) window.location.reload()
  }, [categories])

  return (
    <>
      <section className={classes.list_container}>
        {
          combosLabels.length > 0 && combosLabels.map(label => {
            const formattedLabel = formatUpperCase(label)
            return (
              <Category
                key={label}
                path={label}
                category={formattedLabel || label.toUpperCase()}
              />
            )
          })
          }
        <ul className={classes.link_list}>
          {
          categories?.length > 0 && categories?.map(category => {
            const formattedCategory = formatUpperCase(category)
            return (
              <Category
                key={category}
                path={category}
                category={formattedCategory || category.toUpperCase()}
              />
            )
          })
        }
        </ul>
      </section>
      <Toaster />
    </>
  )
}
