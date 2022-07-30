/* eslint-disable @typescript-eslint/indent */
/* eslint-disable indent */
import { defineStore } from 'pinia';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
    }),
    actions: {
        async login(username, password) {

            const data = {
                email: username,
                password: password
            };
            const u = await $fetch(`${baseUrl}/api/login`, {
                method: 'POST',
                body: JSON.stringify(data)
            });

            // update pinia state
            this.user = u;
            console.log(u);
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(u));

            navigateTo('/');
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            navigateTo('/account/login');
        }
    }
});
