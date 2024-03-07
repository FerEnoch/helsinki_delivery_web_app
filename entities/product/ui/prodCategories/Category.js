import classes from './Category.module.css'
import Link from 'next/link'

export default function Category ({ category, path }) {
  return (
    <li className={classes.link}>
      <Link href={`/${encodeURIComponent(path)}`} prefetch={false}>
        {category}
      </Link>
    </li>
  )
}
