import { MENU } from '@/shared/model/menu'
import { AboutPage } from '@/widgets/info/AboutPage'
import AttentionPage from '@/widgets/info/AttentionPage'
import ContactPage from '@/widgets/info/ContactPage'
import DeliveryZone from '../DeliveryZone'
import FaqPage from '../FaqPage'
import PurchaseSummaryPage from '../PurchaseSummaryPage'

const { CONTACT, ABOUT, ATTENTION, DELIVERY_ZONE, FAQ, PURCHASE_SUMMARY } = MENU

export const CORPORATIVE_INFO = (title) => {
  switch (title) {
    case ABOUT.label: return <AboutPage title={ABOUT.label} />
    case CONTACT.label: return <ContactPage title={CONTACT.label} />
    case ATTENTION.label: return <AttentionPage title={ATTENTION.label} />
    case DELIVERY_ZONE.label: return <DeliveryZone title={DELIVERY_ZONE.label} />
    case FAQ.label: return <FaqPage title={FAQ.label} />
    case PURCHASE_SUMMARY.label: return <PurchaseSummaryPage />
  }
}
