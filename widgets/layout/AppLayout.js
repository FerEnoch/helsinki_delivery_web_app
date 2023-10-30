import Footer from '@/widgets/layout/components/Footer'
import Header from '@/widgets/layout/components//Header'
import classes from './AppLayout.module.css'

export default function AppLayout ({ children }) {
  return (
    <div className={classes.app_background}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
