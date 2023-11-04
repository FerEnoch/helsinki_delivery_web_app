export default function TransferenceData ({ transferenceData }) {
  const { cbu_or_link: cbu, alias, cuil } = transferenceData
  return (
    <>
      <h3>{cbu}</h3>
      <h3>{alias}</h3>
      <h3>{cuil}</h3>
    </>
  )
}
