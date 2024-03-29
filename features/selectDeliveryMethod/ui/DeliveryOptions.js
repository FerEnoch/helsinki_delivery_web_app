import { useState } from 'react'
import classes from './DeliveryOptions.module.css'
import SelectedTags from './SelectedTags'
import ShowOptions from './ShowOptions'
import Options from './Options'
import ChosenTag from './ChosenTag'
import { useAppStore } from '@/entities/lib/store'

import { i18n } from '@/shared/model/i18n'
const { NO_TAKE_AWAY: noTakeAwayMessage } = i18n.LANG.ESP.UI.TOAST.TIME_BLOCKER

export default function DeliveryOptions ({ options, showTags }) {
  const { selectedDeliveryMethod } = useAppStore()
  const [openOptions, setOpenOptions] = useState(null)

  const currentDayTakeAway = !options?.label.match(noTakeAwayMessage)

  const { day, tag, businessHours } = selectedDeliveryMethod
  const toggleOptionList = () => setOpenOptions(prevState => !prevState)

  return (
    <div className={`
    ${classes.container}
    ${showTags ? classes.tags : classes.options}
    `}
    >
      {
      showTags
        ? (
          <SelectedTags toggleOptionList={toggleOptionList}>
            {
              openOptions
                ? (
                  <ShowOptions
                    label={options?.label.toUpperCase()}
                    toggleOptionList={currentDayTakeAway ? toggleOptionList : () => {}}
                    openOptions={currentDayTakeAway && openOptions}
                  >
                    {
                  openOptions && (
                    options.select.map(({ day, ops }) => {
                      return (
                        <Options
                          key={day}
                          day={day}
                          ops={ops}
                          toggleOptions={toggleOptionList}
                        />
                      )
                    }))
                  }
                  </ShowOptions>
                  )
                : <ChosenTag
                    onClick={toggleOptionList}
                    day={day?.toUpperCase()}
                    tag={tag?.toUpperCase()}
                    hours={businessHours}
                  />
          }
          </SelectedTags>
          )
        : (
          <ShowOptions
            label={options?.label.toUpperCase()}
            toggleOptionList={currentDayTakeAway ? toggleOptionList : () => {}}
            openOptions={currentDayTakeAway && openOptions}
          >
            {
            openOptions && (
              options.select.map(({ day, ops }) => {
                return (
                  <Options
                    key={day}
                    day={day}
                    ops={ops}
                    toggleOptions={toggleOptionList}
                  />
                )
              }
              )
            )
            }
          </ShowOptions>
          )
}
    </div>
  )
}
