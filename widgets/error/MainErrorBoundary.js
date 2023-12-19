import SpilledBottle from '@/shared/ui/lib/svg/SpilledBottle'
import classes from './MainErrorBoundary.module.css'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import ReturnButton from '@/shared/ui/lib/ReturnButton'

export default function MainErrorBoundary ({ type }) {
  const { LABEL, MESSAGE } = type
  let errorMessage2
  if (type?.MESSAGE_2) {
    errorMessage2 = formatUpperCase(type.MESSAGE_2)
  }
  const errorSubtitle = formatUpperCase(LABEL)
  const errorMessage = formatUpperCase(MESSAGE)

  return (
    <div className={classes.main_container}>
      <h3 className={classes.subtitle}>{errorSubtitle}</h3>
      <div className={classes.bottle_container}>
        <SpilledBottle />
      </div>
      <h3 className={classes.message}>{errorMessage}</h3>
      {
     errorMessage2 && <h3 className={classes.message}>{errorMessage2}</h3>
      }
      <footer className={classes.error_boundary_footer}>
        <ReturnButton />
      </footer>
    </div>
  )
}
