'use client'
import classes from './CategoryList.module.css'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import { useProducts } from '../../lib/useProducts'
import Category from './Category'
import { Toaster } from 'sonner'
import { useDicountToast } from '../../lib/useDiscountToast'

export default function CategoryList ({ categories }) {
  useProducts()
  useDicountToast()

  return (
    <>
      <section className={classes.list_container}>
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
