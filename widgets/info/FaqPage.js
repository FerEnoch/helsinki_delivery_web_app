import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import classes from './FaqPage.module.css'

export default function FaqPage ({ title }) {
  const formattedTitle = formatUpperCase(title)
  return (
    <article className={classes.wrapper}>
      <header className={classes.header}>
        <h1 className={classes.title}>{formattedTitle}</h1>
      </header>
      <section className={classes.map_wrapper}>
        QUESTIONS
      </section>
    </article>
  )
}
