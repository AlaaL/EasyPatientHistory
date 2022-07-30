<script lang="ts">
import DiagnosisService from '../../../services/DiagnosisService';
import { FilterMatchMode } from 'primevue/api'
export default {
  data () {
    return {
      Diagnosises: null,
      DiagnosisDialog: false,
      deleteDiagnosisDialog: false,
      deleteDiagnosisesDialog: false,
      diagnosis: {},
      selectedDiagnosises: null,
      filters: {},
      submitted: false
    }
  },
  diagnosisService: null,
  created() {
    this.diagnosisService = new DiagnosisService()
    this.initFilters()
  },
  mounted() {
    this.diagnosisService.getDiagnosises().then(data => this.Diagnosises = data)
  },
  methods: {
    openNew() {
      this.diagnosis = {}
      this.submitted = false
      this.DiagnosisDialog = true
    },
    hideDialog() {
      this.DiagnosisDialog = false
      this.submitted = false
    },
    saveDiagnosis() {
      this.submitted = true

      if (this.diagnosis.name.trim())
      {
        if (this.diagnosis.diagn_id) {
          this.Diagnosises[this.findIndexById(this.diagnosis.diagn_id)] = this.diagnosis
          $fetch(`http://127.0.0.1:8000/api/Diagnsises/${this.diagnosis.diagn_id}`, {
            method: 'PUT',
            body: JSON.stringify({
              name: this.diagnosis.name,
              description: this.diagnosis.description
            })
          })
          this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Diagnosis Updated', life: 3000 })
        }
        else {
          this.diagnosis.diagn_id = this.createId()
          this.Diagnosises.push(this.diagnosis)
          $fetch('http://127.0.0.1:8000/api/Diagnsises', {
            method: 'POST',
            body: JSON.stringify({
              name: this.diagnosis.name,
              description: this.diagnosis.description,
            }),
          })
          this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Diagnosis Created', life: 3000 })
        }

        this.DiagnosisDialog = false
        this.diagnosis = {}
      }
    },
    editDiagnosis(diagnosis) {
      this.diagnosis = { ...diagnosis }
      this.DiagnosisDialog = true
    },
    confirmDeleteDiagnosis(diagnosis) {
      this.diagnosis = diagnosis
      this.deleteDiagnosisDialog = true
    },
    deleteDiagnosis() {
      this.Diagnosises = this.Diagnosises.filter(val => val.diagn_id !== this.diagnosis.diagn_id)
      $fetch(`http://127.0.0.1:8000/api/Diagnosises/${this.diagnosis.diagn_id}`, {
        method: 'DELETE'
      })
      this.deleteDiagnosisDialog = false
      this.diagnosis = {}
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Diagnosis Deleted', life: 3000 })
    },
    findIndexById(id) {
      let index = -1
      for (let i = 0; i < this.Diagnosises.length; i++) {
        if (this.Diagnosises[i].diagn_id === id) {
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
      this.deleteDiagnosisesDialog = true
    },
    deleteSelectedDiagnosises() {
      this.Diagnosises = this.Diagnosises.filter(val => !this.selectedDiagnosises.includes(val))
      this.deleteDiagnosisesDialog = false
      this.selectedDiagnosises = null
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Diagnosises Deleted', life: 3000 })
    },
    initFilters () {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
      }
    },
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
            :disabled="!selectedDiagnosises || !selectedDiagnosises.length"
            @click="confirmDeleteSelected"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        v-model:selection="selectedDiagnosises"
        :value="Diagnosises"
        data-key="diagn_id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rows-per-page-options="[5, 10, 25]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} Diagnosises"
        responsive-layout="scroll"
      >
        <template #header>
          <div
            class="table-header flex flex-column md:flex-row md:justiify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center">
              Manage Diagnosises
            </h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
        </template>

        <Column
          selection-mode="multiple"
          style="width: 3rem"
          :exportable="false"
        />
        <Column
          field="name"
          header="Name"
          :sortable="true"
          style="min-width: 16rem"
        />
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editDiagnosis(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="confirmDeleteDiagnosis(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="DiagnosisDialog"
      :style="{ width: '450px' }"
      header="Diagnosis Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" v-model.trim="diagnosis.name" required="true" autofocus :class="{'p-invalid': submitted && !diagnosis.name}" />
        <small class="p-error" v-if="submitted && !diagnosis.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="description">Description</label>
        <Textarea id="description" v-model="diagnosis.description" required="true" rows="3" cols="20" />
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
          @click="saveDiagnosis"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteDiagnosisDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="diagnosis">Are you sure you want to delete <b>{{diagnosis.name}}</b>?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteDiagnosisDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteDiagnosis"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteDiagnosisesDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="diagnosis">Are you sure you want to delete the selected Diagnosises?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteDiagnosisesDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedDiagnosises"
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
