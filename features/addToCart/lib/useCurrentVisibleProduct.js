import { useCallback, useEffect, useMemo, useState } from 'react'

export function useCurrentVisibleProduct (products, listRef) {
  const [currentVisibleProduct, setCurrentVisibleProduct] = useState({})
  const [currentVisibleProdIndex, setCurrentVisibleProdIndex] = useState(0)

  const options = useMemo(() => ({
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  }), [])

  const getObserver = useCallback((setProdIndex) => new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setProdIndex(entry.target.id)
      }
    })
  }, options), [options])

  useEffect(() => {
    const observer = getObserver(setCurrentVisibleProdIndex)
    const items = listRef.current.children
    Array.from(items).forEach(item => {
      observer.observe(item)
    })

    return () => {
      Array.from(items).forEach((item) => {
        observer.unobserve(item)
      })
    }
  }, [getObserver, listRef])

  useEffect(() => {
    const visibleProd = products[currentVisibleProdIndex]
    if (visibleProd) setCurrentVisibleProduct({ ...visibleProd })
  }, [currentVisibleProdIndex, products])

  return [currentVisibleProduct, currentVisibleProdIndex]
}
