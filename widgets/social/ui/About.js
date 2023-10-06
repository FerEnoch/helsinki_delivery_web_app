import classes from './Social.module.css'
import { formatAbout } from '@/shared/lib/textFormat/giveFormat'

export default function About () {
  const formattedAbout = formatAbout()
  return (
    <section className={`${classes.link} ${classes.about_link}`}>
      <h3>{formattedAbout}</h3>
    </section>
  )
}
