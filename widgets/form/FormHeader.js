import classes from './FormHeader.module.css'

export default function FormHeader ({ title }) {
  return (
    <header className={classes.form_header}>
      <h3 className={classes.form_title}> {title?.toUpperCase()} </h3>
    </header>
  )
}
