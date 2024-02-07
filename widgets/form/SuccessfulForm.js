import FormSuccessfulState from './FormSuccessfulState'
import SuccessHero from './SuccessHero'
import SuccessOperationMessage from './SuccessOperationMessage'

export default function SuccessfulForm ({ closeDialog }) {
  return (
    <FormSuccessfulState>
      <SuccessHero />
      <SuccessOperationMessage closeDialog={closeDialog} />
    </FormSuccessfulState>
  )
}
