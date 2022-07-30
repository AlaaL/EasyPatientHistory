/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/comma-dangle */
<script>
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import SpecialtyService from '../../../services/SpecialtyService'
import { useAuthStore } from '~/stores/auth.store'

const baseUrl = `${import.meta.env.VITE_API_URL}`

export default {
  setup () {
    return {
      v$: useVuelidate()
    };
  },
  data () {
    return {
      userInfo: {
        name: '',
        email: '',
        password: '',
        birthDate: null,
        gender: 'Male',
        address: '',
        phone: '',
        role: { name: 'Patient', id: 2 }
      },
      submitted: false,
      specialtyService: null,
      selectedSpecialty: null,
      specialties: null,
      clinicName: '',
      clinicAddress: '',
      clinicPhone: '',
      doctorId: -1
    };
  },
  validations () {
    return {
      userInfo: {
        name: {
          required
        },
        email: {
          required,
          email
        },
        password: {
          required
        },
        birthDate: {
          required
        },
        gender: {
          required
        },
        address: {
          required
        },
        phone: {
          required
        },
        role: {
          required
        },
      }
    };
  },
  created() {
    this.specialtyService = new SpecialtyService()

    $fetch(`${baseUrl}/api/profileById/${useAuthStore().user.user.id}`).then((r) => {
      this.userInfo = r
      if (r.doctor) {
        this.doctorId = r.doctor.doc_id
        this.selectedSpecialty.name = r.doctor.specialtyName
        this.clinicName = r.doctor.clinicName
        this.clinicAddress = r.doctor.clinicAddress
        this.clinicPhone = r.doctor.clinicPhone
      }
    })
  },
  mounted() {
    this.specialtyService.getSpecialties().then(data => this.specialties = data)
  },
  methods: {
    async handleSubmit () {
      this.submitted = true

      const isFormCorrect = await this.v$.$validate()

      if (!isFormCorrect) {

      }
      if (this.doctorId != -1) {
        $fetch(`http://127.0.0.1:8000/api/Doctors/${this.doctorId}`,
          {
            method: 'PUT',
            body: JSON.stringify(
              {
                description: 'description',
                specialtyName: this.selectedSpecialty.name,
                clinicName: this.clinicName,
                clinicAddress: this.clinicAddress,
                clinicPhone: this.clinicPhone
              }),
          })
      } else {
        $fetch('http://127.0.0.1:8000/api/Doctors',
          {
            method: 'POST',
            body: JSON.stringify(
              {
                description: 'description',
                user_id: useAuthStore().user.user.id,
                specialtyName: this.selectedSpecialty.name,
                clinicName: this.clinicName,
                clinicAddress: this.clinicAddress,
                clinicPhone: this.clinicPhone
            }),
          })
      }
    }
}
}
</script>

<template>
  <form @submit.prevent="handleSubmit()">
    <Panel header=" Doctor's Personal Information">
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
              (v$.userInfo.name.$invalid && submitted)
                || v$.userInfo.name.$pending.$response
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
              (v$.userInfo.email.$invalid && submitted)
                || v$.userInfo.email.$pending.$response
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
              (v$.userInfo.birthDate.$invalid && submitted)
                || v$.userInfo.birthDate.$pending.$response
            "
            class="p-error"
          >{{
            v$.userInfo.birthDate.required.$message.replace(
              "Value",
              "BirthDate",
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
              (v$.userInfo.phone.$invalid && submitted)
                || v$.userInfo.phone.$pending.$response
            "
            class="p-error"
          >{{
            v$.userInfo.phone.required.$message.replace("Value", "Phone")
          }}</small>
        </div>
      </div>
    </Panel>
    <Panel header="Clinic Information">
      <div class="p-fluid grid">
        <div class="field col-12">
          <Dropdown
            id="Specialty"
            v-model="selectedSpecialty"
            :options="specialties"
            option-label="name"
            :filter="true"
            placeholder="Select Specialty "
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
          <div class="field col-12">
            <span class="p-float-label">
              <InputText id="clinicName" v-model="clinicName" type="text" />
              <label for="clinicName">Clinic Name</label>
            </span>
          </div>
          <div class="field col-12">
            <span class="p-float-label">
              <InputText id="clinicAddress" v-model="clinicAddress" type="text" />
              <label for="clinicAddress">Clinic Address</label>
            </span>
          </div>
          <div class="field col-12">
            <span class="p-float-label">
              <InputText id="clinicPhone" v-model="clinicPhone" type="text" />
              <label for="clinicPhone">Clinic Phone</label>
            </span>
          </div>
        </div>
      </div>
    </panel>
    <Button type="submit" label="Save" class="w-full" />
  </form>
</template>
