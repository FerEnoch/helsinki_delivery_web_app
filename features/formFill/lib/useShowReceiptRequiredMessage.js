import { useState } from 'react'

export function useShowReceiptRequiredMessage () {
  const [showMessageRecipeRequired, setShowMessageRecipeRequired] = useState(false)

  const showRecipeRequiredMessage = () => setShowMessageRecipeRequired(true)
  const hideRecipeRequiredMessage = () => setShowMessageRecipeRequired(false)

  return {
    showRecipeRequiredMessage,
    hideRecipeRequiredMessage,
    isRecipeQuiredMessageVissible: showMessageRecipeRequired
  }
}
