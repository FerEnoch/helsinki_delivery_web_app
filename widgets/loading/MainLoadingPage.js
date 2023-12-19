import classes from './MainLoadingPage.module.css'
import HelsinkiLogo from '@/shared/ui/lib/svg/HelsinkiLogo'

export default function MainLoadingPage () {
  return (
    <div className={classes.loading_page_container}>
      <HelsinkiLogo
        className={classes.SVGLogo}
        pathStyle={{ fill: '#eee', fillOpacity: 0.9 }}
      />
      <div className={classes.background} />
    </div>
  )
}
