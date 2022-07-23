<script setup>


</script>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

definePageMeta({
  layout: "empty",
});

export default {
   setup () {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      userInfo: {
        name: "",
        email: "",
        password: "",
        birthDate: null,
        gender: 'Male',
        address: '',
        phone: '',
        role: {name: 'Patient', id: 2},
      },
      submitted: false,
      roles: [
        {name: 'Doctor', id: 1},
        {name: 'Patient', id: 2},
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
  <div
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div
        class="col-12 xl:col-6"
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color),
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="h-full w-full m-0 py-7 px-4"
          data-v-05c8386e=""
          style="
            border-radius: 53px;
            background: linear-gradient(
              180deg,
              var(--surface-50) 38.9%,
              var(--surface-0)
            );
          "
        >
          <div class="text-center mb-5">
            <img
              src="~/assets/logo.png"
              alt="Image"
              height="200"
              class="mb-3"
            />
            <div class="text-900 text-3xl font-medium mb-3">
              Easy Patient History
            </div>
            <span class="text-600 font-medium">
              If you already have an account
              <NuxtLink v-ripple to="/account/login" exact> Login </NuxtLink>
            </span>
          </div>
          <div class="w-full md:w-10 mx-auto">
            <form @submit.prevent="handleSubmit()">
              <div class="p-fluid grid">
                <div class="field col-12">
                  <span class="p-float-label">
                    <InputText
                      id="fullName"
                      v-model="userInfo.name"
                      type="text"
                      :class="{'p-invalid':v$.userInfo.name.$invalid && submitted}"
                    />
                    <label for="fullName">Full Name</label>
                  </span>
                  <small v-if="(v$.userInfo.name.$invalid && submitted) || v$.userInfo.name.$pending.$response" class="p-error">{{v$.userInfo.name.required.$message.replace('Value', 'Name')}}</small>
                </div>
                <div class="field col-12">
                  <span class="p-float-label">
                    <InputText
                      id="email"
                      v-model="userInfo.email"
                      type="text"
                      :class="{'p-invalid':v$.userInfo.email.$invalid && submitted}"
                    />
                    <label for="email">Email</label>
                  </span>
                  <small v-if="(v$.userInfo.email.$invalid && submitted) || v$.userInfo.email.$pending.$response" class="p-error">{{v$.userInfo.email.required.$message.replace('Value', 'Email')}}</small>
                </div>
                <div class="field col-12">
                  <span class="p-float-label">
                    <Password id="password" v-model="userInfo.password"
                      :class="{'p-invalid':v$.userInfo.password.$invalid && submitted}" />
                    <label for="password">Password</label>
                  </span>
                  <small v-if="(v$.userInfo.password.$invalid && submitted) || v$.userInfo.password.$pending.$response" class="p-error">{{v$.userInfo.password.required.$message.replace('Value', 'Password')}}</small>
                </div>
                <div class="field col-12">
                  <span class="p-float-label">
                    <Calendar
                      id="birthDate"
                      v-model="userInfo.birthDate"
                      date-format="dd/mm/yy"
                      :class="{'p-invalid':v$.userInfo.birthDate.$invalid && submitted}"
                    />
                    <label for="birthDate">Birth Date</label>
                  </span>
                  <small v-if="(v$.userInfo.birthDate.$invalid && submitted) || v$.userInfo.birthDate.$pending.$response" class="p-error">{{v$.userInfo.birthDate.required.$message.replace('Value', 'BirthDate')}}</small>
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
                      :class="{'p-invalid':v$.userInfo.address.$invalid && submitted}"
                    />
                    <label for="address">address</label>
                  </span>
                  <small v-if="(v$.userInfo.address.$invalid && submitted) || v$.userInfo.address.$pending.$response" class="p-error">{{v$.userInfo.address.required.$message.replace('Value', 'Address')}}</small>
                </div>
                <div class="field col-12">
                  <span class="p-float-label">
                    <InputText
                      id="phone"
                      v-model="userInfo.phone"
                      type="text"
                      :class="{'p-invalid':v$.userInfo.phone.$invalid && submitted}"
                    />
                    <label for="phone">Phone</label>
                  </span>
                  <small v-if="(v$.userInfo.phone.$invalid && submitted) || v$.userInfo.phone.$pending.$response" class="p-error">{{v$.userInfo.phone.required.$message.replace('Value', 'Phone')}}</small>
                </div>

                <div class="field col-12">
                  <span class="p-float-label">
                    <Dropdown
                      v-model="userInfo.role"
                      :options="roles"
                      optionLabel="name"
                      id="role"
                      placeholder="Select your role"
                      :class="{'p-invalid':v$.userInfo.role.$invalid && submitted}"
                      />
                    <label for="role">I am a </label>
                  </span>
                  <small v-if="(v$.userInfo.role.$invalid && submitted) || v$.userInfo.role.$pending.$response" class="p-error">{{v$.userInfo.role.required.$message.replace('Value', 'Role')}}</small>
                </div>
                <Button type="submit" label="Register" class="w-full" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
