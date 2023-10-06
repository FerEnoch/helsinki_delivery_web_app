import Facebook from '@/shared/ui/lib/svg/Facebook'
import Instagram from '@/shared/ui/lib/svg/Instagram'
import Tiktok from '@/shared/ui/lib/svg/Tiktok'
import classes from './Social.module.css'

export default function SocialMediaContact () {
  return (
    <section className={classes.icons}>
      <Facebook
        className={classes.icon_facebook}
        width={25}
        height={25}
        fill='white'
      />
      <Instagram
        className={classes.icon_instagram}
        width={25}
        height={25}
        fill='white'
      />
      <Tiktok
        className={classes.icon_tiktok}
        width={25}
        height={25}
        fill='white'
      />
    </section>
  )
}
