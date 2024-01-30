'use client'
import { useEffect, useState } from 'react'
import classes from './DeliveryMethod.module.css'
import { useAppStore } from '@/entities/lib/store'
import DeliveryOptions from './DeliveryOptions'
import Method from './Method'
import { useCurrentDayBusinessHours } from '../lib/useCurrentDayBusinessHours.js'

export default function DeliveryMethod ({ label, info, price, isDefault, options }) {
  const { setDeliveryMethod, selectedDeliveryMethod } = useAppStore()
  const filteredOptions = useCurrentDayBusinessHours(options)

  const [isSelected, setIsSelected] = useState(null)
  const [showTags, setShowTags] = useState(null)
  const [renderOptions, setRenderOptions] = useState(null)

  useEffect(() => {
    setIsSelected(selectedDeliveryMethod?.label === label)
  }, [selectedDeliveryMethod, label])

  useEffect(() => {
    if (isDefault && !selectedDeliveryMethod) {
      setDeliveryMethod({
        label,
        price,
        info
      })
    }
  }, [isDefault, label, price, options, info, selectedDeliveryMethod, setDeliveryMethod])

  useEffect(() => {
    setRenderOptions(isSelected && options)
  }, [isSelected, options])

  useEffect(() => {
    setShowTags(selectedDeliveryMethod?.day)
  }, [selectedDeliveryMethod, options?.label])

  return (
    <article
      className={`
        ${classes.delivery_cost_item}
        ${isSelected && classes.selected}
        `}
    >
      {
      renderOptions
        ? <DeliveryOptions options={filteredOptions} showTags={showTags} />
        : <Method
            label={label}
            price={price}
            info={info}
            renderOptions={renderOptions}
          />
      }
    </article>
  )
}
