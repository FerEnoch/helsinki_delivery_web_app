// The below can be used in a Jest global setup file or similar for your testing set-up
import { loadEnvConfig } from '@next/env'

const setup = async () => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
}
export default setup
