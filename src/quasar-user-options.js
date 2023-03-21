
import 'quasar/dist/quasar.css'
import lang from 'quasar/lang/ja.js'
import '@quasar/extras/material-icons/material-icons.css'
import {Loading} from 'quasar';
// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Loading
  },
  lang: lang,
  extends:[
    'material-icons'
  ]
}