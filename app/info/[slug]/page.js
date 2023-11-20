import MainErrorBoundary from '@/widgets/error/MainErrorBoundary'
import { AboutPage } from '@/widgets/info/AboutPage'
import ContactPage from '@/widgets/info/ContactPage'
import InfoPageWrapper from '@/widgets/info/InfoPageWrapper'

export const CORPORATIVE_INFO = (title) => {
  switch (title) {
    case 'Quienes somos': return <AboutPage title={title} />
    case 'Contacto': return <ContactPage title={title} />
  }
}

export default async function InfoPage ({ params }) {
  const { slug } = params
  const slugTitle = decodeURIComponent(slug)

  const slugComponent = CORPORATIVE_INFO(slugTitle)

  return (
    <InfoPageWrapper>
      {slugComponent || <MainErrorBoundary />}
    </InfoPageWrapper>
  )
}
