import { Checker } from './Checker'
declare global {
  const Carnap: {
    checkIchikawaJenkinsSLTableau: Checker
    [name: string]: Checker | undefined
  }
  interface Window {
    Carnap?: typeof Carnap
  }
}
