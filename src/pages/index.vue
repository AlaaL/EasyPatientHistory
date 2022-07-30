<template>
  <div></div>
</template>

<script lang="ts">
import { useAuthStore } from '~/stores/auth.store'

export default defineComponent({
  setup () {
    useMeta({
      title: 'Dashboard'
    })
  },
  data () {
    return {
    }
  },

  created () {
     let user = useAuthStore().user.user;

    if (user.role_id == 2)
        navigateTo('/doctor/showAppointment');
      else if (user.role_id == 3)
        navigateTo('/reception/manageAppointments');
        return this.receiptionMenu;
  },
  mounted () {

  }
})
</script>
