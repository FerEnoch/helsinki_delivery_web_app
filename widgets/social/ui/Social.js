import About from './About'
import Contact from './Contact'
import SocialMediaContact from './SocialMediaContact'
import classes from './Social.module.css'

export default function Social () {
  return (
    <section className={classes.social_container}>
      <SocialMediaContact />
      <About />
      <Contact />
    </section>
  )
}
