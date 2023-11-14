import { useAppStore } from '@/entities/lib/store'
import classes from './QRImage.module.css'
import Image from 'next/image'
/**
 * TO - DO -->> Handle loading image error
 */
export default function QRImage () {
  const { QRService: { service, image } } = useAppStore()

  const handleImageError = () => { }

  return (
    <article className={classes.qr_image_container}>
      <Image
        className={classes.qr_image}
        width={250}
        height={250}
        alt={service}
        src={image}
        onError={handleImageError}
        priority
      />
    </article>
  )
}
