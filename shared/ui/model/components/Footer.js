import classes from './Footer.module.css'
import { poppins } from '@/shared/config/fonts'
import { formatDeveloper } from '@/shared/lib/textFormat/giveFormat'
import DynamoLogo from '@/shared/ui/lib/svg/DynamoLogo'

export default function Footer () {
  const developer = formatDeveloper()
  const byPartsDevName = developer.split(' ')
  const firstPartDev = [byPartsDevName[0], byPartsDevName[1]].join(' ')
  const secondPartDev = byPartsDevName[2]

  return (
    <footer className={`${classes.footer_container} ${poppins.className}`}>
      <h1 className={classes.developer}>
        <span className={classes.dev_firstPart}>
          {firstPartDev}
        </span>
        <span className={classes.icon_dynamo}>
          <DynamoLogo
            width={25}
            heigth={25}
          />
        </span>
        <span className={classes.dev_secondPart}>
          {secondPartDev}
        </span>
      </h1>
    </footer>
  )
}
