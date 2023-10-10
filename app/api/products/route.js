import { NextResponse } from 'next/server'
import { extract } from '@/processes/services/lib/extract'
import { formatReturnProducts } from '@/processes/services/config/formatReturnProducts'
import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'

export async function GET (request) {
  const { searchParams } = new URL(request.url)

  if (!searchParams) {
    return NextResponse.json({
      message: 'ERROR */****-->> BAD REQUEST! Could not find resource without correct params'
    },
    { status: 400 })
  }

  const reqCategory = decodeURIComponent(searchParams.get('category'))
  const reqType = decodeURIComponent(searchParams.get('type'))
  const reqId = decodeURIComponent(searchParams.get('id'))
  let data

  const initialProducts = await getInitialAppProducts()

  if (reqCategory) {
    if (reqCategory === '*') {
      const { sortedProducts } = extract(
        [...initialProducts],
        { criteria: 'category', value: reqCategory }
      )
      data = formatReturnProducts(sortedProducts)
    } else if (reqCategory !== '*' && reqType === 'null') {
      const { sortedProducts } = extract(
        [...initialProducts],
        { criteria: 'category', value: reqCategory }
      )
      data = formatReturnProducts(sortedProducts)
    } else if (reqCategory !== '*' && reqType === '*') {
      const { sortedProducts } = extract(
        [...initialProducts],
        {
          criteria: 'category',
          value: reqCategory
        },
        {
          whereField: 'type',
          isEqual: '*'
        })
      data = formatReturnProducts(sortedProducts)
    } else if (reqCategory !== '*' && (reqType !== '*' && reqType !== 'null')) {
      const { sortedProducts } = extract(
        [...initialProducts],
        {
          criteria: 'category',
          value: reqCategory
        },
        {
          whereField: 'type',
          isEqual: reqType
        })
      data = formatReturnProducts(sortedProducts)
    }
  }

  if (reqId !== 'null' && reqCategory === 'null' && reqType === 'null') {
    const { sortedProducts } = extract(
      [...initialProducts],
      { criteria: 'id', value: reqId }
    )
    data = formatReturnProducts(sortedProducts)
  }

  return NextResponse.json({
    message: 'Success',
    data
  }, { status: 200 })
}
