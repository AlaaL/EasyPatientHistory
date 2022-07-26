<script>
import MedicineService from '../../../services/MedicineService';
export default {
  data () {
    return {
      medicines: null,
      medicineDialog: false,
      deleteMedicineDialog: false,
      deleteMedicinesDialog: false,
      medicine: {},
      selectedMedicines: null,
      filters: {},
      submitted: false
    }
  },
  medicineService: null,
  created() {
    this.medicineService = new MedicineService()
  },
  mounted() {
    this.medicineService.getMedicines().then(data => this.medicines = data)
  },
  methods: {
    openNew() {
      this.medicine = {}
      this.submitted = false
      this.medicineDialog= true
    },
    hideDialog() {
      this.medicineDialog = false
      this.submitted = false
    },
    saveMedicine() {
      this.submitted = true

      if (this.medicine.name.trim())
      {
        if (this.medicine.id) {
          this.medicine.caliber = this.medicine.caliber.value ? this.medicine.caliber.value : this.medicine.caliber;
          this.medicine.type = this.medicine.type.value ? this.medicine.type.value : this.medicine.type;
          this.medicine.manufactureCompany = this.medicine.manufactureCompany.value ? this.medicine.manufactureCompany.value : this.medicine.manufactureCompany;
          this.medicine.composition = this.medicine.composition.value ? this.medicine.composition.value : this.medicine.composition;
          this.medicines[this.findIndexById(this.medicine.id)] = this.medicine
          this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'medicine Updated', life: 3000 })
        }
        else {
          this.medicine.id = this.createId()
          this.medicines.push(this.medicine)
          this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'medicine Created', life: 3000 })
        }

        this.medicineDialog = false
        this.medicine = {}
      }
    },
    editMedicine(medicine) {
      this.medicine = { ...medicine }
      this.medicineDialog = true
    },
    confirmDeleteMedicine(medicine) {
      this.medicine = medicine
      this.deleteMedicineDialog = true
    },
    deleteMedicine() {
      this.medicines = this.medicines.filter(val => val.id !== this.medicine.id)
      this.deleteMedicineDialog = false
      this.medicine = {}
      this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Medicine Deleted', life: 3000 })
    },
    findIndexById(id) {
      let index = -1
      for (let i = 0; i < this.medicines.length; i++) {
        if (this.medicines[i].id === id) {
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
      this.deleteMedicinesDialog = true
    },
    deleteSelectedMedicines() {
      this.medicines = this.medicines.filter(val => !this.selectedMedicines.includes(val))
      this.deleteMedicinesDialog = false
      this.selectedMedicines = null
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
            :disabled="!selectedMedicines || !selectedMedicines.length"
            @click="confirmDeleteSelected"
          />
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        v-model:selection="selectedMedicines"
        :value="medicines"
        data-key="id"
        :paginator="true"
        :rows="10"
        paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rows-per-page-options="[5, 10, 25]"
        current-page-report-template="Showing {first} to {last} of {totalRecords} Medicines"
        responsive-layout="scroll"
      >
        <template #header>
          <div
            class="table-header flex flex-column md:flex-row md:justiify-content-between"
          >
            <h5 class="mb-2 md:m-0 p-as-md-center">
              Manage Medicines
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
          field="name"
          header="Name"
          :sortable="true"
          style="min-width: 16rem"
        />
        <Column
          field="caliber"
          header="Caliber"
          :sortable="true"
          style="min-width: 8rem"
        />
        <Column
          field="type"
          header="Type"
          :sortable="true"
          style="min-width: 10rem"
        />
        <Column
          field="manufactureCompany"
          header="Manufacture Company"
          :sortable="true"
          style="min-width: 16rem"
        />
        <Column
          field="composition"
          header="Composition"
          :sortable="true"
          style="min-width: 16rem"
        />


        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="editMedicine(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-warning"
              @click="confirmDeleteMedicine(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="medicineDialog"
      :style="{ width: '450px' }"
      header="Medicine Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Name</label>
        <InputText id="name" v-model.trim="medicine.name" required="true" autofocus :class="{'p-invalid': submitted && !medicine.name}" />
        <small class="p-error" v-if="submitted && !medicine.name">Name is required.</small>
      </div>
      <div class="field">
        <label for="caliber">Caliber</label>
        <InputText id="caliber" v-model.trim="medicine.caliber" required="true" autofocus :class="{'p-invalid': submitted && !medicine.caliber}" />
        <small class="p-error" v-if="submitted && !medicine.caliber">Caliber is required.</small>
      </div>
      <div class="field">
        <label for="type">Type</label>
        <InputText id="type" v-model.trim="medicine.type" required="true" autofocus :class="{'p-invalid': submitted && !medicine.type}" />
        <small class="p-error" v-if="submitted && !medicine.type">Type is required.</small>
      </div>
      <div class="field">
        <label for="manufactureCompany">Manufacture Company</label>
        <InputText id="manufactureCompany" v-model.trim="medicine.manufactureCompany" required="true" autofocus :class="{'p-invalid': submitted && !medicine.manufactureCompany}" />
        <small class="p-error" v-if="submitted && !medicine.manufactureCompany">Company is required.</small>
      </div>
      <div class="field">
        <label for="composition">Composition</label>
        <InputText id="composition" v-model.trim="medicine.composition" required="true" rows="3" cols="20" />
      </div>

      <div class="field">
        <label for="description">Description</label>
        <Textarea id="description" v-model="medicine.description" required="true" rows="3" cols="20" />
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
          @click="saveMedicine"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteMedicineDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="medicine">Are you sure you want to delete <b>{{medicine.name}}</b>?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteMedicineDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteMedicine"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteMedicinesDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="medicine">Are you sure you want to delete the selected Medicines?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteMedicinesDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedMedicines"
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
