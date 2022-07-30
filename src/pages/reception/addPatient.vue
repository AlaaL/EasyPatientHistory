<script>
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import PatientService from '../../../services/PatientService'
const baseUrl = `${import.meta.env.VITE_API_URL}`
export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      name: '',
      birthDate: null,
      gender: 'Male',
      address: '',
      phone: '',
      submitted: false,
      briefHistory: '',
      selectedBloodGroup: null,
      bloodGroups: [
        { bloodname: 'A+', value: 'A+' },
        { bloodname: 'A-', value: 'A-' },
        { bloodname: 'B+', value: 'B+' },
        { bloodname: 'B-', value: 'B-' },
        { bloodname: 'AB+', value: 'AB+' },
        { bloodname: 'AB-', value: 'AB-' },
        { bloodname: 'O+', value: 'O+' },
        { bloodname: 'O-', value: 'O-' },
      ],
      habit: '',
      foodAllergy: '',
      drugAllergy: '',
      patientService: null
    }
  },
  created() {
    this.patientService = new PatientService()
  },
  validations() {
    return {
      name: {
        required,
        },
      phone: {
        required,
        },
    }
  },
  methods: {
    async handleSubmit() {
      this.submitted = true

      const isFormCorrect = await this.v$.$validate()

      if (!isFormCorrect) {
        return;
      }

        let bDate = new Date(this.birthDate);

          bDate = bDate.getDate()+ '-' + bDate.getMonth() + '-' + bDate.getFullYear();

          console.log(bDate);

      await $fetch(`${baseUrl}/api/Patients`,
        {

          method: 'POST',
          body: JSON.stringify(
            {
              name: this.name,
              birthDate: bDate,
              gender: this.gender,
              address: this.address,
              phone: this.phone,
              habit: this.habit,
              foodAllergy: this.foodAllergy,
              drugAllergy: this.drugAllergy,
              blood: this.selectedBloodGroup.value,
              briefHistory: this.briefHistory
            })
        })
    },
    },
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <Panel header=" Patient's Personal Information">
      <div class="p-fluid grid">
        <div class="field col-12">
          <span class="p-float-label">
            <InputText
              id="fullName"
              v-model="name"
              type="text"
              :class="{ 'p-invalid': v$.name.$invalid && submitted }"
            />
            <label for="fullName">Full Name</label>
          </span>
          <small
            v-if="
              (v$.name.$invalid && submitted)
                || v$.name.$pending.$response
            "
            class="p-error"
          >{{
            v$.name.required.$message.replace("Value", "Name")
          }}</small>
        </div>
        <div class="field col-12">
          <span class="p-float-label">
            <Calendar
              id="birthDate"
              v-model="birthDate"
              date-format="dd/mm/yy"
            />
            <label for="birthDate">Birth Date</label>
          </span>
        </div>
        <div class="field" style="margin-left: 15px">
          <label>Gender</label>
          <div class="field-radiobutton col-12">
            <RadioButton
              id="gender-male"
              v-model="gender"
              name="gender"
              value="Male"
            />
            <label for="gender-male">Male</label>
            <RadioButton
              id="gender-female"
              v-model="gender"
              name="gender"
              value="Female"
              style="margin-left: 10px"
            />
            <label for="gender-female">Female</label>
          </div>
        </div>
        <div class="field col-12">
          <span class="p-float-label">
            <Textarea
              id="address"
              v-model="address"
              rows="2"
            />
            <label for="address">address</label>
          </span>
        </div>
        <div class="field col-12">
          <span class="p-float-label">
            <InputText
              id="phone"
              v-model="phone"
              type="text"
              :class="{ 'p-invalid': v$.phone.$invalid && submitted }"
            />
            <label for="phone">Phone</label>
          </span>
          <small
            v-if="
              (v$.phone.$invalid && submitted)
                || v$.phone.$pending.$response
            "
            class="p-error"
          >{{
            v$.phone.required.$message.replace("Value", "Phone")
          }}</small>
        </div>
      </div>
    </Panel>
    <Panel header="Medical Brief">
      <div class="card p-fluid">
        <div class="formgrid grid">
          <div class="field col">
            <label for="bloodGroup">Blood Group</label>
            <Dropdown
              v-model="selectedBloodGroup"
              :options="bloodGroups"
              option-label="bloodname"
              placeholder="Select a Blood group"
            />
          </div>

          <div class="field col-12">
            <span class="p-float-label">
              <Textarea id="briefHistory" v-model="briefHistory" rows="2" />
              <label for="briefHistory">brief History</label>
            </span>
          </div>
          <div class="field col-12">
            <span class="p-float-label">
              <Textarea id="habit" v-model="habit" rows="2" />
              <label for="habit">Habits</label>
            </span>
          </div>
          <div class="field col-12">
            <span class="p-float-label">
              <Textarea id="foodAllergy" v-model="foodAllergy" rows="2" />
              <label for="foodAllergy">Food Allergy</label>
            </span>
          </div>
          <div class="field col-12">
            <span class="p-float-label">
              <Textarea id="drugAllergy" v-model="drugAllergy" rows="2" />
              <label for="drugAllergy">drug Allergy</label>
            </span>
          </div>

          <Button type="submit" label="Save" class="w-full" />
        </div>
      </div>
    </Panel>
  </form>
</template>
