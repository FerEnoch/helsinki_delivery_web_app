import { getBucketImageURL } from '@/processes/services/config/firebase/server/model/getBucketImageURL'
import { NextResponse } from 'next/server'

export async function GET (request) {
  const { searchParams } = new URL(request.url)

  if (!searchParams) {
    return NextResponse.json({
      message: 'ERROR */****-->> BAD REQUEST! Could not find resource without correct params'
    },
    { status: 400 })
  }

  const reqId = decodeURIComponent(searchParams.get('id'))

  const data = await getBucketImageURL(reqId)
  return NextResponse.json({
    message: 'Success',
    data
  }, { status: 200 })
}
