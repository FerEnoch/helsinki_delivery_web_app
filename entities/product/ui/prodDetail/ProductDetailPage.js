import Nav from '@/shared/ui/model/components/Nav'
import ProductDetailCard from './ProductDetailCard'
import classes from './ProductDetailPage.module.css'

export default function ProductDetailPage ({ product }) {
  const { category, type } = product
  const hasType = !category.includes(type)

  return (
    <>
      <div className={classes.nav_container}>
        <Nav
          category={category}
          type={hasType ? type : ''}
        />
      </div>
      <div className={classes.card_container}>
        <ProductDetailCard
          product={product}
        />
      </div>
    </>
  )
}
