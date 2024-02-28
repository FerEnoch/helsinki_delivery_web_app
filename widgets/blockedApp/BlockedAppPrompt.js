import { codecProRegular } from '@/shared/config/fonts'
import classes from './BlockedAppPrompt.module.css'
import { i18n } from '@/shared/model/i18n'
import { Warning } from '@/shared/ui/lib/svg/Warning'
import Link from 'next/link'
import { useTimeBlocker } from '@/entities/timeBlocker/useTimeBlocker'
import { useRouter } from 'next/navigation'

const { BLOCKED_APP_PROMPT: { ATTENTION, BUTTON, AGREE } } = i18n.LANG.ESP.UI
const seeAttentionHours = BUTTON.toUpperCase()
const agree = AGREE.toUpperCase()
const attention = ATTENTION.toUpperCase().split('\n')

export default function BlockedAppPrompt () {
  const { businessHoursMessage } = useTimeBlocker()
  const router = useRouter()
  const [header, ...info] = businessHoursMessage.split('\n')

  return (
    <div className={classes.dialog_content}>
      <header className={classes.header}>
        <div className={classes.attention_header}>
          <Warning
            width={50}
            height={50}
          />
          <h3 className={classes.attention_text}>
            {attention}
          </h3>
        </div>
        <h4 className={`${classes.info_header} ${codecProRegular.className}`}>
          {header.toUpperCase()}
        </h4>
        {
          info.map(sentence => {
            return (
              <p
                className={classes.info_sentence}
                key={sentence}
              >
                {sentence.toUpperCase()}
              </p>
            )
          })
          }
      </header>
      <div className={classes.buttons_section}>
        <Link
          href='/info/Días%20y%20horarios%20de%20envíos'
          className={`${classes.see_attention_hours} ${codecProRegular.className}`}
        >
          {seeAttentionHours}
        </Link>
        <button
          className={classes.agree_button}
          onClick={() => router.back()}
        >
          <p className={codecProRegular.className}>
            {agree}
          </p>
        </button>
      </div>
    </div>
  )
}
