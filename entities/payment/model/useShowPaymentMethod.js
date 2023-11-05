import { useAppStore } from '@/entities/lib/store'
import { useEffect, useState } from 'react'
import { SERVICES_KIND } from '../lib/services_kind'

export function useShowPaymentMethod (allMethods) {
  const { paymentMethod, pickQRService, setChosenTransferData } = useAppStore()
  const [chosenQRpaymentData, setChosenQRpaymentData] = useState(null)
  const [chosenTransference, setChosenTransference] = useState(null)
  const [servicesQR, setServicesQR] = useState(null)
  const [kindOfService, setKindOfService] = useState(null)

  useEffect(() => {
    if (paymentMethod.label.includes('QR')) {
      const QRsData = allMethods.filter(method => method?.image && method.payment_method.includes('QR'))
      setChosenQRpaymentData(QRsData)
      pickQRService(QRsData[0])
    } else {
      const [transferData] = allMethods.filter(method => method.payment_method.includes('Transferencia'))
      setChosenTransference(transferData)
      setChosenTransferData(transferData)
    }
  }, [paymentMethod, allMethods, pickQRService, setChosenTransferData])

  useEffect(() => {
    if (!chosenQRpaymentData) return
    if (chosenQRpaymentData.length > 1) {
      const services = chosenQRpaymentData.map(qr => ({ service: qr.service, image: qr.image }))
      setServicesQR(services)
    } else {
      const [qr] = chosenQRpaymentData
      setServicesQR([{ service: qr.service, image: qr.image }])
    }
  }, [chosenQRpaymentData])

  useEffect(() => {
    if (chosenQRpaymentData) return setKindOfService(SERVICES_KIND.QR)
    if (chosenTransference) return setKindOfService(SERVICES_KIND.TRANSFER)
  }, [chosenQRpaymentData, chosenTransference])

  return {
    chosenQRpaymentData,
    servicesQR,
    chosenTransference,
    kindOfService
  }
}
