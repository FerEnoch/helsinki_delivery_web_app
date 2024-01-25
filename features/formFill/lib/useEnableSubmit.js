import { useAppStore } from '@/entities/lib/store'
import { useEffect, useState } from 'react'
import { validatePhoneNumberLength } from './validatePhoneNumberLength'

export function useEnableSubmit () {
  const { client, paymentMethod: { receipt }, receiptFile, selectedDeliveryMethod } = useAppStore()
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  useEffect(() => {
    const isTakeAway = /take-?\s?away/i.test(selectedDeliveryMethod?.label)
    const isInformationCompleted = client?.name && (isTakeAway ? true : client?.address) && client?.phone

    let isReceiptAddedOn = true
    if (receipt === 'REQUIRED') {
      isReceiptAddedOn = receiptFile
    }

    const isPhoneNumberLongEnough = validatePhoneNumberLength(client?.phone)
    const isButtonDisabled = !isInformationCompleted || !isPhoneNumberLongEnough || !isReceiptAddedOn

    setSubmitButtonDisabled(isButtonDisabled)
  }, [client, receiptFile, receipt, selectedDeliveryMethod])

  return {
    submitButtonDisabled
  }
}
