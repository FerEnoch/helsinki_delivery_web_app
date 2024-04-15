import { MEM_CACHE } from '@/processes/cache/config'
import { updateCacheOnSnapshot } from '@/processes/services/model/server/updateCacheOnSnapshot'
import { NextResponse } from 'next/server'
/**
  * NEW API!
  */
export async function PATCH (request) {
  const { FIREBASE_CACHE: { PRODUCTS } } = MEM_CACHE
  try {
    console.log('*///* Incomming PATCH request *///*')
    const { tag } = await request.json()
    console.log(`*///* tag -> ${tag} *///*`)

    const { code, message } = await updateCacheOnSnapshot({ cache: PRODUCTS, action: tag, content: PRODUCTS })
    if (code === 200 && message === 'Success') {
      console.log('**/ Successfull operation **/')
      return NextResponse.json({ message }, { status: code })
    } else {
      console.log(`--/ ${message} --/`)
      return NextResponse.json({
        message
      },
      { status: code })
    }
  } catch (e) {
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
