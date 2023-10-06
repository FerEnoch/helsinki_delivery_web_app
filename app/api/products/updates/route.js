import { updateCacheOnSnapshot } from '@/processes/services/model/server/updateCacheOnSnapshot'
import { NextResponse } from 'next/server'

export async function PATCH (request) {
  try {
    console.log('*///* Incomming PATCH request *///*')
    const content = await request.json()

    const isContentNull = new Set(content)
    if (!content.length || isContentNull.has(null) || isContentNull.has(undefined)) {
      console.log('The server is returning a BAD REQUEST - 400 status code response')
      throw new Error('BAD REQUEST')
    }

    const { code, message } = await updateCacheOnSnapshot({ action: 'UPDATE', content })
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

export async function PUT (request) {
  try {
    console.log('*///* Incomming ADD request *///*')
    const content = await request.json()
    const isContentNull = new Set(content)

    if (!content.length || isContentNull.has(null) || isContentNull.has(undefined)) {
      console.log('The server is returning a BAD REQUEST - 400 status code response')
      throw new Error('BAD REQUEST')
    }

    const { code, message } = await updateCacheOnSnapshot({ action: 'ADD', content })
    if (code === 200 && message === 'Success') {
      console.log('**/ Successfull operation ADD **/')

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

export async function DELETE (request) {
  try {
    console.log('*///* Incomming DELETE request *///*')
    const content = await request.json()

    const isContentNull = new Set(content)
    if (!content.length || isContentNull.has(null) || isContentNull.has(undefined)) {
      console.log('The server is returning a BAD REQUEST - 400 status code response')
      throw new Error('BAD REQUEST')
    }

    const { code, message } = await updateCacheOnSnapshot({ action: 'DELETE', content })
    if (code === 200 && message === 'Success') {
      console.log('**/ Successfull operation DELETE **/')

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
