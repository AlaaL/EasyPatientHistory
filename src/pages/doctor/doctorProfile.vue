/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/comma-dangle */
<script>
import { email, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      userInfo: {
        name: '',
        email: '',
        password: '',
        birthDate: null,
        gender: 'Male',
        address: '',
        phone: '',
        role: { name: 'Patient', id: 2 },
      },
      submitted: false,
      selectSpecialty: null,
      specialties: [
        { specname: 'جراحة عظمية', value: 'NY' },
        { specname: 'داخلية عصبية', value: 'RM' },
        { specname: 'أمراض جهاز الهضم ', value: 'LDN' },
        { specname: 'اطفال', value: 'IST' },
        { specname: 'نسائية', value: 'PRS' },
      ],
      selectedClinics: null,
      clinics: [
        { cliname: 'المركز الطبي', value: 'NY' },
        { cliname: 'العيادة الشاملة', value: 'RM' },
        { cliname: 'العيادة التخصصية', value: 'LDN' },
        { cliname: 'المركز الطبي الدولي', value: 'IST' },
        { cliname: 'العيادة النسائية', value: 'PRS' },
      ],
    };
  },
  validations() {
    return {
      userInfo: {
        name: {
          required,
        },
        email: {
          required,
          email,
        },
        password: {
          required,
        },
        birthDate: {
          required,
        },
        gender: {
          required,
        },
        address: {
          required,
        },
        phone: {
          required,
        },
        role: {
          required,
        },
      },
    };
  },
  methods: {
    async handleSubmit() {

      this.submitted = true;

      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) {
        return;
      }
    },
  },
};
</script>

<template>

  <form @submit.prevent="handleSubmit()">
    <Panel header="personal information">
      <div class="p-fluid grid">
        <div class="field col-12">
          <span class="p-float-label">
            <InputText
              id="fullName"
              v-model="userInfo.name"
              type="text"
              :class="{ 'p-invalid': v$.userInfo.name.$invalid && submitted }"
            />
            <label for="fullName">Full Name</label>
          </span>
          <small
            v-if="
              (v$.userInfo.name.$invalid && submitted) ||
                v$.userInfo.name.$pending.$response
            "
            class="p-error"
          >{{
            v$.userInfo.name.required.$message.replace("Value", "Name")
          }}</small>
        </div>
        <div class="field col-12">
          <span class="p-float-label">
            <InputText
              id="email"
              v-model="userInfo.email"
              type="text"
              :class="{ 'p-invalid': v$.userInfo.email.$invalid && submitted }"
            />
            <label for="email">Email</label>
          </span>
          <small
            v-if="
              (v$.userInfo.email.$invalid && submitted) ||
                v$.userInfo.email.$pending.$response
            "
            class="p-error"
          >{{
            v$.userInfo.email.required.$message.replace("Value", "Email")
          }}</small>
        </div>
        <div class="field col-12">
          <span class="p-float-label">
            <Calendar
              id="birthDate"
              v-model="userInfo.birthDate"
              date-format="dd/mm/yy"
              :class="{
                'p-invalid': v$.userInfo.birthDate.$invalid && submitted,
              }"
            />
            <label for="birthDate">Birth Date</label>
          </span>
          <small
            v-if="
              (v$.userInfo.birthDate.$invalid && submitted) ||
                v$.userInfo.birthDate.$pending.$response
            "
            class="p-error"
          >{{
            v$.userInfo.birthDate.required.$message.replace(
              "Value",
              "BirthDate"
            )
          }}</small>
        </div>
        <div class="field" style="margin-left: 15px">
          <label>Gender</label>
          <div class="field-radiobutton col-12">
            <RadioButton
              id="gender-male"
              v-model="userInfo.gender"
              name="gender"
              value="Male"
            />
            <label for="gender-male">Male</label>
            <RadioButton
              id="gender-female"
              v-model="userInfo.gender"
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
              v-model="userInfo.address"
              rows="2"
              :class="{ 'p-invalid': v$.userInfo.address.$invalid && submitted }"
            />
            <label for="address">address</label>
          </span>
          <small
            v-if="
              (v$.userInfo.address.$invalid && submitted) || v$.userInfo.address.$pending.$response
            "
            class="p-error"
          >{{
            v$.userInfo.address.required.$message.replace("Value", "Address")
          }}</small>
        </div>
        <div class="field col-12">
          <span class="p-float-label">
            <InputText
              id="phone"
              v-model="userInfo.phone"
              type="text"
              :class="{ 'p-invalid': v$.userInfo.phone.$invalid && submitted }"
            />
            <label for="phone">Phone</label>
          </span>
          <small
            v-if="
              (v$.userInfo.phone.$invalid && submitted) ||
                v$.userInfo.phone.$pending.$response
            "
            class="p-error"
          >{{
            v$.userInfo.phone.required.$message.replace("Value", "Phone")
          }}</small>
        </div>
      </div>
    </Panel>
    <Panel header="Specialty and clinics">
      <div class="p-fluid grid">
        <div class="field col-12">
          <span class="p-float-label">
            <Dropdown id= "Specialty" v-model="selectSpecialty" :options="specialties" option-label="specname" />
            <label for="Specialty">Specialty Name</label>
          </span>
        </div>
        <div class="field col-12">
          <span class="p-float-label">
            <MultiSelect id="clinicname" v-model="selectedClinics" :options="clinics" option-label="cliname" />
            <label for="clinicname">Clinics Name</label>
          </span>
        </div>
      </div>
      <div>
        <Button type="submit" label="Save" class="w-full" />
      </div>
    </Panel>
  </form>
</template>
