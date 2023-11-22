import classes from './Category.module.css'
import Link from 'next/link'

export default function Category ({ category, path }) {
  return (
    <article>
      <Link href={`/${encodeURIComponent(path)}`} prefetch={false}>
        <li className={classes.link}>
          {category}
        </li>
      </Link>
    </article>
  )
}
