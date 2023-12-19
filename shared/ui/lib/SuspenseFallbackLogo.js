import classes from './SuspenseFallbackLogo.module.css'
import { Suspense } from 'react'
import HelsinkiLogo from './svg/HelsinkiLogo'

export default function SuspenseFallbackLogo ({ isLoading, logoStyle, children, width, height }) {
  return (
    <Suspense fallback={
      <HelsinkiLogo
        className={classes.SVGLogo}
        pathStyle={logoStyle || { fill: '#fff', fillOpacity: 0.9 }}
        width={width}
        height={height}
      />
      }
    >
      {
        isLoading && (
          <HelsinkiLogo
            className={classes.SVGLogo}
            pathStyle={logoStyle || { fill: '#fff', fillOpacity: 0.9 }}
            width={width}
            height={height}
          />
        )
      }
      {children}
    </Suspense>
  )
}
