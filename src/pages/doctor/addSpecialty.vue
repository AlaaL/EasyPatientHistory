
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
      name: '',
      address: '',
      phone: '',
    };
  },
  validations () {
    return {
      name: {
        required
      },
      address: {
        required
      },
      phone: {
        required
      },
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit()">
    <div class="p-fluid grid">
      <div class="field col-12">
        <span class="p-float-label">
          <InputText
            id="ClinicName"
            v-model="name"
            type="text"
            :class="{ 'p-invalid': v$.name.$invalid && submitted }"
          />
          <label for="ClinicName">Clinic Name</label>
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
          <Textarea
            id="address"
            v-model="address"
            rows="2"
            :class="{ 'p-invalid': v$.address.$invalid && submitted }"
          />
          <label for="address">Address</label>
        </span>
        <small
          v-if="
            (v$.address.$invalid && submitted) || v$.address.$pending.$response
          "
          class="p-error"
        >{{
          v$.address.required.$message.replace("Value", "Address")
        }}</small>
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
    <div>
      <Button type="submit" label="Save" class="w-full" />
    </div>
  </form>
</template>
