import { useAppStore } from '@/entities/lib/store'
import classes from './QRImage.module.css'
import Image from 'next/image'

export default function QRImage () {
  const { QRService: { service, image } } = useAppStore()

  const handleImageError = () => { }

  return (
    <article className={classes.qr_image_container}>
      <Image
        className={classes.qr_image}
        width={200}
        height={200}
        alt={service}
        src={image}
        onError={handleImageError}
      />
    </article>
  )
}
