'use client'
import classes from './IceOrCigarSlider.module.css'
import Link from 'next/link'
import CartUnitsSection from './CartUnitsSection'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import { useRef } from 'react'
import { scrollToNextProduct } from '../lib/scrollToNextProduct'
import { useCurrentVisibleProduct } from '../lib/useCurrentVisibleProduct'

export default function IceOrCigarSlider ({ products, label, categoryOffering }) {
  const listRef = useRef(null)
  const [currentVisibleProduct, currentVisibleProdIndex] = useCurrentVisibleProduct(products, listRef)

  const handleScroll = (direction) => () => {
    let nextCardIndex
    if (direction === 'left') {
      nextCardIndex = Number(currentVisibleProdIndex) - 1
      if (nextCardIndex < 0) {
        nextCardIndex = products.length - 1
      }
    }
    if (direction === 'right') {
      nextCardIndex = Number(currentVisibleProdIndex) + 1
      if (nextCardIndex >= products.length) {
        nextCardIndex = 0
      }
    }

    scrollToNextProduct({
      containerRef: listRef,
      direction: 'x',
      index: nextCardIndex ?? 0
    })
  }

  return (
    <article className={classes.article_wrapper}>
      <div className={classes.titles_wrapper}>
        <h3 className={classes.slider_title}>
          {label?.toUpperCase()}
        </h3>
        {categoryOffering && (
          <Link
            href={`/${encodeURIComponent(categoryOffering)}`}
            className={classes.offering_category}
            prefetch={false}
          >
            VER <strong> {categoryOffering.toUpperCase()} </strong>
          </Link>
        )}
      </div>
      <div className={classes.slider_buttons_section}>
        <div className={classes.slider_wrapper}>
          <TriangleButton
            slideDirection='x'
            onClick={handleScroll('left')}
            customClasses={classes.slider_button_left}
            triangleStyle={{ fill: 'black', transform: 'rotate(-90deg) scale(.9)' }}
            width={11}
            height={11}
          />
          <ul ref={listRef} className={classes.products_list}>
            {products.length > 0 &&
               products.map(({ id, category, name }, index) => {
                 return (
                   <li key={id} id={index} className={classes.product_item}>
                     <p>
                       <Link
                         href={`/${encodeURIComponent(category)}/detail/${encodeURIComponent(id)}`}
                         prefetch={false}
                       >
                         {name}
                       </Link>
                     </p>
                   </li>
                 )
               })}
          </ul>
          <TriangleButton
            slideDirection='x'
            onClick={handleScroll('right')}
            customClasses={classes.slider_button_right}
            triangleStyle={{ fill: 'black', transform: 'rotate(90deg) scale(.9)' }}
            width={11}
            height={11}
          />
        </div>
        <div className={classes.units_measure}>
          <CartUnitsSection
            color='white'
            currentProduct={{ ...currentVisibleProduct }}
            displayQuantity={false}
          />
        </div>
      </div>
    </article>
  )
}
