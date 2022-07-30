<script lang="ts">
import { FilterMatchMode } from 'primevue/api'
import AppointmentService from '../../../services/AppointmentService'
import PatientService from '../../../services/PatientService'
import { useAuthStore } from '~/stores/auth.store'
const baseUrl = `${import.meta.env.VITE_API_URL}`
export default {
  data() {
    return {
      appointments: null,
      patients: null,
      appointmentDialog: false,
      deleteAppointmentDialog: false,
      deleteAppointmentsDialog: false,
      appointment: {},
      selectedAppointments: null,
      selectedPatient: null,
      filters: {},
      submitted: false,
      receptionId:-1

    }
  },
  appointmentService: null,
  patientService: null,
  created () {
    this.appointmentService = new AppointmentService()
    this.patientService = new PatientService()
    $fetch(`${baseUrl}/api/profileById/${useAuthStore().user.user.id}`).then((r) => {
      if (r.receptionist) {
        this.receptionId = r.receptionist.recep_id
      }
    })
    this.initFilters()
  },
  mounted () {
    this.appointmentService.getAppointments().then(data => this.appointments = data)
    this.patientService.getPatients().then(data => this.patients = data)
  },
  methods: {

    openNew () {
      this.appointment = {}
      this.submitted = false
      this.appointmentDialog = true
    },
    hideDialog () {
      this.appointmentDialog = false
      this.submitted = false
    },
    async saveAppointment () {
      this.submitted = true
      if (this.appointment.time) {
        if (this.appointment.appoint_id) {
          this.appointment.time = this.appointment.time.value ? this.appointment.time.value : this.appointment.time
          this.appointment.pat_id = this.appointment.pat_id.value ? this.appointment.pat_id.value : this.appointment.pat_id
          this.appointments[this.findIndexById(this.appointment.appoint_id)] = this.appointment
          await $fetch(`http://127.0.0.1:8000/api/Appointments/${this.appointment.appoint_id}`, {
            method: 'PUT',
            body: JSON.stringify({
              time: this.appointment.time,
              description: this.appointment.description,
              pat_id: this.selectedPatient.patient_id,
              recep_id: this.receptionId
            })
          })
          this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Updated', life: 3000 })
        } else {
          this.appointment.appoint_id = this.createId()
          this.appointments.push(this.appointment)
          await $fetch('http://127.0.0.1:8000/api/Appointments', {
            method: 'POST',
            body: JSON.stringify({
              time: this.appointment.time,
              description: this.appointment.description,
              pat_id: this.selectedPatient.patient_id,
              recep_id: this.receptionId
            }),
          })
        }
        this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Created', life: 3000 });
        this.appointmentService.getAppointments().then(data => this.appointments = data);
        this.appointmentDialog = false
        this.appointment = {}
      }
    },
    editAppointment (appointment) {
      this.appointment = { ...appointment }
      this.appointmentDialog = true
    },
    confirmDeleteAppointment (appointment) {
      this.appointment = appointment
      this.deleteAppointmentDialog = true
    },
    deleteAppointment () {
      this.appointments = this.appointments.filter(val => val.appoint_id !== this.appointment.appoint_id)
      $fetch(`http://127.0.0.1:8000/api/Appointments/${this.appointment.appoint_id}`, {
        method: 'DELETE'
      })
      this.deleteAppointmentDialog = false
      this.appointment = {}
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Deleted', life: 3000 })
    },
    findIndexById (id) {
      let index = -1
      for (let i = 0; i < this.appointments.length; i++) {
        if (this.appointments[i].appoint_id === id) {
          index = i
          break
        }
      }

      return index
    },
    createId () {
      let id = ''
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return id
    },
    confirmDeleteSelected () {
      this.deleteAppointmentssDialog = true
    },
    deleteSelectedAppointmentss () {
      this.appointments = this.appointments.filter(val => !this.selectedAppointments.includes(val))
      this.deleteAppointmentsDialog = false
      this.selectedAppointments = null
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Appointments Deleted', life: 3000 })
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="card">
      <Toast />
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNew"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            class="p-button-danger"
            :disabled="!selectedAppointments || !selectedAppointments.length"
            @click="confirmDeleteSelected"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        v-model:selection="selectedAppointments"
        :value="appointments"
        data-key="appoint_id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rows-per-page-options="[5, 10, 25]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} Appointments"
        responsive-layout="scroll"
      >
        <template #header>
          <div
            class="table-header flex flex-column md:flex-row md:justiify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center">
              Manage Appointments
            </h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters.global.value" placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column
          selection-mode="multiple"
          style="width: 3rem"
          :exportable="false"
        />
        <Column
          field="time"
          header="Time"
          :sortable="true"
          style="min-width: 16rem"
        />
        <Column
          field="patientName"
          header="Patient Name"
          :sortable="true"
          style="min-width: 10rem"
        />
        <Column
          field="description"
          header="Description"
          :sortable="true"
          style="min-width: 10rem"
        />
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editAppointment(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="confirmDeleteAppointment(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="appointmentDialog"
      :style="{ width: '450px' }"
      header="Appointment Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="time">Time</label>
        <Calendar
          id="time"
          v-model="appointment.time"
          required="true"
          :show-time="true"
          :showSeconds="true"
          :hour-format="12"
          date-format="dd-mm-yy"
          :class="{ 'p-invalid': submitted && !appointment.time }"
        />
        <small v-if="submitted && !appointment.time" class="p-error">time is required.</small>
      </div>

      <div class="field col-12">
        <Dropdown
          id="patient"
          v-model="selectedPatient"
          :options="patients"
          option-label="name"
          placeholder="Select Patient "
          :class="{ 'p-invalid': submitted && !appointment.pat_id }"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value">
              <span>{{ slotProps.value.name }}</span>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div>
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
        <small v-if="submitted && !appointment.pat_id" class="p-error">Patient  is required.</small>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <Textarea id="description" v-model.trim="appointment.description" required="true" rows="3" cols="20" />
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveAppointment"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteAppointmentDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="appointment">Are you sure you want to delete <b>{{ appointment.time }}</b>?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteAppointmentDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteAppointment"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteAppointmentsDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="appointment">Are you sure you want to delete the selected Appointments?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteAppointmentsDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedAppointments"
        />
      </template>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
