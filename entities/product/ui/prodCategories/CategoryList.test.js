import { render, screen, waitFor } from '@testing-library/react'
import { getInitialAppProducts } from '@/processes/services/model/server/getInitialAppProducts'
import { describe, expect, it } from 'vitest'
import CategoryList from './CategoryList'
import { extract } from '@/processes/services/lib/extract'
import { initialProdsData } from '@/__test__/mock_db/initialProdsData'

describe('Home page', () => {
  it('Should render all categories and a combos in list items', async () => {
    console.log({
      NEXT_PUBLIC_LOCAL_BASE_URL: process.env.NEXT_PUBLIC_LOCAL_BASE_URL,
      MOCK_DB: process.env.MOCK_DB,
      FIREBASE_SERVICE_ACCOUNT_TYPE: process.env.FIREBASE_SERVICE_ACCOUNT_TYPE,
      FIREBASE_SERVICE_ACCOUNT_PROJECT_ID: process.env.FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
      FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
      FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY: process.env.FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
      FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
      FIREBASE_SERVICE_ACCOUNT_CLIENT_ID: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
      FIREBASE_SERVICE_ACCOUNT_AUTH_URI: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
      FIREBASE_SERVICE_ACCOUNT_TOKEN_URI: process.env.FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
      FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL: process.env.FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
      FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL: process.env.FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
      FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN: process.env.FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
      API_KEY: process.env.API_KEY,
      NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY
    })

    const initialApiProducts = await getInitialAppProducts()

    const apiStockProds = initialApiProducts.filter(({ isCombo }) => !isCombo)
    const { sortPosibilitiesByCriteria: apiCategories } = extract(
      apiStockProds,
      { criteria: 'category', value: '*' }
    )
    const apiCombos = apiStockProds.filter(({ isCombo }) => isCombo)
    const apiCombosLabels = Array.from(new Set(apiCombos.map(combo => combo.category)))

    render(<CategoryList categories={apiCategories} combosLabels={apiCombosLabels} />)

    const mockCombosLabels = []
    const mockCategories = initialProdsData.map(({ firestoreID, categoryData }) => {
      const data = JSON.parse(categoryData)
      const isCombo = data.filter(({ isCombo }) => isCombo)
      if (isCombo.length > 0) {
        mockCombosLabels.push(firestoreID)
        return null
      }
      return firestoreID
    }).filter(Boolean)

    await Promise.all(mockCategories.concat(mockCombosLabels).map(async (category, _, arr) => {
      await waitFor(() => expect(screen.getByText(new RegExp(category, 'i'))))
    }))
  })
})
