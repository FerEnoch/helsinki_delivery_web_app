import { useAppStore } from '@/entities/lib/store'
import { extract } from '@/processes/services/lib/extract'
import { getProductList } from '@/processes/services/model/client/getProductList'
import { useEffect, useMemo, useState } from 'react'

export function useProducts (criteria = null, must = null) {
  const [isLoading, setIsLoading] = useState(true)
  const { stockProducts, setInitialStockProducts } = useAppStore()

  useEffect(() => {
    /**
    * Doesn't matter the fact that it continues retrieving products from database
    * again and again on every hook call, because the products are in cache memory in the
    * server, and this cache memory is automatically updated with main stock CRUD operations
    * in the google drive sheet info.
    * It needs to be revalidated constantly to retrieve cache last updatings
    */
    getProductList()
      .then(setInitialStockProducts)
    setIsLoading(false)
  }, [setInitialStockProducts])

  const reqData = useMemo(() => {
    return criteria && stockProducts.length > 0 && extract(stockProducts, criteria, must)
  }, [criteria, must, stockProducts])

  return {
    data: reqData || {},
    isLoading,
    stockProducts
  }
}
