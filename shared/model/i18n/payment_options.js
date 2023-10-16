import BankTransferenceIcon from '@/shared/ui/lib/svg/BankTransferenceIcon'
import CashOnDeliveryIcon from '@/shared/ui/lib/svg/CashOnDeliveryIcon'
import IconQR from '@/shared/ui/lib/svg/IconQR'

export const PAYMENT_OPTIONS = [
  {
    id: '#pm_01',
    label: 'Abono en el domicilio',
    comment: 'Se agradece pagar con el monto justo',
    recipe: 'NOT_REQUIRED',
    icon: <CashOnDeliveryIcon />
  },
  {
    id: '#pm_02',
    label: 'App con código QR',
    comment: 'Obligatorio: enviar comprobante de operación',
    recipe: 'REQUIRED',
    icon: <IconQR />
  },
  {
    id: '#pm_03',
    label: 'Transf. bancaria',
    comment: 'Obligatorio: enviar comprobante de operación',
    recipe: 'REQUIRED',
    icon: <BankTransferenceIcon />
  }
]
