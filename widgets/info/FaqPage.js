import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import classes from './FaqPage.module.css'
import { FIREBASE_DATABASES } from '@/processes/services/config/firebase/databases'
import { getCorporativeInfo } from '@/processes/services/model/server/getCorporativeInfo'
import FaqQuestion from './FaqQuestion'

export default async function FaqPage ({ title }) {
  const { FAQ } = FIREBASE_DATABASES
  const [faq] = await getCorporativeInfo(FAQ)

  const formattedTitle = formatUpperCase(title)

  return (
    <article className={classes.faq_container}>
      <header className={classes.header}>
        <h1 className={classes.title}>{formattedTitle}</h1>
      </header>
      <section className={classes.faqs}>
        {Object.entries(faq).map(([ask, answer]) => {
          return (
            <FaqQuestion
              key={ask}
              ask={ask}
              answer={answer}
            />
          )
        })}
      </section>
    </article>
  )
}
