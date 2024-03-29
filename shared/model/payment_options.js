import BankTransferenceIcon from '@/shared/ui/lib/svg/BankTransferenceIcon'
import CashOnDeliveryIcon from '@/shared/ui/lib/svg/CashOnDeliveryIcon'
import IconQR from '@/shared/ui/lib/svg/IconQR'

export const PAYMENT_OPTIONS = [
  {
    id: '#pm_01',
    isCash: true,
    label: 'Abono en efectivo', // Abono en el domicilio
    comment: 'Se agradece pagar con el monto justo',
    receipt: 'NOT_REQUIRED',
    icon: <CashOnDeliveryIcon />
  },
  {
    id: '#pm_02',
    isCash: false,
    label: 'QR de Billetera Santa Fe', // App con código QR
    comment: 'Obligatorio: enviar comprobante de operación',
    receipt: 'REQUIRED',
    icon: <IconQR />
  },
  {
    id: '#pm_03',
    isCash: false,
    label: 'Transferencia Marcado Pago', // Transferencia bancaria
    comment: 'Obligatorio: enviar comprobante de operación',
    receipt: 'REQUIRED',
    icon: <BankTransferenceIcon />
  }
]
