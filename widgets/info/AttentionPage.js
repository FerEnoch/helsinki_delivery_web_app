import { FIREBASE_DATABASES } from '@/processes/services/config/firebase/databases'
import classes from './AttentionPage.module.css'
import { getCorporativeInfo } from '@/processes/services/model/server/getCorporativeInfo'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'

export default async function AttentionPage ({ title }) {
  const { INFO } = FIREBASE_DATABASES
  const formattedTitle = formatUpperCase(title)
  const [{ attention }] = await getCorporativeInfo(INFO)
  const sentences = attention.split('\n')

  return (
    <article className={classes.container}>
      <header className={classes.header}>
        <h1 className={classes.title}>{formattedTitle}</h1>
      </header>
      <section className={classes.info_wrapper}>
        {
        sentences.map(sentence => {
          const formattedSentence = formatUpperCase(sentence)
          return (
            <p
              key={sentence}
              className={classes.text}
            >
              {formattedSentence}
            </p>
          )
        })
      }
      </section>
    </article>
  )
}
