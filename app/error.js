'use client'

import { i18n } from '@/shared/model/i18n'
import MainErrorBoundary from '@/widgets/error/MainErrorBoundary'
import InfoPageWrapper from '@/widgets/info/InfoPageWrapper'

const appErrorTexts = i18n.LANG.ESP.UI.ERROR.APP_ERROR

export default function ErrorBoundary () {
  return (
    <InfoPageWrapper>
      <MainErrorBoundary type={appErrorTexts} />
    </InfoPageWrapper>
  )
}
