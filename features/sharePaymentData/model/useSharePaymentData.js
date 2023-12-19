import { SERVICES_KIND } from '@/entities/payment/lib/services_kind'
import { useEffect, useMemo, useState } from 'react'
import { useIsShareAPICompatible } from './useIsShareAPICompatible'
import { useDataToShare } from '../lib/useDataToShare'

export function useSharePaymentData (kindOfService) {
  const { isCompatible } = useIsShareAPICompatible()
  const [shareUIButtonText, setShareUIButtonText] = useState('')
  const [copyPasteUIButtonText, setCopyPasteUIButtonText] = useState('')

  const hasChosenQRService = useMemo(() => kindOfService === SERVICES_KIND.QR, [kindOfService])
  const { shareData } = useDataToShare({ hasChosenQRService })

  useEffect(() => {
    const shareUIText = `Compartir ${hasChosenQRService ? 'código QR' : 'datos de transferencia'}`
    const copyPasteUIText = `Copiar ${hasChosenQRService ? 'link' : 'datos'} al portapapeles`
    setShareUIButtonText(shareUIText)
    setCopyPasteUIButtonText(copyPasteUIText)
  }, [hasChosenQRService])

  return {
    shareUIButtonText,
    copyPasteUIButtonText,
    shareData,
    isShareApiCompatible: isCompatible
  }
}
