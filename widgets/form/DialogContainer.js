import classes from './DialogContainer.module.css'

export default function DialogContainer ({ children }) {
  return (
    <main className={classes.dialog_container}>
      {children}
    </main>
  )
}
