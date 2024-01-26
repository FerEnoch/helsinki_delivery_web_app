import classes from './ChosenTag.module.css'

export default function ChosenTag ({ day, tag, hours, onClick }) {
  return (
    <div
      onClick={onClick}
      className={classes.tag}
    >
      <p className={classes.day}>
        {day}
      </p>
      <div className={classes.hours}>
        <span>
          {tag}
        </span>
        <span>
          {hours}
        </span>
      </div>
    </div>
  )
}
