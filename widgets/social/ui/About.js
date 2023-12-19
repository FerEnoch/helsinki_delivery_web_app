import Link from 'next/link'
import classes from './About.module.css'
import { formatAbout } from '@/shared/lib/textFormat/giveFormat'
import { i18n } from '@/shared/model/i18n'

const { ABOUT } = i18n.LANG.ESP.UI.MENU

export default function About () {
  const formattedAbout = formatAbout()
  return (
    <section className={classes.about_link}>
      <Link href={`/info/${encodeURIComponent(ABOUT.label)}`} prefetch={false}>
        <h3>{formattedAbout}</h3>
      </Link>
    </section>
  )
}
