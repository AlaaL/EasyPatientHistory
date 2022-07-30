export default class MedicineService {
  getMedicines () {
    return fetch('http://127.0.0.1:8000/api/Medicines').then(res => res.json()).then(d => d.data)
  }
}
