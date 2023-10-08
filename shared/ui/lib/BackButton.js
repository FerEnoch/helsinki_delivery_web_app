'use client'
import TriangleButton from '@/shared/ui/lib/TriangleButton'
import classes from './BackButton.module.css'
import { useRouter } from 'next/navigation'

export default function BackButton ({ label }) {
  const router = useRouter()
  return (
    <div
      onClick={() => router.back()}
      className={classes.back_button}
    >
      <div className={classes.content}>
        <span className={classes.triangle_button}>
          <TriangleButton
            slideDirection='x'
            width={10}
            height={10}
            triangleStyle={{ fill: 'white' }}
          />
        </span>
        <p className={classes.text}>
          {label.toUpperCase()}
        </p>
      </div>
    </div>
  )
}
