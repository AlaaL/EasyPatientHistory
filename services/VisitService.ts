export default class VisitService {
  getVisits() {
    return fetch('http://127.0.0.1:8000/api/Visits').then(res => res.json()).then(d => d.data)
  }
}
