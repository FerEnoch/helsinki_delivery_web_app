'use client'
import { i18n } from '@/shared/model/i18n'
import { prodGenericImage } from '@/shared/config/prodGenericImage'
import Image from 'next/image'
import { useState } from 'react'
import IceIcon from '@/shared/ui/lib/svg/IceIcon'
import CigarIcon from '@/shared/ui/lib/svg/CigarIcon'

/** Buscar que sea RSC --> es client para manejar los errores... pero podría no serlo */
/** disabled --> image-optimization... OK! */
const { DETAIL_CARD_PRODUCT: { FOOTER: cardFooterTexts } } = i18n.LANG.ESP.UI

export default function ProductImage ({
  width,
  height,
  alt,
  src,
  category
}) {
  const [errorImage, setErrorImage] = useState(false)
  const isCigarOrExtra = cardFooterTexts.generic_action.categories.find(categRegExp => categRegExp.test(category))

  if (isCigarOrExtra && !src) {
    /** Look if it belongs to category 'extra' */
    if (cardFooterTexts.generic_action.categories[0].test(category)) {
      return (
        <IceIcon
          width={width || 30}
          height={height || 45}
          title={category}
          priority
        />
      )
    }
    /** Look if it belongs to category 'tabaquería' */
    if (cardFooterTexts.generic_action.categories[1].test(category)) {
      return (
        <CigarIcon
          width={width || 30}
          height={height || 45}
          title={category}
        />
      )
    }
  }
  if (!isCigarOrExtra || (isCigarOrExtra && src)) {
    return (
      <Image
        width={width}
        height={height}
        alt={alt}
        src={!errorImage ? (src || prodGenericImage) : prodGenericImage}
        onError={() => setErrorImage(true)}
        priority
      />
    )
  }
}