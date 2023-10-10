import classes from './Breadcrumb.module.css'
import { formatUpperCase } from '@/shared/lib/textFormat/giveFormat'
import Link from 'next/link'

export default function Breadcrumb ({ category, type = '' }) {
  return (
    <h1 className={classes.breadcrumb}>
      {
      !type
        ? (
          <Link href={`/${encodeURIComponent(category)}`} prefetch={false}>
            {`${formatUpperCase(category) || category.toUpperCase()}`}
          </Link>
          )
        : (
          <div className={classes.breadcrumb_link}>
            <Link href={`/${encodeURIComponent(category)}`} prefetch={false}>
              {`${formatUpperCase(category) || category.toUpperCase()}`}
            </Link>
            <Link href={`/${encodeURIComponent(category)}/${encodeURIComponent(type)}`} prefetch={false}>
              {` / ${formatUpperCase(type) || type.toUpperCase()}`}
            </Link>
          </div>
          )
      }
    </h1>
  )
}
