<template>
  <div class="layout-topbar">
    <NuxtLink to="/" class="layout-topbar-logo">
      <img alt="Logo" src="~/assets/logo.png">
      <span>Easy Patient History</span>
    </NuxtLink>
    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
      <i class="pi pi-bars" />
    </button>

    <button
      v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein',
                      leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}"
      class="p-link layout-topbar-menu-button layout-topbar-button"
    >
      <i class="pi pi-ellipsis-v" />
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <div style="display:flex; align-items: center">
        <span>Welcome {{getUserName()}}</span>
      </div>
      <li>
        <button class="p-link layout-topbar-button" label="Toggle" @click="profileToggle" aria-haspopup="true" aria-controls="overlay_menu">
          <i class="pi pi-user" />
          <span>Profile</span>
        </button>
        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '~/stores/auth.store'
import Toast from 'primevue/toast';

export default {
  data() {
    return {
      items: [
        {
          label: 'Profile',
          icon: 'pi pi-user-edit',
          command: this.openProfile
        },
        {
          label: 'Logout',
          icon: 'pi pi-power-off',
          command: this.logout
        }
      ]}
  },
  emits: ['topbar-menu-toggle', 'menu-toggle'],
  computed: {
    darkTheme () {
      return this.$appState.darkTheme
    }
  },
  methods: {
    onMenuToggle (event) {
      this.$emit('menu-toggle', event)
    },
    onTopbarMenuToggle (event) {
      this.$emit('topbar-menu-toggle', event)
    },
    topbarImage () {
      return this.$appState.darkTheme ? '/images/logo-white.svg' : '/images/logo-dark.svg'
    },
    profileToggle(event) {
      this.$refs.menu.toggle(event);
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      navigateTo('/account/login');
    },
    getUserName() {
      let user = useAuthStore().user.user;
      let roleName = "";

      if (user.role_id == 1)
        roleName = "Admin";
      else if (user.role_id == 2)
        roleName = "Doctor";
      else if (user.role_id == 3)
        roleName = "Reception";
      else if (user.role_id == 4)
        roleName = "Patient";

      return roleName + " " + user.name;
    },
    openProfile() {
      let user = useAuthStore().user.user;

      if (user.role_id == 2)
        navigateTo('/doctor/doctorProfile')
      else if (user.role_id == 3)
        navigateTo('/reception/receptionProfile')
      else if (user.role_id == 4)
        navigateTo('/patient/patientProfile')
    }
  }
}
</script>
