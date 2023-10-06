import linkClasses from '../prodCategories/CategoryList.module.css'

// '../ListContainer.module.css' ??
import listClasses from '../prodCategories/CategoryListContainer.module.css' // ??

import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import classes from './TypeProd.module.css'
import Link from 'next/link'
import ProductListClient from '@/widgets/sliders/ui/ProductListClient'
import Nav from '@/shared/ui/model/components/Nav'
import { Suspense } from 'react'

export default function TypesPage ({ category, subtypes }) {
  return (
    <Suspense>
      <div className={classes.type_product_container}>
        <Nav category={category} />
        <section className={listClasses.list_container}>
          <ul className={linkClasses.link_list}>
            {
            !!(subtypes.length) && subtypes.map(type => {
              const formattedType = formatUpperCase(type)
              return (
                <section
                  style={subtypes.length === 1 ? { gridArea: 'center' } : {}}
                  key={type}
                >
                  <Link href={`/${encodeURIComponent(category)}/${encodeURIComponent(type)}`}>
                    <li className={linkClasses.link}>
                      {formattedType || type.toUpperCase()}
                    </li>
                  </Link>
                </section>
              )
            })
        }
          </ul>
        </section>
        <ProductListClient category={category} />
      </div>
    </Suspense>
  )
}
