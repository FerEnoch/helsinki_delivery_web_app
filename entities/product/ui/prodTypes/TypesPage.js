import classes from './TypesPage.module.css'
import ProductListClient from '@/widgets/sliders/ui/ProductListClient'
import CategoryTitleNav from '@/widgets/lib/CategoryTitleNav'
import { Suspense } from 'react'
import { TypesTitles } from './TypesTitles'

export default function TypesPage ({ category, subtypes, isCombo }) {
  const isSubtypePage = subtypes && subtypes.length === 1
  return (
    <div className={classes.type_product_container}>
      <div className={classes.golden_line} />
      <CategoryTitleNav category={category} />
      {!isCombo && <TypesTitles subtypes={subtypes} category={category} />}
      <Suspense>
        <ProductListClient
          category={category}
          type={isSubtypePage ? subtypes[0] : null}
          isCombo={isCombo}
        />
      </Suspense>
    </div>
  )
}
