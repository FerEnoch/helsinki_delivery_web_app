import { FIREBASE_DATABASES } from '@/processes/services/config/firebase/databases'
import classes from './DeliveryZone.module.css'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import { getCorporativeInfo } from '@/processes/services/model/server/getCorporativeInfo'
import { formatZones } from './lib/formatZones'

export default async function DeliveryZone ({ title }) {
  const { INFO } = FIREBASE_DATABASES
  const [{ zones }] = await getCorporativeInfo(INFO)
  const formattedZones = formatZones(zones)
  const formattedTitle = formatUpperCase(title)

  return (
    <article className={classes.wrapper}>
      <header className={classes.header}>
        <h1 className={classes.title}>{formattedTitle}</h1>
      </header>
      <section className={classes.limits_wrapper}>
        {formattedZones.length > 0 &&
          formattedZones.map(([limit, sentence]) => {
            return (
              <p
                key={limit}
                className={classes.zone}
              >
                <span className={classes.limit}>
                  {formatUpperCase(limit)}
                </span>
                <span className={classes.sentence}>
                  {sentence}
                </span>
              </p>
            )
          })}
      </section>
    </article>
  )
}
