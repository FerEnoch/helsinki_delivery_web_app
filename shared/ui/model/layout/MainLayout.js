import classes from './MainLayout.module.css'
import HelsinkiLogo from '../../lib/svg/HelsinkiLogo'
import logoClasses from './HelsinkiLogo.module.css'

export default function MainLayout ({ children }) {
  return (
    <main className={classes.app_main}>
      {children}
      <HelsinkiLogo
        className={logoClasses.helsinki_logo}
        width={350}
        height={350}
        pathStyle={{ fill: '#480200', fillOpacity: 0.8, strokeWidth: 0.0600473 }}
      />
    </main>
  )
}
