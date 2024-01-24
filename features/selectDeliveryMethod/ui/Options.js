import { useAppStore } from '@/entities/lib/store'
import classes from './Options.module.css'
import ButtonTag from './ButtonTag'
import { codecProRegular } from '@/shared/config/fonts'

export default function Options ({ day, ops, toggleOptions }) {
  const { setDeliveryMethod, selectedDeliveryMethod } = useAppStore()

  const selectTakeAwayOption = ({ day, tag, businessHours }) => () => {
    setDeliveryMethod({
      ...selectedDeliveryMethod,
      day,
      tag,
      businessHours
    })
  }

  return (
    <section
      className={`${classes.option} ${codecProRegular.className}`}
      key={day}
      onClick={toggleOptions}
    >
      <div className={classes.list_item}>
        <p>{day.toUpperCase()}</p>
        {
    ops.map(({ tag, businessHours }) => {
      return (
        <ButtonTag
          key={tag}
          tag={tag}
          businessHours={businessHours}
          onClick={selectTakeAwayOption({ day, tag, businessHours })}
        />
      )
    })
    }
      </div>
    </section>
  )
}
