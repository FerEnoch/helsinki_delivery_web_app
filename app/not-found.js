import { i18n } from '@/shared/model/i18n'
import MainErrorBoundary from '@/widgets/error/MainErrorBoundary'
import InfoPageWrapper from '@/widgets/info/InfoPageWrapper'

const notFoundErrorTexts = i18n.LANG.ESP.UI.ERROR.NOT_FOUND

export default function NotFound () {
  return (
    <InfoPageWrapper>
      <MainErrorBoundary type={notFoundErrorTexts} />
    </InfoPageWrapper>
  )
}
