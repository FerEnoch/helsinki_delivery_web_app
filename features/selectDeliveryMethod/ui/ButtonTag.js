import classes from './ButtonTag.module.css'

export default function ButtonTag ({ tag, businessHours, onClick }) {
  return (
    <button
      className={classes.tags_button}
      onClick={onClick}
    >
      <span>
        {tag}
      </span>
      <span>
        {businessHours}
      </span>
    </button>
  )
}
