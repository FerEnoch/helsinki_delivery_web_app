const currentEnviromentURL = process.env.NODE_ENV === 'development'
  ? process.env.NEXT_PUBLIC_LOCAL_BASE_URL
  : process.env.NEXT_PUBLIC_PROD_BASE_URL

export const baseURL = `${currentEnviromentURL || ''}/api`

export const withAuthAPIOptionsObj = {
  cache: 'no-store',
  headers: {
    'content-type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
    referer: currentEnviromentURL
  }
}
