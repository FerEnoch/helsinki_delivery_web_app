import { getDeliveryMethods } from '@/features/selectDeliveryMethod/lib/getDeliveryMethods'
import classes from './DeliveryCost.module.css'
import DeliveryMethod from '@/features/selectDeliveryMethod/ui/DeliveryMethod'
import { getBusinessHours } from '@/entities/timeBlocker/service/getBusinessHours'

export default async function DeliveryCost () {
  const {
    grid,
    openToOrders,
    businessHours,
    deliveryCost
  } = await getBusinessHours()
  const deliveryMethods = await getDeliveryMethods(
    {
      grid,
      openToOrders,
      businessHours,
      deliveryCost
    })

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
