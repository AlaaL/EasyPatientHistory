export default class PatientService {
  getPatients () {
    return fetch('http://127.0.0.1:8000/api/Patients').then(res => res.json()).then(d => d.data)
  }
}
