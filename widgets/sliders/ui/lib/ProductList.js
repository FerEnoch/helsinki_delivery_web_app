'use client'
import { forwardRef } from 'react'
import classes from './ProductList.module.css'
import { useProductList } from '../../lib/useProductList'
import { IndividualProdList } from './IndividualProdList'
import { CombosList } from './CombosList'

export default forwardRef(function ProductList ({
  category,
  type = '',
  isCombo,
  handleArrowsVisibility
}, ref) {
  const {
    listRef,
    categoryProductList,
    isLoading
  } = useProductList({
    category,
    type,
    isCombo,
    handleArrowsVisibility,
    ref
  })

  return (
    <section
      ref={listRef}
      className={classes.product_list_container}
      style={
        isCombo
          ? {
              paddingInlineEnd: '.2rem'
            }
          : {}
    }
    >
      {
        isCombo
          ? (
            <CombosList
              categoryProductList={categoryProductList}
              isLoading={isLoading}
            />
            )
          : (
            <IndividualProdList
              categoryProductList={categoryProductList}
              isLoading={isLoading}
            />
            )
          }
    </section>
  )
})
