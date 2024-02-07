'use client'
import { i18n } from '@/shared/model/i18n'
import classes from './SeeZonesButton.module.css'
import { codecProRegular } from '@/shared/config/fonts'
import { Toaster, toast } from 'sonner'
import Image from 'next/image'

const { MAP_BUTTON } = i18n.LANG.ESP.UI.ZONES_PROMPT
let showing

export default function SeeZonesButton () {
  const buttonText = MAP_BUTTON.toUpperCase()

  const showMap = () => {
    if (!showing) {
      showing = true
      return toast((
        <div className={classes.toast}>
          <Image
            className={classes.image}
            src='/assets//SantaFeMap.png'
            width={200}
            height={250}
            alt='Mapa de las zonas de entrega en la Ciudad de Santa Fe'
            priority
          />
        </div>
      ), {
        duration: Infinity,
        dismissible: true,
        position: 'bottom-center',
        onDismiss: () => {
          showing = false
        }
      })
    }
  }

  return (
    <>
      <button
        className={classes.see_zones}
        onClick={showMap}
      >
        <p className={codecProRegular.className}>
          {buttonText}
        </p>
      </button>
      <Toaster />
    </>
  )
}
