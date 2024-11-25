import {Socket} from "phoenix"
import store from "@/store/store.js";
import Url from "@/services/Url.js";

let account_id = store.getters.currentAccount.id 

if (account_id != undefined) {
  let socket = new Socket(Url.wss(), {params: {token: "none"}});
  socket.connect()

  let channel = socket.channel("account:" + account_id)

  channel.on("update_current_account", account => {
    store.commit("setCurrentAccount", account);
  })

  channel.join()
}

export default {}