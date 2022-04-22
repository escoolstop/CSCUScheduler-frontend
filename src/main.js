import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { VaPagination, VaButton, VaInput, ToastInstall } from 'vuestic-ui'

createApp(App).use(router).use(createPinia())
.use(ToastInstall)
.component('va-pagination', VaPagination)
.component('va-button',VaButton)
.component('va-input',VaInput)
.mount('#app')
