import { getBusinessHours } from '@/entities/timeBlocker/service/getBusinessHours'
import { getDeliveryMethods } from '@/features/selectDeliveryMethod/lib/getDeliveryMethods'
import { MEM_CACHE } from '@/processes/cache/config'
import { updateCacheOnSnapshot } from '@/processes/services/model/server/updateCacheOnSnapshot'
import { NextResponse } from 'next/server'

export async function GET () {
  const businessHoursResponse = await getBusinessHours()
  const {
    grid,
    openToOrders,
    deliveryCost,
    businessHours
  } = businessHoursResponse

  const deliveryMethods = await getDeliveryMethods(businessHoursResponse)

  const { takeAway, delivery } = businessHours
  const maxExtendedBusinessHours = Math.max(delivery.extendedNight.to, takeAway.extendedNight.to)

  const response = {
    message: 'Success',
    data: JSON.stringify({
      deliveryMethods,
      grid,
      openToOrders,
      deliveryCost,
      businessHours,
      maxExtendedBusinessHours
    })
  }

  return NextResponse.json(response, { status: 200 })
}

export async function PATCH (request) {
  const { FIREBASE_CACHE: { BUSINESS_HOURS } } = MEM_CACHE

  try {
    console.log('*///* Incomming PATCH request *///*')
    const content = await request.json()

    const isContentNull = new Set(content)
    if (!content.length || isContentNull.has(null) || isContentNull.has(undefined)) {
      console.log('The server is returning a BAD REQUEST - 400 status code response')
      throw new Error('BAD REQUEST')
    }

    const { code, message } = await updateCacheOnSnapshot({ cache: BUSINESS_HOURS, action: 'UPDATE', content })

    if (code === 200 && message === 'Success') {
      console.log('**/ Successful operation UPDATE **/')
      return NextResponse.json({ message }, { status: code })
    } else {
      console.log(`--/ ${message} --/`)
      return NextResponse.json({
        message
      },
      { status: code })
    }
  } catch (e) {
    console.error('Bad response is returned...')
    if (e.message === 'BAD REQUEST') {
      return NextResponse.json({
        message: 'BAD REQUEST --> :(  ///***/* Could NOT UPDATE CORRECTLY the web app'
      },
      { status: 400 })
    }
    return NextResponse.json({
      message: 'Internal SERVER ERROR --> :(  ///***/* Could NOT UPDATE CORRECTLY the web app'
    },
    { status: 500 })
  }
}
