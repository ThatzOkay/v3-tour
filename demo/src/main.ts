import { createApp } from 'vue'
import App from './App.vue'

import { VueTour } from "../../src/main";

import './css/app.css'

createApp(App)
  .use(VueTour)
  .mount('#app');
