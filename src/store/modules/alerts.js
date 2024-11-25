import Service from "@/services/Service.js";

export default {
    state: {
      alerts: []
    },
    mutations: {
      addAlert (state, message) {
        // payload.received_at = new Date(payload.received_at*1000).toLocaleString()
        console.log(`in store addAlert: ${message}`)
        state.alerts.push(message)
      },
      removeAlert: (state, payload) => {
        // TODO: call to remove entry from AlertService
        Service.removeAlert(payload)
          .then((response) => {
            console.log('item removed')
            const i = state.alerts.findIndex(item => item.date === payload);
            state.alerts.splice(i, 1);
          })
          .catch((error) => {
            console.error(error);
        });
      }
    },
    getters: {
      alertCount: state => {
        return state.alerts.length;
      },
      allAlerts: state => {
        return state.alerts;
        // console.log(`allAlerts: length ${state.alerts.length}`)
        // let arrayCopy = [...state.alerts];
        // return arrayCopy;
      }
    }
  };
  