'use client'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import classes from './ProductList.module.css'
import { useProducts } from '@/entities/product/lib/useProducts'
import { i18n } from '@/shared/model/i18n'
import { scrollToNextProduct } from '@/features/addToCart/lib/scrollToNextProduct'
import ProductListItem from './ProductListItem'

const { DETAIL_CARD_PRODUCT: { FOOTER: cardFooterTexts } } = i18n.LANG.ESP.UI

export default forwardRef(function ProductList ({
  category,
  type = '',
  handleArrowsVisibility
}, ref) {
  const listRef = useRef(null)
  const [currentVisibleProds, setCurrentVisibleProds] = useState(0)
  const { data: { sortedProducts: categoryProductList }, isLoading } = useProducts(
    { criteria: 'category', value: category },
    { whereField: 'type', isEqual: type || '*' })

  const isCigarOrExtra = cardFooterTexts.generic_action.categories.find(categRegExp => categRegExp.test(category))

  useImperativeHandle(ref, () => {
    return {
      handleScroll (scrollDirection) {
        let nextCardIndex
        if (scrollDirection === 'up') {
          nextCardIndex = currentVisibleProds - 1
          if (nextCardIndex < 0) {
            nextCardIndex = ((categoryProductList.length / 4)) - 1
          }
        }
        if (scrollDirection === 'down') {
          nextCardIndex = currentVisibleProds + 1
          if (nextCardIndex >= (categoryProductList.length / 4)) {
            nextCardIndex = 0
          }
        }

        const currentIndex = scrollToNextProduct({
          containerRef: listRef,
          direction: 'y',
          index: nextCardIndex,
          correctionPixels: 4
        })

        setCurrentVisibleProds(currentIndex)
      }
    }
  }, [categoryProductList, currentVisibleProds])

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
      {
        isLoading && <h2>Loading...</h2>
      }
      <ul className={classes.product_list}>
        {
        !!categoryProductList?.length &&
          categoryProductList.map(product => {
            return (
              <ProductListItem
                isCigarOrExtra={isCigarOrExtra}
                key={product.id}
                product={{ ...product }}
              />
            )
          })
      }
      </ul>
    </section>
  )
})
