import { useAppStore } from '@/entities/lib/store'
import { SERVICES_KIND } from '@/entities/payment/lib/services_kind'
import { priceFormater } from '@/shared/lib/priceFormat/priceFormat'
import { useEffect, useState } from 'react'
import { useIsShareAPICompatible } from './useIsShareAPICompatible'
import { getFileBlob } from '../../../processes/services/model/client/getFileBlob'

export function useSharePaymentData (kindOfService) {
  const { getCartTotalAmount, QRService, chosenTransferData } = useAppStore()
  const { isCompatible } = useIsShareAPICompatible()
  const [shareUIButtonText, setShareUIButtonText] = useState('')
  const [copyPasteUIButtonText, setCopyPasteUIButtonText] = useState('')
  const [shareData, setShareData] = useState(null)

  const hasChosenQRService = kindOfService === SERVICES_KIND.QR

  useEffect(() => {
    const dataShareMap = new Map()
    const setDataShareMap = () => {
      const qrURL = QRService?.image || undefined
      const titleText = `Helsinki Delivery ${hasChosenQRService ? `QR de ${QRService?.service}` : 'datos de transferencia'}`
      const messageText = `
      Helsinki Delivery:
      Pagá tu pedido ${hasChosenQRService ? `con este QR de ${QRService?.service}` : 'con estos datos'}.
      El monto es ${priceFormater(getCartTotalAmount())}.
      ${hasChosenQRService
        ? `Código QR: ${qrURL}`
        : `
        CBU: ${chosenTransferData.cbu_or_link}
        ALIAS: ${chosenTransferData.alias}
        CUIL: ${chosenTransferData.cuil}`}
        `

      dataShareMap.set('title', titleText)
      dataShareMap.set('text', messageText)

      if (hasChosenQRService) {
        getFileBlob(qrURL).then(blobFile => {
          const file = new File([blobFile], 'Helsinki-Delivery-QR', { type: blobFile.type })
          dataShareMap.set('files', [file])
        })
      }

      return Object.fromEntries([...dataShareMap])
    }

    const shareDataObject = setDataShareMap()
    setShareData(shareDataObject)
  }, [hasChosenQRService, getCartTotalAmount, QRService, chosenTransferData])

  useEffect(() => {
    const shareUIText = `Compartir ${hasChosenQRService ? 'código QR' : 'datos de transferencia'}`
    const copyPasteUIText = 'Copiar al portapapeles'
    setShareUIButtonText(shareUIText)
    setCopyPasteUIButtonText(copyPasteUIText)
  }, [hasChosenQRService])

  console.log(shareData)

  return {
    shareUIButtonText,
    copyPasteUIButtonText,
    shareData,
    isShareApiCompatible: isCompatible
  }
}
