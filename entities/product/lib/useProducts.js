import { useAppStore } from '@/entities/lib/store'
import { extract } from '@/processes/services/lib/extract'
import { getProductList } from '@/processes/services/model/client/getProductList'
import { useEffect, useMemo, useState } from 'react'

export function useProducts (criteria = null, must = null) {
  const [isLoading, setIsLoading] = useState(true)
  const { stockProducts, setInitialStockProducts } = useAppStore()

  useEffect(() => {
    async function fetchInitialProducts () {
      await getProductList({ category: '*' })
        .then(products => setInitialStockProducts([...products]))
        .catch(console.log) // esto está mal! cambiarlo !!
    }

    fetchInitialProducts()
    setIsLoading(false)
  }, [setInitialStockProducts])

  const reqData = useMemo(() => {
    return criteria && stockProducts.length > 0 && extract([...stockProducts], criteria, must)
  }, [criteria, must, stockProducts])

  return {
    data: reqData || {},
    isLoading,
    stockProducts
  }
}
