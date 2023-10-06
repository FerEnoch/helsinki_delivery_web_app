import classes from './MainLayout.module.css'
import logoClasses from '@/shared/ui/lib/svg/HelsinkiLogo.module.css'
import HelsinkiLogo from '@/shared/ui/lib/svg/HelsinkiLogo'

export default function MainLayout ({ children }) {
  return (
    <main className={classes.app_main}>
      {children}
      <HelsinkiLogo
        className={logoClasses.helsinki_logo}
        width={350}
        height={350}
      />
    </main>
  )
}
