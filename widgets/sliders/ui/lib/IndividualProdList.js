import classes from './IndividualProdList.module.css'

import SuspenseFallbackLogo from '@/shared/ui/lib/SuspenseFallbackLogo'
import ProductListItem from './ProductListItem'

export function IndividualProdList ({ categoryProductList, isLoading }) {
  return (
    <ul
      style={{
        height: `${categoryProductList?.length > 4 ? '15.5rem' : ''}`,
        maxHeight: '15.5rem'
      }} className={classes.product_list}
    >
      <SuspenseFallbackLogo
        isLoading={isLoading} height={100} logoStyle={{
          fill: '#fff',
          fillOpacity: 0.9
        }}
      >
        {!!categoryProductList?.length && categoryProductList
          .toSorted(prod => prod.stock ? -1 : 1)
          .map(product => {
            return (
              <ProductListItem
                key={product.id}
                product={product}
              />
            )
          })}
      </SuspenseFallbackLogo>
    </ul>
  )
}
