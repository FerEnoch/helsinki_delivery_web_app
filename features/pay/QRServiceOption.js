import { useAppStore } from '@/entities/lib/store'
import QRImage from './QRImage'
import QRServicesTab from '@/features/pay/QRServicesTab'

export default function QRServiceOption ({ services }) {
  const { paymentService: { service, image } } = useAppStore()
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
