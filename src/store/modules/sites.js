export default {
    state: {
      objectPathBeingEdited: null,
      valueBeingEdited: null,
      inverterIdBeingEdited: null,
      currentSite: null,
      currentSiteInverters: null,
      inverterJustDeleted: false,
      notification: null,
      showNotification: false
    },
    mutations: {
      setObjectPathBeingEdited(state, payload) {
        state.objectPathBeingEdited = payload.value;
      },
      setValueBeingEdited(state, payload) {
        state.valueBeingEdited = payload.value;
      },
      setInverterIdBeingEdited(state, payload) {
        state.inverterIdBeingEdited = payload.value;
      },
      setCurrentSite(state, payload) {
        if (payload.objectPath) {
          const nested = payload.objectPath.split('.');
  
          if (nested.length === 1) {
            state.currentSite[nested[0]] = payload.value;
          } else if (nested.length === 2) {
            state.currentSite[nested[0]][nested[1]] = payload.value;
          }
        } else {
          state.currentSite = payload.value;
        }
      },
      setCurrentSiteInverters(state, payload) {
        if (payload.operation === 'loadData') {
          state.currentSiteInverters = payload.value;
        } else if (payload.operation === 'add') {
          state.currentSiteInverters.push(payload.newInverter);
        } else if (payload.operation === 'update') {
          const newInverters = state.currentSiteInverters.filter(inverter => inverter.id !== payload.inverterId);
  
          newInverters.push(payload.updatedInverter);
  
          newInverters.sort((a, b) => a.id - b.id);
  
          state.currentSiteInverters = newInverters;
        }
      },
      setInverterJustDeleted(state, payload) {
        state.inverterJustDeleted = payload.value;
      },
      setSiteNotification(state, notification) {
        state.showNotification = !!notification
        state.notification = notification
      }
    },
    getters: {
      siteNotification: state => state.notification,
      showSiteNotification: state => state.showNotification
    }
  };
  