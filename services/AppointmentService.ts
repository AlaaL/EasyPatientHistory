export default class AppointmentService {
  getAppointments() {
    return fetch('http://127.0.0.1:8000/api/Appointments').then(res => res.json()).then(d => d.data)
  }
}
