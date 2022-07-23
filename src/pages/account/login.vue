<script setup>
definePageMeta({
  layout: 'empty'
})
</script>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {

  },
};
</script>

<template>
  <div
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    data-v-05c8386e=""
  >
    <div
      class="grid justify-content-center p-2 lg:p-0"
      data-v-05c8386e=""
      style="min-width: 80%"
    >
      <div
        class="col-12 xl:col-6"
        data-v-05c8386e=""
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
          <div class="text-center mb-5" data-v-05c8386e="">
            <img
              src="~/assets/logo.png"
              alt="Image"
              height="200"
              class="mb-3"
              data-v-05c8386e=""
            >
            <div class="text-900 text-3xl font-medium mb-3" data-v-05c8386e="">
              Easy Patient History
            </div>
            <span class="text-600 font-medium" data-v-05c8386e="">
              Sign in to continue <span class="text-900 font-medium">Or</span>
              <NuxtLink
                v-ripple
                :to='"/account/register"'
                exact
              >
                Register
              </NuxtLink>
            </span>
          </div>
          <div class="w-full md:w-10 mx-auto" data-v-05c8386e="">
            <label
              for="email1"
              class="block text-900 text-xl font-medium mb-2"
              data-v-05c8386e=""
            >Email</label>
            <InputText type="text" placeholder="Email" class="w-full mb-3 w-full mb-3" />
            <label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              data-v-05c8386e=""
            >Password</label>
            <Password v-model="value" class="w-full mb-3" input-class="w-full" :feedback="false" />
            <Button label="Sign In" class="w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
