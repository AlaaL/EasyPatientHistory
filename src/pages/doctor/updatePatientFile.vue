<script lang= "ts">
import { FilterMatchMode } from 'primevue/api'
import VisitService from '../../../services/VisitService'
import DiagnosisService from '../../../services/DiagnosisService'
import MedicineService from '../../../services/MedicineService'
import PatientService from '../../../services/PatientService'

const baseUrl = `${import.meta.env.VITE_API_URL}`
export default {
  data() {
    return {
      visits: null,
      diagnosises: null,
      medicines: null,
      patients: null,
      visitDialog: false,
      deleteVisitDialog: false,
      deleteVisitsDialog: false,
      visit: {},
      selectedVisits: null,
      selectedDiagnosises: null,
      selectedMedicines: null,
      selectedPatient: null,
      filters: {},
      submitted: false,
      currentTime: Date(),
      pateint: null,
    }
  },
  diagnosisService: null,
  visitService: null,
  medicineService: null,
  patientService: null,
  created () {
    this.diagnosisService = new DiagnosisService()
    this.medicineService = new MedicineService()
    this.visitService = new VisitService()
    this.patientService = new PatientService()

    this.initFilters()
  },
  mounted () {
    this.diagnosisService.getDiagnosises().then(data => this.diagnosises = data)
    this.medicineService.getMedicines().then(data => this.medicines = data)
    this.patientService.getPatients().then(data => this.patients = data)
  },
  methods: {
    openNew () {
      this.visit = {}
      this.submitted = false
      this.visitDialog = true
    },
    hideDialog () {
      this.visitDialog = false
      this.submitted = false
    },
    saveVisit () {
      this.submitted = true

      if (this.visit.time) {
        if (this.visit.visit_id) {
          this.visits[this.findIndexById(this.visit.visit_id)] = this.visit
          $fetch(`http://127.0.0.1:8000/api/Visits/${this.visit.visit_id}`, {
            method: 'PUT',
            body: JSON.stringify({
              time: this.visit.time,
              description: this.visit.description,
              pat_id: this.patient.patient_id,
              diagn_id: this.selectedDiagnosises.diagn_id,
              medic_id: this.selectedMedicines.medic_id,
            }),
          })
          this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Visit Updated', life: 3000 })
        } else {
          this.visit.visit_id = this.createId()
          this.visits.push(this.visit)
          $fetch('http://127.0.0.1:8000/api/Visits', {
            method: 'POST',
            body: JSON.stringify({
              time: this.visit.time,
              description: this.visit.description,
              pat_id: this.patient.patient_id,
              diagn_id: this.selectedDiagnosises.diagn_id,
              medic_id: this.selectedMedicines.medic_id,
            })
          })
          this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Visit Created', life: 3000 })
        }

        this.visitDialog = false
        this.visit = {}
      }
    },
    editVisit (visit) {
      this.visit = { ...visit }
      this.visitDialog = true
    },
    findIndexById (id) {
      let index = -1
      for (let i = 0; i < this.visits.length; i++) {
        if (this.visits[i].visit_id === id) {
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
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }
    },
    loadPatientInfo () {
      //this.visitService.getVisits().then(data => this.visits = data)
      // $fetch(`${baseUrl}/api/Patients/${this.selectedPatient.patient_id}`).then((r) => {
      //   this.pateint = r
      // });
      $fetch(`${baseUrl}/api/getPatientVisit/${this.selectedPatient.patient_id}`).then((r) => {
        this.visits = r;
        console.log(this.visits);
      });
    },
  }
}
</script>

<template>
  <div>
    <div class="card">
      <Toast />
      <div class="p-fluid grid">
        <div class="field col-12">
          <Dropdown
            id="patient"
            v-model="selectedPatient"
            :options="patients"
            option-label="name"
            placeholder="Select Patient "
            @change="loadPatientInfo"
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
        </div>
      </div>

      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="New"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNew"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        v-model:selection="selectedVisits"
        :value="visits"
        data-key="visit_id"
        :paginator="true"
        :rows="5"
        :filters="filters"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rows-per-page-options="[5, 10, 15]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} Patient Visits "
        responsive-layout="scroll"
      >
        <template #header>
          <div
            class="table-header flex flex-column md:flex-row md:justiify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center">
              Manage Patient Visits
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
          header="Visit Time"
          :sortable="true"
          style="min-width: 16rem"
        />
        <Column
          field="diagnosis"
          header="Visit Diagnosises"
          :sortable="false"
          style="min-width: 16rem"
        />
        <Column
          field="medicine"
          header="Visit Medicines"
          :sortable="false"
          style="min-width: 16rem"
        />
        <Column
          field="clinicalHistory"
          header="Clinical History"
          :sortable="false"
          style="min-width: 16rem"
        />
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editVisit(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="visitDialog"
      :style="{ width: '450px' }"
      header="Visit Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="time">Visit Time</label>
        <InputText id="time" v-model="currentTime" :disabled="true" />
      </div>
      <div class="field">
        <label for="clinicalHistory">Clinical History</label>
        <Textarea
          id="name"
          v-model.trim="visit.clinicalHistory"
          required="true"
          rows="3"
          cols="20"
          autofocus
          :class="{ 'p-invalid': submitted && !visit.clinicalHistory }"
        />
        <small v-if="submitted && !visit.clinicalHistory" class="p-error">Clinical History is required.</small>
      </div>
      <div class="field col">
        <label for="diagnosisName">Diagnosis Name</label>
        <MultiSelect
          v-model="selectedDiagnosises"
          :options="diagnosises"
          option-label="name"
          placeholder="Select Diagnosis"
          :filter="true"
          class="multiselect-custom"
        >
          <template #value="slotProps">
            <div v-for="option of slotProps.value" :key="option.id">
              <div>{{ option.name }}</div>
            </div>
            <template v-if="!slotProps.value || slotProps.value.length === 0">
              Select Diagnosis
            </template>
          </template>
          <template #option="slotProps">
            <div>
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </MultiSelect>
      </div>
      <div class="field col">
        <label for="medicineName">Medicine Name</label>
        <MultiSelect
          v-model="selectedMedicines"
          :options="medicines"
          option-label="name"
          placeholder="Select Medicines"
          :filter="true"
          class="multiselect-custom"
        >
          <template #value="slotProps">
            <div v-for="option of slotProps.value" :key="option.id">
              <div>{{ option.name }}</div>
            </div>
            <template v-if="!slotProps.value || slotProps.value.length === 0">
              Select Medicines
            </template>
          </template>
          <template #option="slotProps">
            <div>
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </MultiSelect>
      </div>

      <div class="field">
        <label for="description">Description</label>
        <Textarea id="description" v-model="visit.description" required="true" rows="3" cols="20" />
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
          @click="saveVisit"
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

.product-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
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
