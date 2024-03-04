import { useProducts } from '@/entities/product/lib/useProducts'
import { scrollToNextProduct } from '@/features/addToCart/lib/scrollToNextProduct'
import { useEffect, useImperativeHandle, useRef, useState } from 'react'

export function useProductList ({ category, type, isCombo, handleArrowsVisibility, ref }) {
  const listRef = useRef(null)
  const [currentProdsViewIndex, setCurrentProdsViewIndex] = useState(0)
  const { data: { sortedProducts: categoryProductList = [] }, isLoading } = useProducts(
    { criteria: 'category', value: category },
    { whereField: 'type', isEqual: type || '*' })

  useImperativeHandle(ref, () => {
    const prodsToDeplace = isCombo ? 1 : 2
    return {
      handleScroll (scrollDirection) {
        let nextCardIndex
        if (scrollDirection === 'up') {
          nextCardIndex = currentProdsViewIndex - prodsToDeplace
          if (nextCardIndex < 0) {
            nextCardIndex = categoryProductList.length - prodsToDeplace
          }
        }
        if (scrollDirection === 'down') {
          nextCardIndex = currentProdsViewIndex + prodsToDeplace
          if (nextCardIndex >= categoryProductList.length - prodsToDeplace) {
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
  }, [categoryProductList, currentProdsViewIndex, isCombo])

  useEffect(() => {
    if (categoryProductList) {
      handleArrowsVisibility(categoryProductList.length)
    }
  }, [categoryProductList, handleArrowsVisibility])

  return {
    listRef,
    categoryProductList,
    isLoading
  }
}
