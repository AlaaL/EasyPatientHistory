<script>
import AppointmentService from '../../../services/AppointmentService';
export default {
  data () {
    return {
      appointments: null,
      appointmentDialog: false,
      deleteAppointmentDialog: false,
      deleteAppointmentsDialog: false,
      appointment: {},
      selectedAppointments: null,
      filters: {},
      submitted: false
    }
  },
  appointmentService: null,
  created() {
    this.appointmentService = new AppointmentService()
  },
  mounted() {
    this.appointmentService.getAppointments().then(data => this.appointments = data)
  },
  methods: {
    openNew() {
      this.appointment = {}
      this.submitted = false
      this.appointmentDialog= true
    },
    hideDialog() {
      this.appointmentDialog = false
      this.submitted = false
    },
    saveAppointment() {
      this.submitted = true

      if (this.appointment.time.trim())
      {
        if (this.appointment.id) {
          this.appointment.time = this.appointment.time.value ? this.appointment.time.value : this.appointment.time;
          this.appointment.doctorName = this.appointment.doctorName.value ? this.appointment.doctorName.value : this.appointment.doctorName;
          this.appointment.patientName = this.appointment.patientName.value ? this.appointment.patientName.value : this.medicine.patientName;
          this.appointments[this.findIndexById(this.appointment.id)] = this.appointment
          this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Updated', life: 3000 })
        }
        else {
          this.appointment.id = this.createId()
          this.appointments.push(this.medicine)
          this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Created', life: 3000 })
        }

        this.appointmentDialog = false
        this.appointment = {}
      }
    },
    editAppointment(appointment) {
      this.appointment = { ...appointment }
      this.appointmentDialog = true
    },
    confirmDeleteAppointment(appointment) {
      this.appointment = appointment
      this.deleteAppointmentDialog = true
    },
    deleteAppointment() {
      this.appointments = this.appointments.filter(val => val.id !== this.appointment.id)
      this.deleteAppointmentDialog = false
      this.appointment = {}
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Appointment Deleted', life: 3000 })
    },
    findIndexById(id) {
      let index = -1
      for (let i = 0; i < this.appointments.length; i++) {
        if (this.appointmentss[i].id === id) {
          index = i
          break
        }
      }

      return index
    },
    createId() {
      let id = ''
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return id
    },
    confirmDeleteSelected() {
      this.deleteAppointmentssDialog = true
    },
    deleteSelectedAppointmentss() {
      this.appointments = this.appointments.filter(val => !this.selectedAppointmentss.includes(val))
      this.deleteAppointmentsDialog = false
      this.selectedAppointments = null
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Medicines Deleted', life: 3000 })
    },
  },
}
</script>

<template>
  <div>
    <div class="card">
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
        :value="medicines"
        data-key="id"
        :paginator="true"
        :rows="10"
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
              <InputText  placeholder="Search..."/>
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
          field="doctorName"
          header="Doctor Name"
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
        <InputText id="time" v-model.trim="appointment.time" required="true" autofocus :class="{'p-invalid': submitted && !appointment.time}" />
        <small class="p-error" v-if="submitted && !appointment.time">time is required.</small>
      </div>
      <div class="field">
        <label for="doctorName">Doctor Name</label>
        <InputText id="doctorName" v-model.trim="appointment.doctorName" required="true" autofocus :class="{'p-invalid': submitted && !appointment.doctorName}" />
        <small class="p-error" v-if="submitted && !appointment.doctorName">doctor Name is required.</small>
      </div>
      <div class="field">
        <label for="patientName">Patient Name</label>
        <InputText id="patientName" v-model.trim="appointment.patientName" required="true" autofocus :class="{'p-invalid': submitted && !appointment.patientName}" />
        <small class="p-error" v-if="submitted && !appointment.patientName">Patient Name is required.</small>
      </div>
    <div class="field">
        <label for="description">Description</label>
        <Textarea id="description" v-model="appointment.description" required="true" rows="3" cols="20" />
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
        <span v-if="appointment">Are you sure you want to delete <b>{{appointment.time}}</b>?</span>
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
