import { useCallback, useEffect, useState } from 'react'
import { useAppStore } from '@/entities/lib/store'
import { search } from '../lib/search'
import { sanitizeInput } from '@/features/formFill/lib/sanitizeInput'

export function useSearch () {
  const [userInput, setUserInput] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [searchResults, setSearchResults] = useState(null)
  const { stockProducts } = useAppStore()

  const getSearchParam = useCallback((e) => {
    // sanitize user input
    const searchParam = String(e.target.value).trim().toLowerCase()
    const [sanitizedSearchParam] = sanitizeInput(searchParam)
    setUserInput(sanitizedSearchParam)
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
      const foundResult = userInput && search(userInput, stockProducts).reverse()
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
