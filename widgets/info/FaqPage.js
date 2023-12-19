import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import classes from './FaqPage.module.css'
import { FIREBASE_DATABASES } from '@/processes/services/config/firebase/databases'
import { getCorporativeInfo } from '@/processes/services/model/server/getCorporativeInfo'
import QuestionsSection from './QuestionsSection'

export default async function FaqPage ({ title }) {
  const { FAQ } = FIREBASE_DATABASES
  const [faq] = await getCorporativeInfo(FAQ)

  const formattedTitle = formatUpperCase(title)

  return (
    <article className={classes.faq_container}>
      <header className={classes.header}>
        <h1 className={classes.title}>{formattedTitle}</h1>
      </header>
      <QuestionsSection faq={faq} />
    </article>
  )
}
