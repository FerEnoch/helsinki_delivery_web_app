'use client'
import Link from 'next/link'
import listClasses from './CategoryListContainer.module.css'
import linkClasses from './CategoryList.module.css'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import { useProducts } from '../../lib/useProducts'
import { Suspense } from 'react'

export default function CategoryList ({ categories }) {
  useProducts()

  return (
    <Suspense>
      <section className={listClasses.list_container}>
        <ul className={linkClasses.link_list}>
          {
         categories?.length > 0 && categories?.map(category => {
           const formattedCategory = formatUpperCase(category)
           return (
             <article key={category}>
               <Link href={`/${encodeURIComponent(category)}`}>
                 <li className={linkClasses.link}>
                   {formattedCategory || category.toUpperCase()}
                 </li>
               </Link>
             </article>
           )
         })
        }
        </ul>
      </section>
    </Suspense>
  )
}
