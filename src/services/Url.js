export default {
    https() {
      return process.env.VUE_APP_API_URL;
    },
    wss() {
      return process.env.VUE_APP_WSS_URL;
    }
  }  