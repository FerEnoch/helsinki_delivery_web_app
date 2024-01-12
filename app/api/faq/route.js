import { MEM_CACHE } from '@/processes/cache/config'
import { updateCacheOnSnapshot } from '@/processes/services/model/server/updateCacheOnSnapshot'
import { NextResponse } from 'next/server'

export async function PATCH (request) {
  const { FIREBASE_CACHE: { FAQ } } = MEM_CACHE

  try {
    console.log('*///* Incomming PATCH request *///*')
    const content = await request.json()

    const isContentNull = new Set(content)
    if (!content.length || isContentNull.has(null) || isContentNull.has(undefined)) {
      console.log('The server is returning a BAD REQUEST - 400 status code response')
      throw new Error('BAD REQUEST')
    }

    const { code, message } = await updateCacheOnSnapshot({ cache: FAQ, action: 'UPDATE', content })
    if (code === 200 && message === 'Success') {
      console.log('**/ Successfull operation UPDATE **/')
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
