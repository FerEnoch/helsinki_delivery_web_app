import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import classes from './FaqQuestion.module.css'

export default function FaqQuestion ({ ask, answer }) {
  const formattedAsk = formatUpperCase(ask)

  return (
    <article className={classes.faq_article}>
      <h2 className={classes.ask} id={formattedAsk}>{formattedAsk}</h2>
      <p className={classes.answer}>{answer}</p>
    </article>
  )
}
