import { useAppStore } from '@/entities/lib/store'
import { useEffect, useState } from 'react'
import { validatePhoneNumberLength } from './validatePhoneNumberLength'

export function useEnableSubmit () {
  const { client, paymentMethod: { receipt }, receiptFile } = useAppStore()
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

  useEffect(() => {
    const needAddress = !client?.takeAway
    const isInformationCompleted = client?.name && (needAddress ? client?.address : true) && client?.phone

    let isReceiptAddedOn = true
    if (receipt === 'REQUIRED') {
      isReceiptAddedOn = receiptFile
    }

    const isPhoneNumberLongEnough = validatePhoneNumberLength(client?.phone)
    const isButtonDisabled = !isInformationCompleted || !isPhoneNumberLongEnough || !isReceiptAddedOn

    setSubmitButtonDisabled(isButtonDisabled)
  }, [client, receiptFile, receipt])

  return {
    submitButtonDisabled
  }
}
