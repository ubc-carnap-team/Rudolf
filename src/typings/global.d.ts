import { Checker } from './Checker'
declare global {
  const Carnap: {
    checkIchikawaJenkinsSLTableau: Checker
  }
  interface Window {
    Carnap: typeof Carnap
  }
}
