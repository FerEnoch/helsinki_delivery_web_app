import { useAppStore } from '@/entities/lib/store'
import { useEffect, useState } from 'react'

export function useShowPaymentMethod (allMethods) {
  const { paymentMethod } = useAppStore()
  const [chosenQR, setChosenQR] = useState(null)
  const [servicesQR, setServicesQR] = useState(null)
  const [chosenTransference, setChosenTransference] = useState(null)

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
    } else {
      const [qr] = chosenQR
      setServicesQR([{ service: qr.service, image: qr.image }])
    }
  }, [chosenQR])

  return {
    chosenQR,
    servicesQR,
    chosenTransference
  }
}
