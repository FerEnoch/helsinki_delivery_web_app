import classes from './SuspenseFallbackLogo.module.css'
import { Suspense } from 'react'
import HelsinkiLogo from './svg/HelsinkiLogo'

export default function SuspenseFallbackLogo ({ children }) {
  return (
    <Suspense fallback={
      <HelsinkiLogo
        className={classes.SVGLogo}
        pathStyle={{ fill: '#000', fillOpacity: 0.9 }}
      />
      }
    >
      {children}
    </Suspense>
  )
}
