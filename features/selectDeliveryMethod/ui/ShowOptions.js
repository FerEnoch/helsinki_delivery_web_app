import classes from './ShowOptions.module.css'

export default function ShowOptions ({ children, label, toggleOptionList, openOptions }) {
  return (
    <>
      <button
        className={classes.select_button}
        onClick={toggleOptionList}
        style={{ visibility: `${openOptions ? 'hidden' : 'visible'}` }}
      >
        <p>{label}</p>
      </button>
      <section
        className={classes.options_section}
        style={{ visibility: `${openOptions ? 'visible' : 'hidden'}` }}
      >
        {children}
      </section>
    </>
  )
}
