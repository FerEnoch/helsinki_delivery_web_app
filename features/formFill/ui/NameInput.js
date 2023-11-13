import classes from './NameInput.module.css'
import { useValidateNameInput } from '../lib/useValidateNameInput'
import UserInput from '../lib/ui/UserInput'
import Dot from '../lib/ui/Dot'

export default function NameInput () {
  const {
    hangleNameChange,
    sanitizedClientName,
    invalidInput,
    labelText,
    onInvalidText
  } = useValidateNameInput()

  return (
    <div className={classes.name_input}>
      <label htmlFor='clientNameID'>
        <p className={classes.input_label}> <Dot /> {labelText} </p>
      </label>
      <UserInput
        required
        id='clientNameID'
        type='text'
        value={sanitizedClientName || ''}
        onChange={hangleNameChange}
        onBlur={hangleNameChange}
      />
      {
        invalidInput && (
          <p className={classes.invalid_input_message}>
            {onInvalidText}
          </p>
        )
      }
    </div>
  )
}
