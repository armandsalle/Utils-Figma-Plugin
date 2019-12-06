import Vue from "vue"
import App from "./App"
import "./ui.css"

Vue.config.productionTip = false
Vue.config.devtools = false

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App)
})
