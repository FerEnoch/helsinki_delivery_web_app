import { codecProRegular } from '@/shared/config/fonts'
import classes from './TimeBlockerToast.module.css'
import { i18n } from '@/shared/model/i18n'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAppStore } from '../../store'

const {
  TIME_BLOCKER: {
    CONTINUE
    // ADD_TAKE_AWAY
    // BOOK_ORDER_NOT_DELIVERY
  // DISABLED_DAY
  // DISABLED_HOURS
  },
  SEE_BUSINESS_HOURS,
  TAKE_AWAY_LABEL
} = i18n.LANG.ESP.UI.TOAST

export default function TimeBlockerToast ({ message }) {
  const router = useRouter()
  const { setTakeAway } = useAppStore()

  const [title, ...info] = message.split('\n')
  const isTakeAwayMessage = /take-?\s?away/i.test(message)

  const handleInputChange = (e) => setTakeAway(e.target.checked)

  return (
    <div className={`${classes.toast_wrapper} ${codecProRegular.className}`}>
      <div className={classes.info_center}>
        <h4 className={classes.title}>
          {title.toUpperCase()}
        </h4>
        {
          isTakeAwayMessage && (
            <label className={classes.label} htmlFor='take-away'>
              {TAKE_AWAY_LABEL}
              <input
                id='take-away'
                className={classes.checkbox}
                type='checkbox'
                onChange={handleInputChange}
              />
            </label>
          )
        }
        {
          info.map(sentence => {
            return (
              <h4 key={sentence} className={classes.text}>
                {sentence}
              </h4>
            )
          })
          }
        <div className={classes.buttons}>
          <button
            className={classes.policy_button}
            onClick={() => router.push('/info/Días%20y%20horarios%20de%20envíos', { scroll: false })}
          >
            {SEE_BUSINESS_HOURS}
          </button>
          <button
            className={classes.agree_button}
            onClick={() => toast.dismiss()}
          >
            {CONTINUE}
          </button>
        </div>
      </div>
    </div>
  )
}
