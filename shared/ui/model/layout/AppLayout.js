import Footer from '@/shared/ui/model/components/Footer'
import Header from '@/shared/ui/model/components/Header'
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
