import { i18n } from '@/shared/model/i18n'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import classes from './DetailCardFooter.module.css'
import IceIcon from '@/shared/ui/lib/svg/IceIcon'
import CigarIcon from '@/shared/ui/lib/svg/CigarIcon'
import OfferedProduct from '@/features/addToCart/ui/OfferedProduct'
import { getAggregates } from '../../lib/getAggregates'

const {
  DETAIL_CARD_PRODUCT: {
    FOOTER: {
      generic_action: {
        categories,
        text
      },
      action,
      OFFERED_PRODUCTS
    }
  }
} = i18n.LANG.ESP.UI

export default async function DetailCardFooter ({ category }) {
  const isCigarOrExtra = categories
    .find(categRegExp => categRegExp.test(category))

  const [cigarProducts, iceProducts] = await getAggregates()

  if (isCigarOrExtra) {
    return (
      <footer className={classes.detail_card_footer_generic_text}>
        <p className={classes.generic_action_text}>
          {formatUpperCase(text) || text.toUpperCase()}
        </p>
      </footer>
    )
  }

  return (
    <footer className={classes.detail_card_footer}>
      <div className={classes.action}>
        <p>
          {formatUpperCase(action) || action.toUpperCase()}
        </p>
      </div>
      {
        OFFERED_PRODUCTS?.map(({ label, categoryOffering }) => {
          return (
            <OfferedProduct
              key={label}
              label={label}
              categoryOffering={categoryOffering}
              products={label.match(OFFERED_PRODUCTS[0].regExp) ? iceProducts : cigarProducts}
            >
              {label.match(OFFERED_PRODUCTS[0].regExp)
                ? (
                  <IceIcon
                    width={50}
                    height={60}
                    title={label}
                  />
                  )
                : (
                  <CigarIcon
                    width={50}
                    heigth={70}
                    title={label}
                  />
                  )}
            </OfferedProduct>
          )
        })
      }
    </footer>
  )
}
