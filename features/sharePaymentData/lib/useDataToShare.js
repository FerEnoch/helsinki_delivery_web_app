import { useAppStore } from '@/entities/lib/store'

export function useDataToShare ({ hasChosenQRService }) {
  const { getCartTotalAmount, QRService, chosenTransferData } = useAppStore()

  const dataShareMap = new Map()

  const titleText = `Helsinki Delivery ${hasChosenQRService ? `QR de ${QRService?.service}` : 'datos de transferencia'}`
  const messageText = `
      Helsinki Delivery:
      Pagá tu pedido ${hasChosenQRService ? `con este QR de ${QRService?.service}` : 'con estos datos'}.
      El monto es ${getCartTotalAmount()}.
      ${hasChosenQRService
        ? `Código QR:\n ${QRService?.image}`
        : `
        CBU: ${chosenTransferData.cbu_or_link}
        ALIAS: ${chosenTransferData.alias}
        CUIL: ${chosenTransferData.cuil}`}
        `

  dataShareMap.set('title', titleText)
  dataShareMap.set('text', messageText)

  return { shareData: Object.fromEntries([...dataShareMap]) }
}
