import classes from './BlockedAppToast.module.css'
import { codecProRegular } from '@/shared/config/fonts'
import { i18n } from '@/shared/model/i18n'
import HelsinkiLogo from '@/shared/ui/lib/svg/HelsinkiLogo'
import { toast } from 'sonner'

const { TIME_BLOCKER: { CONTINUE } } = i18n.LANG.ESP.UI.TOAST

export default function BlockedAppToast ({ message }) {
  const [title, ...info] = message.split('\n')

  return (
    <div className={`${classes.toast_wrapper} ${codecProRegular.className}`}>
      <div className={classes.info_wrapper}>
        <HelsinkiLogo
          className={classes.logo}
          width={85}
          height={125}
        />
        <div className={classes.info}>
          <h4 className={classes.blocking_title}>
            {title}
          </h4>
          {
          info.map(sentence => {
            return (
              <p
                className={classes.blocking_text}
                key={sentence}
              >
                {sentence.toUpperCase()}
              </p>
            )
          })
      }
        </div>
      </div>
      <div
        onClick={() => toast.dismiss()}
        className={classes.agree}
      >
        {CONTINUE.toUpperCase()}
      </div>
    </div>
  )
}
