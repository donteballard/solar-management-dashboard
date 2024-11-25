<template>
<div id="app">
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-dark text-white" v-if="!isLogin">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="@/assets/logo.png" alt="Sunovision">
          </q-avatar>
          <q-btn to="/monitor" stretch flat label="Monitor" />
          <q-btn to="/sites" stretch flat label="Sites" />
          <q-btn to="/cases" stretch flat label="Cases" />
          <q-btn to="/admin" stretch flat label="Admin" />
        </q-toolbar-title>
        <q-btn flat round dense icon="account_circle">
          <q-badge rounded color="amber" floating>2</q-badge>
                <q-menu dark transition-show="jump-down" transition-hide="jump-up">
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h7 q-mb-md">SuperUser</div>
                        <q-item @click="medium = true" clickable v-close-popup>
                          <q-badge rounded color="amber" floating>2</q-badge>
              <q-item-section>Alerts</q-item-section>
            </q-item>
                        <q-item clickable to="/admin" v-close-popup>
              <q-item-section>Settings</q-item-section>
            </q-item>
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar size="72px">
              <img src="@/assets/avatar.png" alt="Account Avatar">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">Joey D.</div>

            <q-btn
              to="/login"
              color="amber"
              label="Logout"
              push
              size="sm"
              v-close-popup
            />
          </div>
        </div>
      </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>

      <q-dialog
      v-model="medium"
      :position="position"
    >
      <q-card dark style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <q-table
            dark
            title="Alerts"
            :columns="alertColumns"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
</div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}
</style>

<script>
export default {
  name: 'App',
  computed: {
    isLogin() {
     return this.$route.name === 'Login' || this.$route.name === 'Register'
    }
  },
  data: function() {
    return {
      medium: false,
      position: 'top',
      alertColumns: [
        { name: 'date', align: 'left', label: 'Date', field: 'date', sortable: true },
        { name: 'message', align: 'center', label: 'Message', field: 'Message' },
        { name: 'actions', align: 'right', label: 'Actions', field: 'actions' }
      ]
  }
}
}
</script>