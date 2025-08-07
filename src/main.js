// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// ✅ Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// ✅ Import and register Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

// ✅ Create and mount the app
createApp(App)
  .use(pinia)   // enable Pinia globally
  .use(router)  // enable vue-router
  .mount('#app')
