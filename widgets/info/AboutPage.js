import classes from './AboutPage.module.css'
import { FIREBASE_DATABASES } from '@/processes/services/config/firebase/databases'
import { getCorporativeInfo } from '@/processes/services/model/server/getCorporativeInfo'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'

export async function AboutPage ({ title }) {
  const { INFO } = FIREBASE_DATABASES
  const [{ about, other_info: extraInfo }] = await getCorporativeInfo(INFO)
  const aboutTitle = formatUpperCase(title)
  const aboutTextFormatted = formatUpperCase(about)
  const extraTextFormatted = formatUpperCase(extraInfo)

  return (
    <>
      <header>
        <h1 className={classes.title}>{aboutTitle}</h1>
      </header>
      <article className={classes.info_container}>
        <p className={`${classes.text} ${classes.main_info_text}`}>
          {aboutTextFormatted}
        </p>
        <p className={`${classes.text} ${classes.extra_info_text}`}>
          {extraTextFormatted}
        </p>
      </article>
    </>
  )
}
