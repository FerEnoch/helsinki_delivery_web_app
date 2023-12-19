import Facebook from '@/shared/ui/lib/svg/Facebook'
import Instagram from '@/shared/ui/lib/svg/Instagram'
import Tiktok from '@/shared/ui/lib/svg/Tiktok'
import classes from './SocialMediaContact.module.css'
import { getCorporativeInfo } from '@/processes/services/model/server/getCorporativeInfo'
import { FIREBASE_DATABASES } from '@/processes/services/config/firebase/databases'

export default async function SocialMediaContact () {
  const { INFO } = FIREBASE_DATABASES
  const [{ facebook, tik_tok: tikTokLink, instagram }] = await getCorporativeInfo(INFO)

  return (
    <section className={classes.icons}>
      <a
        target='blank'
        href={facebook}
        className={classes.icon_facebook}
      >
        <Facebook
          width={25}
          height={25}
          fill='white'
        />
      </a>
      <a
        target='blank'
        href={instagram}
        className={classes.icon_instagram}
      >
        <Instagram
          width={25}
          height={25}
          fill='white'
        />
      </a>
      <a
        target='blank'
        href={tikTokLink}
        className={classes.icon_tiktok}
      >
        <Tiktok
          width={25}
          height={25}
          fill='white'
        />
      </a>
    </section>
  )
}
