import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import classes from './FaqPage.module.css'
import { FIREBASE_DATABASES } from '@/processes/services/config/firebase/databases'
import { getCorporativeInfo } from '@/processes/services/model/server/getCorporativeInfo'

export default async function FaqPage ({ title }) {
  const { FAQ } = FIREBASE_DATABASES
  const [faq] = await getCorporativeInfo(FAQ)
  console.log(faq)

  const formattedTitle = formatUpperCase(title)

  return (
    <article className={classes.wrapper}>
      <header className={classes.header}>
        <h1 className={classes.title}>{formattedTitle}</h1>
      </header>
      <section className={classes.map_wrapper}>
        En construcción...
      </section>
    </article>
  )
}
