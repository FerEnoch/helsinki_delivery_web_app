export function scrollToNextProduct ({ index, containerRef, direction, correctionPixels = 0 }) {
  const list = containerRef?.current
  let productSize
  let offsetDirection

  if (direction === 'y') {
    productSize = list?.offsetHeight + correctionPixels
    offsetDirection = 'top'
  } else if (direction === 'x') {
    productSize = list?.offsetWidth + correctionPixels
    offsetDirection = 'left'
  }

  list?.scrollTo({
    [offsetDirection]: index * productSize,
    behavior: 'smooth'
  })
  return index
}
