/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/comma-dangle */
<script>
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import DiagnosisService from '../../../services/DiagnosisService'
import MedicineService from '../../../services/MedicineService';
export default {
  setup () {
    return {
      v$: useVuelidate()
    };
  },
  data () {
    return {
      diagnosisService: null,
      medicineService: null,
      selectDoctor: null,
      doctors: [
        { docname: 'doctor1', value: 'doc1' },
        { docname: 'doctor2', value: 'doc2' },
        { docname: 'doctor3', value: 'doc3' }
      ],
      selectPatient: null,
      patients: [
        { patname: 'patient1', value: 'pa1' },
        { patname: 'patient2', value: 'pa2' },
        { patname: 'patient3', value: 'pa3' }
      ],
      selectReception: null,
      receptions: [
        { recename: 'reception1', value: 'recep1' },
        { recename: 'reception2', value: 'recep2' },
        { recename: 'reception3', value: 'recep3' }
      ],
      selectedDiagnosises: null,
      diagnosises: null,
      selectedMedicines: null,
      medicines: null,
      visitTime: null,
      clinicalHistory: ''
    };
  },
  validations () {
    return {
      visitTime: {
        required
      },
      clinicalHistory: {
        required
      },
      selectPatient: {
        required
      },
      selectDoctor: {
        required
      },
      selectReception: {
        required
      },
    }
  },
  created () {
    this.diagnosisService = new DiagnosisService()
    this.medicineService = new MedicineService()
  },
  mounted () {
    this.diagnosisService.getDiagnosises().then(data => this.diagnosises = data)
    this.medicineService.getMedicines().then(data => this.medicines = data)
  },
  methods: {
    async handleSubmit () {
      this.submitted = true

      const isFormCorrect = await this.v$.$validate()

      if (!isFormCorrect) {

      }
    },
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit()">
    <div class="p-fluid grid">
      <div class="field col-12">
        <span class="p-float-label">
          <Dropdown
            id="doctorName"
            v-model="selectDoctor"
            :options="doctors"
            option-label="docname"
            :class="{ 'p-invalid': v$.selectDoctor.$invalid && submitted }"
          />
          <label for="doctorName">Doctor Name</label>
        </span>
        <small
          v-if="
            (v$.selectDoctor.$invalid && submitted) || v$.selectDoctor.$pending.$response
          "
          class="p-error"
        >{{
          v$.selectDoctor.required.$message.replace("Value", "selectDoctor")
        }}</small>
      </div>
      <div class="field col-12">
        <span class="p-float-label">
          <Dropdown
            id="patientName"
            v-model="selectPatient"
            :options="patients"
            option-label="patname"
            :class="{ 'p-invalid': v$.selectPatient.$invalid && submitted }"
          />
          <label for="patientName">Patient Name</label>
        </span>
        <small
          v-if="
            (v$.selectPatient.$invalid && submitted)
              || v$.selectPatient.$pending.$response
          "
          class="p-error"
        >{{
          v$.selectPatient.required.$message.replace("Value", "selectPatient")
        }}</small>
      </div>
      <div class="field col-12">
        <span class="p-float-label">
          <Dropdown
            id="receptionName"
            v-model="selectReception"
            :options="receptions"
            option-label="recename"
            :class="{ 'p-invalid': v$.selectReception.$invalid && submitted }"
          />
          <label for="receptionName">Reception Name</label>
        </span>
        <small
          v-if="
            (v$.selectReception.$invalid && submitted)
              || v$.selectReception.$pending.$response
          "
          class="p-error"
        >{{
          v$.selectReception.required.$message.replace("Value", "selectReception")
        }}</small>
      </div>
      <div class="field col-12">
        <span class="p-float-label">
          <Calendar
            id="visitTime"
            v-model="visitTime"
            :show-time="true"
            :hour-format="12"
            :class="{
              'p-invalid': v$.visitTime.$invalid && submitted,
            }"
          />
          <label for="visitTime">Visit Time </label>
        </span>
        <small
          v-if="
            (v$.visitTime.$invalid && submitted)
              || v$.visitTime.$pending.$response
          "
          class="p-error"
        >{{
          v$.visitTime.required.$message.replace(
            "Value",
            "VisitTime",
          )
        }}</small>
      </div>
      <div class="field col-12">
        <span class="p-float-label">
          <Textarea
            id="clinicalHistory"
            v-model="clinicalHistory"
            rows="2"
            :class="{ 'p-invalid': v$.clinicalHistory.$invalid && submitted }"
          />
          <label for="clinicalHistory">Clinical History</label>
        </span>
        <small
          v-if="
            (v$.clinicalHistory.$invalid && submitted) || v$.clinicalHistory.$pending.$response
          "
          class="p-error"
        >{{
          v$.clinicalHistory.required.$message.replace("Value", "clinicalHistory")
        }}</small>
      </div>
    </div>
    <div class="card p-fluid">
      <div class="formgrid grid">
        <div class="field col">
          <label for="diagnosisName">Diagnosis Name</label>
          <MultiSelect v-model="selectedDiagnosises" :options="diagnosises" optionLabel="name" placeholder="Select Diagnosis" :filter="true" class="multiselect-custom">
            <template #value="slotProps">
              <div v-for="option of slotProps.value" :key="option.id">
                <div>{{option.name}}</div>
              </div>
              <template v-if="!slotProps.value || slotProps.value.length === 0">
                Select Diagnosis
              </template>
            </template>
            <template #option="slotProps">
              <div>
                <div>{{slotProps.option.name}}</div>
              </div>
            </template>
          </MultiSelect>
        </div>

        <div class="field col">
          <label for="medicineName">Medicine Name</label>
          <MultiSelect v-model="selectedMedicines" :options="medicines" optionLabel="name" placeholder="Select Medicines" :filter="true" class="multiselect-custom">
            <template #value="slotProps">
              <div v-for="option of slotProps.value" :key="option.id">
                <div>{{option.name}}</div>
              </div>
              <template v-if="!slotProps.value || slotProps.value.length === 0">
                Select Medicines
              </template>
            </template>
            <template #option="slotProps">
              <div>
                <div>{{slotProps.option.name}}</div>
              </div>
            </template>
          </MultiSelect>
        </div>

        <Button type="submit" label="Save" class="w-full" />
      </div>
    </div>
  </form>
</template>
