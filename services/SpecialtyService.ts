export default class SpecialtyService {
  getSpecialties() {
    return fetch('/data/specialty.json').then(res => res.json()).then(d => d.data)
  }
}
