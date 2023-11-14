import { useAppStore } from '@/entities/lib/store'
import QRImage from './QRImage'
import QRServicesTab from '@/features/pay/QRServicesTab'
import { memo } from 'react'

export default memo(function QRServiceOption ({ services }) {
  const { QRService: { service, image } } = useAppStore()
  return (
    <>
      <QRServicesTab services={services} />
      <QRImage
        service={service}
        image={image}
      />
    </>
  )
}
)
