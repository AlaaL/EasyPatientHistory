export default class DiagnosisService {
  getDiagnosises() {
    return fetch('/data/diagnosises.json').then(res => res.json()).then(d => d.data)
  }

}
