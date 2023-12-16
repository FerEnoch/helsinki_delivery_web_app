import { codecProRegular } from '@/shared/config/fonts'
import classes from './TimeBlockerToast.module.css'
import { i18n } from '@/shared/model/i18n'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const {
  TIME_BLOCKER: {
    // ADD_TAKE_AWAY
    // BOOK_ORDER_NOT_DELIVERY
    // DISABLED_DAY
    DISABLED_HOURS
  },
  AGE_POLICY: { AGREE },
  SEE_BUSINESS_HOURS
} = i18n.LANG.ESP.UI.TOAST

export default function TimeBlockerToast ({ message }) {
  const router = useRouter()
  const UImessage = DISABLED_HOURS
  const [title, ...rest] = UImessage.split('\n')

  return (
    <div className={`${classes.toast_wrapper} ${codecProRegular.className}`}>
      <div className={classes.info_center}>
        <h4 className={classes.title}>
          {title}
        </h4>
        {
          rest.map(sentence => {
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
            onClick={() => router.push('/info/Día%20y%20horario%20de%20envíos', { scroll: false })}
          >
            {SEE_BUSINESS_HOURS}
          </button>
          <button
            className={classes.agree_button}
            onClick={() => toast.dismiss()}
          >
            {AGREE}
          </button>
        </div>
      </div>
    </div>
  )
}
