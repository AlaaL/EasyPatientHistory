export default class MedicineService {
  getMedicines() {
    return fetch('/data/medicines.json').then(res => res.json()).then(d => d.data)
  }

}
