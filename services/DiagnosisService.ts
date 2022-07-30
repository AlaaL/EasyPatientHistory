export default class DiagnosisService {
  getDiagnosises() {
    return fetch('http://127.0.0.1:8000/api/Diagnsises').then(res => res.json()).then(d => d.data)
  }

}
