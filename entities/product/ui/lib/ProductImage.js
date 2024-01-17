'use client'
import classes from './ProductImage.module.css'
import { i18n } from '@/shared/model/i18n'
import { prodGenericImage } from '@/shared/config/prodGenericImage'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import IceIcon from '@/shared/ui/lib/svg/IceIcon'
import CigarIcon from '@/shared/ui/lib/svg/CigarIcon'
import { baseURL, withAuthAPIOptionsObj } from '@/processes/services/config/api'

/** disabled --> image-optimization... OK! */
const { DETAIL_CARD_PRODUCT: { FOOTER: cardFooterTexts } } = i18n.LANG.ESP.UI

export default function ProductImage ({
  width,
  height,
  svgWidth,
  svgHeight,
  alt,
  src,
  imageID,
  category
}) {
  const [fetchedImgSrc, setFetchedImgSrc] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const isCigarOrExtra = cardFooterTexts.generic_action.categories.find(categRegExp => categRegExp.test(category))

  useEffect(() => {
    if (src || !imageID) return
    const getSrc = async () => {
      try {
        const response = await fetch(`${baseURL}/products/img?id=${imageID}`,
          {
            ...withAuthAPIOptionsObj,
            cache: 'force-cache'
          }
        )
        const { message, data: src } = await response.json()
        if (message === 'Success') return src
        throw new Error('retry')
      } catch (error) {
        /** retrying.. */
        if (error.message === 'retry') {
          const response = await fetch(`${baseURL}/products/img?id=${imageID}`,
            {
              ...withAuthAPIOptionsObj,
              cache: 'force-cache'
            }
          )

          const { message, data: src } = await response.json()
          if (message === 'Success') return src
        }
      }
    }

    getSrc().then(setFetchedImgSrc)
  }, [src, imageID, fetchedImgSrc])

  useEffect(() => {
    if (src) return setImgSrc(src)
    else if (fetchedImgSrc) return setImgSrc(fetchedImgSrc)
    setImgSrc(prodGenericImage)
  }, [fetchedImgSrc, src])

  if (isCigarOrExtra && !src) {
    /** Look if it belongs to category 'extra' */
    if (cardFooterTexts.generic_action.categories[0].test(category)) {
      return (
        <IceIcon
          width={svgWidth || 30}
          height={svgHeight || 45}
          title={category}
          priority
        />
      )
    }
    /** Look if it belongs to category 'tabaquería' */
    if (cardFooterTexts.generic_action.categories[1].test(category)) {
      return (
        <CigarIcon
          width={svgWidth || 30}
          height={svgHeight || 45}
          title={category}
        />
      )
    }
  }
  if (!isCigarOrExtra || (isCigarOrExtra && src)) {
    return (
      <Image
        className={classes.product_image}
        width={width}
        height={height}
        alt={alt}
        src={imgSrc}
        onError={() => setImgSrc(prodGenericImage)}
        priority
      />
    )
  }
}
