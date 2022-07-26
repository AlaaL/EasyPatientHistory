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
      selectDoctor: null,
      doctors: [
        { docname: 'doctor1', value: 'doc1' },
        { docname: 'doctor2', value: 'doc2' },
        { docname: 'doctor3', value: 'doc3' },
      ],
      selectPatient: null,
      patients: [
        { patname: 'patient1', value: 'pa1' },
        { patname: 'patient2', value: 'pa2' },
        { patname: 'patient3', value: 'pa3' },
      ],
      selectReception: null,
      receptions: [
        { recename: 'reception1', value: 'recep1' },
        { recename: 'reception2', value: 'recep2' },
        { recename: 'reception3', value: 'recep3' },
      ],
      appointmentTime: null,
    };
  },
  validations() {
    return {
      appointmentTime: {
        required,
      },
      selectPatient: {
        required,
      },
      selectDoctor: {
        required,
      },
      selectReception: {
        required,
      },
    };
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit()">
    <div class="p-fluid grid">
      <div class="field col-12">
        <span class="p-float-label">
          <Dropdown id="doctorName"
                    v-model="selectDoctor"
                    :options="doctors"
                    option-label="docname"
                    :class="{ 'p-invalid': v$.selectDoctor.$invalid && submitted }" />
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
          <Dropdown id="patientName"
                    v-model="selectPatient"
                    :options="patients"
                    option-label="patname"
                    :class="{ 'p-invalid': v$.selectPatient.$invalid && submitted }" />
          <label for="patientName">Patient Name</label>
        </span>
        <small
          v-if="
            (v$.selectPatient.$invalid && submitted) ||
              v$.selectPatient.$pending.$response
          "
          class="p-error"
        >{{
          v$.selectPatient.required.$message.replace("Value", "selectPatient")
        }}</small>
      </div>
      <div class="field col-12">
        <span class="p-float-label">
          <Dropdown id="receptionName"
                    v-model="selectReception"
                    :options="receptions"
                    option-label="recename"
                    :class="{ 'p-invalid': v$.selectReception.$invalid && submitted }" />
          <label for="receptionName">Reception Name</label>
        </span>
        <small
          v-if="
            (v$.selectReception.$invalid && submitted) ||
              v$.selectReception.$pending.$response
          "
          class="p-error"
        >{{
          v$.selectReception.required.$message.replace("Value", "selectReception")
        }}</small>
      </div>
      <div class="field col-12">
        <span class="p-float-label">
          <Calendar
            id="appointmentTime"
            v-model="appointmentTime"
            :show-time="true"
            :hour-format="12"
            :class="{
              'p-invalid': v$.appointmentTime.$invalid && submitted,
            }"
          />
          <label for="appointmentTime">appointment Time </label>
        </span>
        <small
          v-if="
            (v$.appointmentTime.$invalid && submitted) ||
              v$.appointmentTime.$pending.$response
          "
          class="p-error"
        >{{
          v$.appointmentTime.required.$message.replace(
            "Value",
            "appointmentTime"
          )
        }}</small>
      </div>
    </div>
    <div class="card p-fluid">
      <Button type="submit" label="Save" class="w-full" />
    </div>
  </form>
</template>
