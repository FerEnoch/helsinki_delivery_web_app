import classes from './SummaryItem.module.css'

export default function SummaryItem ({ name, info, total, discount }) {
  return (
    <li className={classes.summary_item}>
      <span className={classes.name}>
        {name}
      </span>
      {info}
      <span className={classes.total}>
        <span className={classes.sign}>
          {discount ? '-$' : '$'}
        </span>
        {total}
      </span>
    </li>
  )
}
