import { getDeliveryMethods } from '@/features/selectDeliveryMethod/lib/getDeliveryMethods'
import classes from './DeliveryCost.module.css'
import DeliveryMethod from '@/features/selectDeliveryMethod/ui/DeliveryMethod'

export default async function DeliveryCost () {
  const deliveryMethods = await getDeliveryMethods()

  return (
    <section className={classes.delivery_cost_container}>
      {
        deliveryMethods?.map(({
          label,
          info,
          price,
          isDefault,
          options
        }) => {
          return (
            <DeliveryMethod
              key={label}
              label={label}
              info={info}
              price={price}
              isDefault={isDefault}
              options={options}
            />
          )
        })
      }
    </section>
  )
}
