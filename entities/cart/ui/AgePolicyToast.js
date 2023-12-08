import classes from './AgePolicyToast.module.css'
import HelsinkiLogo from '@/shared/ui/lib/svg/HelsinkiLogo'
import { codecProRegular } from '@/shared/config/fonts'
import { i18n } from '@/shared/model/i18n'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const { AGE_POLICY: { MESSAGE, FAQ, AGREE } } = i18n.LANG.ESP.UI.TOAST

export default function AgePolicyToast () {
  const router = useRouter()

  return (
    <div className={`${classes.toast_wrapper} ${codecProRegular.className}`}>
      <HelsinkiLogo
        className={classes.logo}
        width={50}
        height={50}
      />
      <div className={classes.info_center}>
        <h4 className={classes.title_text}>
          {MESSAGE}
        </h4>
        <div className={classes.buttons}>
          <button
            className={classes.policy_button}
            onClick={() => router.push('/info/Preguntas%20frecuentes#SOY MENOR DE EDAD, ¿PuEDO uSAR LA APP?', { scroll: false })}
          >
            {FAQ}
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
