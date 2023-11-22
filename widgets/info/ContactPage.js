import { WHATSAPP_LINK } from '@/features/formFill/lib/whatsAppLink'
import classes from './ContactPage.module.css'
import { FIREBASE_DATABASES } from '@/processes/services/config/firebase/databases'
import { getCorporativeInfo } from '@/processes/services/model/server/getCorporativeInfo'
import { codecProRegular } from '@/shared/config/fonts'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import { i18n } from '@/shared/model/i18n'
import WhatsAppIcon from '@/shared/ui/lib/svg/WhatsAppIocn'

const { INFO_PAGES: { TEL_TEXT, EMAIL_TEXT, DISCHARGE } } = i18n.LANG.ESP.UI.MENU.CONTACT

export default async function ContactPage ({ title }) {
  const { INFO } = FIREBASE_DATABASES
  const [{ tel, mail }] = await getCorporativeInfo(INFO)

  const formattedTitle = formatUpperCase(title)
  const formattedTelText = formatUpperCase(TEL_TEXT)
  const formattedEmailText = formatUpperCase(EMAIL_TEXT)

  return (
    <article className={classes.wrapper}>
      <header className={classes.header}>
        <h1 className={classes.title}>{formattedTitle}</h1>
      </header>
      <p className={classes.subtitle}>{formattedTelText}</p>
      <p className={`${classes.tel} ${codecProRegular.className}`}>
        {tel}
        <span className={classes.whats_app_icon}>
          <a href={`${WHATSAPP_LINK}${tel}`} target='blank'>
            <WhatsAppIcon
              width={20}
              height={20}
              fill='green'
            />
          </a>
        </span>
      </p>
      <p className={classes.subtitle}>{formattedEmailText}</p>
      <p className={`${classes.mail} ${codecProRegular.className}`}>{mail}</p>
      <section className={`${classes.discharge} ${codecProRegular.className}`}>
        <p>{DISCHARGE}</p>
      </section>
    </article>
  )
}
