import '@/shared/ui/globals.css'
import { unicaOne } from '@/shared/config/fonts'
import { i18n } from '@/shared/model/i18n'
import AppLayout from '@/widgets/layout/AppLayout'
import MainLayout from '@/widgets/layout/MainLayout'

export const metadata = {
  title: i18n.LANG.ESP.APP_TITLE,
  description: i18n.LANG.ESP.APP_DESCRIPTION
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body className={unicaOne.className}>
        <AppLayout>
          <MainLayout>
            {children}
          </MainLayout>
        </AppLayout>
      </body>
    </html>
  )
}
