import { createApp } from 'vue'
import App from './App.vue'
import 'quasar/dist/quasar.css'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'


// Vue.use(Quarsar,{
//     config:{}
// });

createApp(App).use(Quasar, quasarUserOptions).mount('#app')
