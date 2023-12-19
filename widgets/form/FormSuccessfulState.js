import { memo } from 'react'
import classes from './FormSuccessfulState.module.css'

export default memo(function FormSuccessfulState ({ children }) {
  return (
    <main className={classes.success_view_container}>
      {children}
    </main>
  )
})
