import classes from './InfoPageWrapper.module.css'

export default function InfoPageWrapper ({ children }) {
  return (
    <main className={classes.wrapper}>
      {children}
    </main>
  )
}
