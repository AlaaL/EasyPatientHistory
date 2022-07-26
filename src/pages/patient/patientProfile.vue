<script>
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

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
      briefHistory: '',
      selectBloodGroup: null,
      bloodGroups: [
        { bloodname: 'A+', value: 'A+' },
        { bloodname: 'A-', value: 'A-' },
        { bloodname: 'B+', value: 'B+' },
        { bloodname: 'B-', value: 'B-' },
        { bloodname: 'AB+', value: 'AB+' },
        { bloodname: 'AB-', value: 'AB-' },
        { bloodname: 'O+', value: 'O+' },
        { bloodname: 'O-', value: 'O-' }
      ],
      habits: '',
      foodAllergy: '',
      drugAllergy: '',
    }
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
  methods: {
    async handleSubmit () {
      this.submitted = true

      const isFormCorrect = await this.v$.$validate()

      // eslint-disable-next-line no-empty
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
            (v$.userInfo.address.$invalid && submitted)
              || v$.userInfo.address.$pending.$response
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
    <div class="card p-fluid">
      <div class="formgrid grid">
        <div class="field col">
          <label for="bloodGroup">Blood Group</label>
          <Dropdown
            v-model="selectBloodGroup"
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
            <Textarea id="habits" v-model="habits" rows="2" />
            <label for="habits">Habits</label>
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
  </form>
</template>
