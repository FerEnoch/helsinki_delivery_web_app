import { useAppStore } from '@/entities/lib/store'
import { SERVICES_KIND } from '@/entities/payment/lib/services_kind'
import { priceFormater } from '@/shared/lib/priceFormat/priceFormat'
import { useEffect, useState } from 'react'

export function useSharePaymentData (kindOfService) {
  const { getCartTotalAmount, QRService, isShareApiCompatible, chosenTransferData } = useAppStore()
  const [shareUIButtonText, setShareUIButtonText] = useState('')
  const [copyPasteUIButtonText, setCopyPasteUIButtonText] = useState('')
  const [shareData, setShareData] = useState(null)

  const isQRService = kindOfService === SERVICES_KIND.QR

  useEffect(() => {
    const cartTotalAmount = getCartTotalAmount()
    const formattedCartTotal = priceFormater(cartTotalAmount)
    const shareUIText = `Compartir ${isQRService ? 'código QR' : 'datos de transferencia'}`
    const copyPasteUIText = 'Copiar al portapapeles'
    const titleText = `Helsinki Delivery ${isQRService ? `QR de ${QRService?.service}` : 'datos de transferencia'}`
    const messageText = `Pagá tu compra ${isQRService ? 'con este QR' : 'con estos datos'}. El monto es\n${formattedCartTotal}`
    const url = isQRService ? QRService?.image : null
    const transferData = chosenTransferData ? `CBU: ${chosenTransferData.cbu_or_link}\nALIAS: ${chosenTransferData.alias}\nCUIL: ${chosenTransferData.cuil}\n` : ''

    const dataToShare = {
      title: titleText,
      text: messageText,
      url,
      transferData
    }

    setShareUIButtonText(shareUIText)
    setCopyPasteUIButtonText(copyPasteUIText)
    setShareData(dataToShare)
  }, [isQRService, isShareApiCompatible, getCartTotalAmount, QRService, chosenTransferData])

  return {
    shareUIButtonText,
    copyPasteUIButtonText,
    shareData,
    isShareApiCompatible
  }
}
