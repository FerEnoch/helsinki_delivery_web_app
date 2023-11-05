import { useAppStore } from '@/entities/lib/store'
import { SERVICES_KIND } from '@/entities/payment/lib/services_kind'
import { priceFormater } from '@/shared/lib/priceFormat/priceFormat'
import { useEffect, useState } from 'react'

export function useSharePaymentData (kindOfService) {
  const { getCartTotalAmount, QRService, isQRShareable, chosenTransferData } = useAppStore()
  const [shareUIButtonText, setShareUIButtonText] = useState('')
  const [shareData, setShareData] = useState(null)

  const isQRService = kindOfService === SERVICES_KIND.QR

  useEffect(() => {
    const cartTotalAmount = getCartTotalAmount()
    const formattedCartTotal = priceFormater(cartTotalAmount)
    const shareUIText = `${isQRShareable ? 'Compartir' : 'Copiar'} ${isQRService ? 'código QR' : 'datos de transferencia'}`
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
    setShareData(dataToShare)
  }, [isQRService, isQRShareable, getCartTotalAmount, QRService, chosenTransferData])

  return {
    shareUIButtonText,
    shareData,
    isQRShareable
  }
}
