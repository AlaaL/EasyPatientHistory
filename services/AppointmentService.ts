export default class AppointmentService {
  getAppointments() {
    return fetch('/data/appointments.json').then(res => res.json()).then(d => d.data)
  }
}
