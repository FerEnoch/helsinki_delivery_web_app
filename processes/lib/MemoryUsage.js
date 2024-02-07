export default function MemoryUsage () {
/* eslint-disable */
void (function memoryUsageLogger () {
  const memoryUsage = process.memoryUsage()
  const memoryUsageTable = {}
  for (const [key, value] of Object.entries(memoryUsage)) {
    memoryUsageTable[key] = `${value / 1000000} MB `
  }
  // console.log('*/***** Memory usage table */*****')
  // console.table(memoryUsageTable)
})()
/* eslint-enable */
}
