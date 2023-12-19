import classes from './UserInput.module.css'
export default function UserInput (props) {
  return (
    <input {...props} className={`${classes.user_input} ${props?.isInvalid ? classes.invalid_user_input : ''}`} />
  )
}
