import { formatContactLink } from '@/shared/lib/textFormat/giveFormat'
import classes from './Contact.module.css'
import { i18n } from '@/shared/model/i18n'
import Link from 'next/link'

const { CONTACT } = i18n.LANG.ESP.UI.MENU

export default function Contact () {
  const formattedContact = formatContactLink()

  return (
    <section className={classes.contact_link}>
      <Link href={`/info/${encodeURIComponent(CONTACT.label)}`} prefetch={false}>
        <h3>{formattedContact}</h3>
      </Link>
    </section>
  )
}
