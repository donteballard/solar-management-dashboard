import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/modules/auth.js";
import sites from "@/store/modules/sites.js";
import alerts from "@/store/modules/alerts.js";
 
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    sites,
    alerts
  },
});
