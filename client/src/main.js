import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from "./store"
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
    components,
    directives,
})

const app = createApp(App)

app.use(router)
app.use(store)
app.use(vuetify)

app.mount('#app')
