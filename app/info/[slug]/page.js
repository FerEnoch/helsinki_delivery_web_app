import { i18n } from '@/shared/model/i18n'
import MainErrorBoundary from '@/widgets/error/MainErrorBoundary'
import InfoPageWrapper from '@/widgets/info/InfoPageWrapper'
import { CORPORATIVE_INFO } from '@/widgets/info/model/corporativeInfo'

const errorTypeTexts = i18n.LANG.ESP.UI.ERROR.NOT_FOUND

export default async function InfoPage ({ params }) {
  const { slug } = params
  const slugTitle = decodeURIComponent(slug)

  const slugComponent = CORPORATIVE_INFO(slugTitle)

  return (
    <InfoPageWrapper>
      {slugComponent || <MainErrorBoundary type={errorTypeTexts} />}
    </InfoPageWrapper>
  )
}
