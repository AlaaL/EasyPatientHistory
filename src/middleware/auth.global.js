import { useAuthStore } from '~/stores/auth.store'

export default defineNuxtRouteMiddleware(async(to, from) => {

    const authStore = useAuthStore();

    if (authStore.user == null && to.name != "account-login" && to.name != "account-register") {
        return '/account/login'
    } else if (authStore.user != null && (to.name == "account-login" || to.name == "account-register")) {
        return '/'
    }

    return;
})