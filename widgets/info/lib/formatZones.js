export function formatZones (zones) {
  const limits = zones.match(/l[ií]mite (norte|sur|este|oeste):?/gi)
  const splitByLimit = zones.split('\n')
  return splitByLimit.map((sentence) => {
    let foundLimit
    let foundLimitIndex
    limits.forEach((limit) => {
      if (sentence.indexOf(limit) === -1) return
      foundLimitIndex = sentence.indexOf(limit)
      foundLimit = limit
    })
    const limitSentence = sentence.slice(foundLimitIndex + foundLimit.length)
    return [foundLimit, limitSentence]
  })
}
