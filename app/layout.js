import '@/shared/ui/globals.css'
import { unicaOne } from '@/shared/config/fonts'
import { i18n } from '@/shared/model/i18n'
import AppLayout from '@/widgets/layout/AppLayout'
import MainLayout from '@/widgets/layout/MainLayout'
import Script from 'next/script'

export const metadata = {
  title: i18n.LANG.ESP.APP_TITLE,
  description: i18n.LANG.ESP.APP_DESCRIPTION
}

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
       <Script id='fbq-tr' >
      {
       `!(function (f, b, e, v, n, t, s) {
         if (f.fbq) return; n = f.fbq = function () {
           n.callMethod
           ? n.callMethod.apply(n, arguments)
           : n.queue.push(arguments)
          }
          if (!f._fbq)f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'
          n.queue = []; t = b.createElement(e); t.async = !0
          t.src = v; s = b.getElementsByTagName(e)[0]
          s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js'));
        fbq('init', '974303443562411')
        fbq('track', 'PageView')`
      }
      </Script>
      <body className={unicaOne.className}>
       <AppLayout>
          <MainLayout>
            {children}
          </MainLayout>
        </AppLayout>
      </body>
    </html>
  )
};
