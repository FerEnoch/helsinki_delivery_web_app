import classes from './DeliveryZone.module.css'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'

export default function DeliveryZone ({ title }) {
  const formattedTitle = formatUpperCase(title)
  return (
    <article className={classes.wrapper}>
      <header className={classes.header}>
        <h1 className={classes.title}>{formattedTitle}</h1>
      </header>
      <section className={classes.map_wrapper}>
        MAPA
      </section>
    </article>
  )
}
