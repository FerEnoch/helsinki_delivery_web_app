import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import classes from './FaqQuestion.module.css'

export default function FaqQuestion ({ ask, answer }) {
  console.log(ask)

  const formattedAsk = formatUpperCase(ask)

  return (
    <article className={classes.faq_article}>
      <h2 className={classes.ask}>{formattedAsk}</h2>
      <p className={classes.answer}>{answer}</p>
    </article>
  )
}
