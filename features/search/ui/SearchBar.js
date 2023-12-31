'use client'
import Lupe from '@/shared/ui/lib/svg/Lupe'
import classes from './SearchBar.module.css'
import { usePathname } from 'next/navigation'
import { i18n } from '@/shared/model/i18n'
import { codecProRegular } from '@/shared/config/fonts'
import { useSearch } from '../model/useSearch'
import ProductListItem from '@/widgets/sliders/ui/lib/ProductListItem'
import SuspenseFallbackLogo from '@/shared/ui/lib/SuspenseFallbackLogo'

const { PLACEHOLDER, NOT_FOUND_PRODUCTS } = i18n.LANG.ESP.UI.SEARCH_BAR

export default function SearchBar () {
  const {
    userInput,
    getSearchParam,
    cleanSearchParams,
    foundProducts,
    isLoading
  } = useSearch()
  const pathName = usePathname()

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
                {foundProducts.map(product => {
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
              <h4 className={codecProRegular.className}>{NOT_FOUND_PRODUCTS}</h4>
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
        style={{ display: pathName.includes('cart') ? 'none' : 'flex' }}
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
