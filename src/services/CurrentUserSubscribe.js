import {Socket} from "phoenix"
import store from "@/store/store.js";
import Url from "@/services/Url.js";
import moment from 'moment-timezone'

let user_id = store.getters.currentUser.id;
let currentUser = store.getters.currentUser;

if (user_id != undefined) {
  let socket = new Socket(Url.wss(), {params: {token: "none"}});
  socket.connect()

  let channel = socket.channel("user:" + currentUser.name)

  channel.on("update_current_user", user => {
    store.commit("setCurrentUser", user)
  })

  channel.on("site_data_loaded", site => {
    store.commit("setSiteNotification", `${site.name} data was loaded`)
  })

  channel.on("user_alert", message => {
    console.log(`user_alert: ${message}`)
    var d = new Date(message.date);
    let datefmt = moment(d).format('YYYY-MM-DD HH:MM');
    let msg = {
      date: message.date, 
      datefmt: datefmt,
      message: message.message
    };
    store.commit('addAlert', msg);
    // store.commit("setSiteNotification", `${site.name} data was loaded`)
  })

  channel.join()
}

export default {}