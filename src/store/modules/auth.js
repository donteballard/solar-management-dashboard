import Service from "@/services/Service.js";

export default {
  state: {
    status: localStorage.getItem("status") || "",
    token: localStorage.getItem("token") || "",
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || {},
    currentAccount: JSON.parse(localStorage.getItem("currentAccount")) || {},
    currentConversation: JSON.parse(localStorage.getItem("currentConversation")) || {}
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      localStorage.setItem("status", "success");
      localStorage.setItem("token", token);
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = currentUser;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    },
    setCurrentAccount(state, currentAccount) {
      state.currentUser.accounts = state.currentUser.accounts.map((account) => update_acccount(account, currentAccount))
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));

      state.currentAccount = currentAccount;
      localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
    },
    setCurrentConversation(state, currentConversation) {
      state.currentConversation = currentConversation;
      localStorage.setItem("currentConversation", JSON.stringify(currentConversation));
    }
  },
  actions: {
    resetAndLogin({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Service.resetPassword(user)
          .then(resp => {
            success_auth(commit, resolve, resp);
          })
          .catch(err => {
            failed_auth(commit, reject, err);
          });
      });
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Service.login(user)
          .then(resp => {
            success_auth(commit, resolve, resp);
          })
          .catch(err => {
            failed_auth(commit, reject, err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Service.join(user)
          .then(resp => {

            success_auth(commit, resolve, resp);
          })
          .catch(err => {
            failed_auth(commit, reject, err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, _reject) => {
        commit("logout");
        localStorage.removeItem("status");
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentAccount");
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    currentUser: state => state.currentUser,
    currentAccount: state => state.currentAccount,
    currentConversation: state => state.currentConversation
  }
};

function success_auth(commit, resolve, resp) {
  commit("auth_success", resp.data.token);
  commit("setCurrentUser", resp.data.user);

  // set_account_if_one(commit, resp.data.user.accounts)

  resolve(resp);
}

function failed_auth(commit, reject, err) {
  commit("auth_error");
  localStorage.removeItem("token");
  reject(err);
}

function update_acccount(account, this_account) {
  if (account.id == this_account.id) {
    return this_account
  } else {
    return account
  }
}

function set_account_if_one(commit, accounts) {
  if (accounts.length == 1) {
    commit("setCurrentAccount", accounts[0]);
  }
}
