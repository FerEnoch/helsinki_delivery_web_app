import classes from './TypesPage.module.css'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import Link from 'next/link'
import ProductListClient from '@/widgets/sliders/ui/ProductListClient'
import CategoryTitleNav from '@/widgets/lib/CategoryTitleNav'

export default function TypesPage ({ category, subtypes }) {
  return (
    <div className={classes.type_product_container}>
      <CategoryTitleNav category={category} />
      <section className={classes.list_container}>
        <ul className={classes.link_list}>
          {
            subtypes?.length > 0 && subtypes.map(type => {
              const formattedType = formatUpperCase(type)
              return (
                <section
                  style={subtypes.length === 1 ? { gridArea: 'center' } : {}}
                  key={type}
                >
                  <Link href={`/${encodeURIComponent(category)}/${encodeURIComponent(type)}`}>
                    <li className={classes.link}>
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
  )
}
