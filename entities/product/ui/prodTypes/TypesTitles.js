import Link from 'next/link'
import classes from './TypesTitles.module.css'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'

export function TypesTitles ({ subtypes, category }) {
  return (
    <section className={classes.list_container}>
      <ul className={classes.link_list}>
        {subtypes?.length > 0 && subtypes.map(type => {
          const formattedType = formatUpperCase(type)
          return (
            <section
              style={subtypes.length === 1
                ? {
                    gridArea: 'center'
                  }
                : {}} key={type}
            >
              <Link href={`/${encodeURIComponent(category)}/${encodeURIComponent(type)}`} prefetch={false}>
                <li className={classes.link}>
                  {formattedType || type.toUpperCase()}
                </li>
              </Link>
            </section>
          )
        })}
      </ul>
    </section>
  )
}
