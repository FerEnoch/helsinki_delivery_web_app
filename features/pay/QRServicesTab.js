import { useAppStore } from '@/entities/lib/store'
import classes from './QRServicesTab.module.css'
import { codecProRegular } from '@/shared/config/fonts'

export default function QRServicesTab ({ services }) {
  const { QRService, pickQRService } = useAppStore()
  const handleChooseService = (chosenService) => () => {
    pickQRService(services.find(({ service }) => service === chosenService))
  }

  return (
    <section className={`${classes.tab_section} ${codecProRegular.className}`}>
      <ul className={classes.tab_list}>
        {
          services.map(({ service }) => {
            const formatedLabel = service.toUpperCase()
            const isChosenService = QRService?.service === service
            return (
              <li
                key={service}
                className={`${classes.service_item} ${isChosenService ? classes.chosen : ''}`}
                onClick={handleChooseService(service)}
              >
                <h1>{formatedLabel}</h1>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}
