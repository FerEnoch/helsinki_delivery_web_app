import { useCallback, useEffect, useState } from 'react'
import { useAppStore } from '@/entities/lib/store'
import { sanitizeInput } from '@/features/formFill/lib/sanitizeInput'

function search (param, allProducts) {
  const searchParam = String(param).trim().toLowerCase()
  const [sanitizedParam] = sanitizeInput(searchParam)
  const result = new Set()
  allProducts.forEach(prod => {
    const { category, type, name, description } = prod
    if (category.toLowerCase().includes(sanitizedParam)) return result.add(prod)
    if (type.toLowerCase().includes(sanitizedParam)) return result.add(prod)
    if (name.toLowerCase().includes(sanitizedParam)) return result.add(prod)
    if (description.toLowerCase().includes(sanitizedParam)) return result.add(prod)
  })
  return [...result]
};

export function useSearch () {
  const [userInput, setUserInput] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchResults, setSearchResults] = useState(null)
  const { stockProducts } = useAppStore()

  const getSearchParam = useCallback((e) => {
    setUserInput(e.target.value)
  }, [])

  const cleanSearchParams = useCallback(() => {
    setTimeout(() => {
      setUserInput('')
    }, 250)
  }, [])

  useEffect(() => {
    if (!userInput?.length) return setSearchResults(null)
    setIsLoading(true)
    const debounce = setTimeout(() => {
      const foundResult = userInput && search(userInput, stockProducts)
      setSearchResults(foundResult)
    }, [1000])
    return () => debounce && clearTimeout(debounce)
  }, [userInput, stockProducts])

  useEffect(() => {
    if (searchResults) {
      setIsLoading(false)
    }
  }, [searchResults])

  useEffect(() => {
    if (searchResults) {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          setSearchResults(null)
          setUserInput('')
        }
      })
      return () => window.removeEventListener('keydown', null)
    }
  }, [searchResults])

  return {
    userInput,
    getSearchParam,
    cleanSearchParams,
    foundProducts: searchResults,
    isLoading
  }
}
