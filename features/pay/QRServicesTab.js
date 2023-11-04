import { useAppStore } from '@/entities/lib/store'
import classes from './QRServicesTab.module.css'

export default function QRServicesTab ({ services }) {
  const { paymentService, pickPaymentService } = useAppStore()
  const handleChooseService = (chosenService) => () => {
    pickPaymentService(services.find(({ service }) => service === chosenService))
  }

  return (
    <section className={classes.tab_section}>
      <ul className={classes.tab_list}>
        {
          services.map(({ service }) => {
            const isChosenService = paymentService?.service === service
            return (
              <li
                key={service}
                className={`${classes.service_item} ${isChosenService ? classes.chosen : ''}`}
                onClick={handleChooseService(service)}
              >
                <h1>{service}</h1>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}
