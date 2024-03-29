'use client'
import Lupe from '@/shared/ui/lib/svg/Lupe'
import classes from './SearchBar.module.css'
import { usePathname } from 'next/navigation'
import { i18n } from '@/shared/model/i18n'
import { codecProRegular } from '@/shared/config/fonts'
import { useSearch } from '../model/useSearch'
import ProductListItem from '@/widgets/sliders/ui/lib/ProductListItem'
import SuspenseFallbackLogo from '@/shared/ui/lib/SuspenseFallbackLogo'
import { useEffect, useState } from 'react'

const { PLACEHOLDER, NOT_FOUND_PRODUCTS } = i18n.LANG.ESP.UI.SEARCH_BAR

export default function SearchBar () {
  const [displaySearchBar, setDisplaySearchBar] = useState(true)
  const {
    userInput,
    getSearchParam,
    cleanSearchParams,
    foundProducts,
    isLoading
  } = useSearch()
  const pathName = usePathname()

  useEffect(() => {
    const notDisplaySearchBar = pathName.includes('cart') || pathName.includes('info')
    setDisplaySearchBar(!notDisplaySearchBar)
  }, [pathName])

  const showResults = () => {
    return (
      foundProducts.length > 0
        ? (
          <section className={classes.product_list_container}>
            <SuspenseFallbackLogo
              isLoading={isLoading}
              height={100}
              logoStyle={{
                fill: '#fff',
                fillOpacity: 0.9
              }}
            >
              <ul className={classes.product_list}>
                {foundProducts
                  .toSorted(prod => prod.stock ? -1 : 1)
                  .map(product => {
                    return (
                      <ProductListItem
                        key={product.id}
                        product={product}
                      />
                    )
                  })}
              </ul>
            </SuspenseFallbackLogo>
          </section>
          )
        : (
          <section className={classes.product_list_container}>
            <SuspenseFallbackLogo
              isLoading={isLoading}
              height={100}
              logoStyle={{
                fill: '#fff',
                fillOpacity: 0.9
              }}
            >
              {
                NOT_FOUND_PRODUCTS.split('\n').map(phrase => {
                  return (
                    <p
                      key={phrase}
                      className={`
                      ${classes.noFoundText}
                      ${codecProRegular.className}
                      `}
                    >{phrase}
                    </p>
                  )
                })
              }
            </SuspenseFallbackLogo>
          </section>
          )
    )
  }

  return (
    <>
      <div
        role='search'
        className={classes.search_container}
        style={{ display: displaySearchBar ? 'flex' : 'none' }}
      >
        <input
          id='search_input'
          className={`${classes.input_search} ${codecProRegular.className}`}
          type='text'
          placeholder={PLACEHOLDER}
          value={userInput}
          onChange={getSearchParam}
          onBlur={cleanSearchParams}
        />
        <label htmlFor='search_input'>
          <span className={classes.search_lupe}>
            <Lupe
              className={classes.icon_lupe}
              width={25}
              height={25}
              fill='white'
            />
          </span>
        </label>
      </div>
      {foundProducts && showResults()}
    </>
  )
}
