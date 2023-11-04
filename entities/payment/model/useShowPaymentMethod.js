import { useAppStore } from '@/entities/lib/store'
import { useEffect, useState } from 'react'
import { SERVICES_KIND } from '../lib/services_kind'

export function useShowPaymentMethod (allMethods) {
  const { paymentMethod, pickPaymentService } = useAppStore()
  const [chosenQR, setChosenQR] = useState(null)
  const [chosenTransference, setChosenTransference] = useState(null)
  const [servicesQR, setServicesQR] = useState(null)
  const [kindOfService, setKindOfService] = useState(null)

  useEffect(() => {
    if (paymentMethod.label.includes('QR')) {
      const QRsData = allMethods.filter(method => method.payment_method.includes('QR'))
      setChosenQR(QRsData)
    } else {
      const [transferData] = allMethods.filter(method => method.payment_method.includes('Transferencia'))
      setChosenTransference(transferData)
    }
  }, [paymentMethod, allMethods])

  useEffect(() => {
    if (!chosenQR) return
    if (chosenQR.length > 1) {
      const services = chosenQR.map(qr => ({ service: qr.service, image: qr.image }))
      setServicesQR(services)
      pickPaymentService(services[0])
    } else {
      const [qr] = chosenQR
      setServicesQR([{ service: qr.service, image: qr.image }])
    }
  }, [chosenQR, pickPaymentService])

  useEffect(() => {
    if (chosenQR) return setKindOfService(SERVICES_KIND.QR)
    if (chosenTransference) return setKindOfService(SERVICES_KIND.TRANSFER)
  }, [chosenQR, chosenTransference])

  return {
    chosenQR,
    servicesQR,
    chosenTransference,
    kindOfService
  }
}
