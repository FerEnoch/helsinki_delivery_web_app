import Link from 'next/link'
import classes from './TypesTitles.module.css'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'

export function TypesTitles ({ subtypes, category }) {
  return (
    <section className={classes.list_container}>
      <ul
        className={classes.link_list}
        style={subtypes?.length === 1
          ? {
              gridTemplateColumns: '1fr'
            }
          : {}}
      >
        {subtypes?.length > 0 && subtypes.map(type => {
          const formattedType = formatUpperCase(type)
          return (
            <li key={type}>
              <div className={classes.link}>
                <Link
                  href={`/${encodeURIComponent(category)}/${encodeURIComponent(type)}`}
                  prefetch={false}
                >
                  {formattedType || type.toUpperCase()}
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
