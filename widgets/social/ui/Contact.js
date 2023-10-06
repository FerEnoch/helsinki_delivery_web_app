import { formatContactLink } from '@/shared/lib/textFormat/giveFormat'
import classes from './Social.module.css'

export default function Contact () {
  const formattedContact = formatContactLink()
  return (
    <section className={`${classes.link} ${classes.contact_link}`}>
      <h3>{formattedContact}</h3>
    </section>
  )
}
