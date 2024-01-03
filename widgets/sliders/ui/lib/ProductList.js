'use client'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import classes from './ProductList.module.css'
import { useProducts } from '@/entities/product/lib/useProducts'
import { scrollToNextProduct } from '@/features/addToCart/lib/scrollToNextProduct'
import ProductListItem from './ProductListItem'
import SuspenseFallbackLogo from '@/shared/ui/lib/SuspenseFallbackLogo'

export default forwardRef(function ProductList ({
  category,
  type = '',
  handleArrowsVisibility
}, ref) {
  const listRef = useRef(null)
  const [currentProdsViewIndex, setCurrentProdsViewIndex] = useState(0)
  const { data: { sortedProducts: categoryProductList }, isLoading } = useProducts(
    { criteria: 'category', value: category },
    { whereField: 'type', isEqual: type || '*' })

  useImperativeHandle(ref, () => {
    return {
      handleScroll (scrollDirection) {
        let nextCardIndex
        if (scrollDirection === 'up') {
          nextCardIndex = currentProdsViewIndex - 2
          if (nextCardIndex < 0) {
            nextCardIndex = categoryProductList.length - 2
          }
        }
        if (scrollDirection === 'down') {
          nextCardIndex = currentProdsViewIndex + 2
          if (nextCardIndex >= categoryProductList.length - 2) {
            nextCardIndex = 0
          }
        }

        const currentIndex = scrollToNextProduct({
          containerRef: listRef,
          direction: 'y',
          index: nextCardIndex,
          cardWidth: listRef.current.children[0]?.firstChild.offsetHeight + 5
        })

        setCurrentProdsViewIndex(currentIndex)
      }
    }
  }, [categoryProductList, currentProdsViewIndex])

  useEffect(() => {
    if (categoryProductList) {
      handleArrowsVisibility(categoryProductList.length)
    }
  }, [categoryProductList, handleArrowsVisibility])

  return (
    <section
      ref={listRef}
      className={classes.product_list_container}
    >
      <ul className={classes.product_list}>
        <SuspenseFallbackLogo
          isLoading={isLoading}
          height={100}
          logoStyle={{
            fill: '#fff',
            fillOpacity: 0.9
          }}
        >
          {
          !!categoryProductList?.length &&
          categoryProductList.map(product => {
            return (
              <ProductListItem
                key={product.id}
                product={product}
              />
            )
          })
            }
        </SuspenseFallbackLogo>
      </ul>
    </section>
  )
})
