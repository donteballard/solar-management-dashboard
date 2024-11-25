<template>
<div id="navbar">
  <q-layout view="hHh lpR fFf">

    <q-header bordered class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="@/assets/logo.png" alt="Ballard Solar">
          </q-avatar>
          <q-btn to="/" stretch flat label="Monitor" />
          <q-btn to="/sites" stretch flat label="Sites" />
          <q-btn to="/cases" stretch flat label="Cases" />
          <q-btn to="/admin" stretch flat label="Admin" />
        </q-toolbar-title>
        <q-btn flat round dense icon="account_circle">
          <q-badge rounded color="amber" floating>2</q-badge>
                <q-menu dark transition-show="jump-down" transition-hide="jump-up">
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">Account</div>
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
              <img src="https://www.brideandgroom.com.au/static/resources/images/avatar.png">
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">D'onte' B.</div>

            <q-btn
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

<script>
export default {
  name: 'Navbar',
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