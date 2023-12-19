'use client'
import FaqQuestion from './FaqQuestion'
import classes from './QuestionsSection.module.css'

export default function QuestionsSection ({ faq }) {
  return (
    <section className={classes.faqs}>
      {Object.entries(faq).map(([ask, answer]) => {
        return <FaqQuestion key={ask} ask={ask} answer={answer} />
      })}
    </section>
  )
}
