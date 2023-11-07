import { useSharePaymentData } from '@/features/sharePaymentData/model/useSharePaymentData'
import classes from './TransferenceOption.module.css'

export default function TransferenceOption ({ transferenceData }) {
  const { shareData } = useSharePaymentData()
  const handleClick = async () => {
    const textToClipboard = `${shareData.title}\n${shareData.text}\n${shareData?.url || shareData?.transferData}`
    return await navigator.clipboard.writeText(textToClipboard)
  }
  const { cbu_or_link: cbu, alias, cuil } = transferenceData
  const textCBU = `CBU: ${cbu}`
  const textALIAS = `Alias: ${alias}`
  const textCUIL = `CUIL Nº ${cuil}`

  return (
    <section
      onClick={handleClick}
      className={classes.transference_section_container}
    >
      <div className={classes.data_wrapper}>
        <h3>{textCBU}</h3>
        <h3>{textALIAS}</h3>
        <h3>{textCUIL}</h3>
      </div>
    </section>
  )
}
