<template>
  <div class="admin">
    <div class="q-pa-md">
      <div class="q-pa-md">
        <div class="fit row  justify-center  content-center">
          <q-card dark class="col-8">
            <q-tabs
              v-model="tab"
              dense
              class="bg-dark text-white"
              active-color="white"
              indicator-color="amber"
              align="justify"
              narrow-indicator
            >
              <q-tab name="userSettings" label="User Settings" />
              <q-tab name="adminSettings" label="Admin Settings" />
              <q-tab name="dashboardSettings" label="Dashboard Settings" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated class="bg-dark text-center text-white">
              <q-tab-panel name="userSettings">
                <div class="flex fit row  justify-center  content-center">
                  <q-card class="bg-dark col-5">
                    <q-form
                      @submit="onSubmit"
                    >
                      <q-input
                        dark
                        color="amber"
                        filled
                        v-model="name"
                        label-color="white"
                        label="First & Last Name"
                        :disable="!editUser"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please enter name']"
                      >
                        <template v-slot:prepend>
                          <q-icon name="account_circle" />
                        </template>
                      </q-input>
                      <q-separator />
                      <q-input
                        dark
                        color="amber"
                        type="email"
                        filled
                        v-model="email"
                        label-color="white"
                        label="Email"
                        :disable="!editUser"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please enter email']"
                      >
                        <template v-slot:prepend>
                          <q-icon name="email" />
                        </template>
                      </q-input>
                      <q-separator />
                      <q-input
                        dark
                        color="amber"
                        :type="isPwd ? 'password' : 'text'"
                        filled
                        label-color="white"
                        v-model="password"
                        label="Password"
                        :disable="!editUser"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please enter password']"
                      >
                        <template v-slot:prepend>
                          <q-icon name="key" />
                        </template>
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          />
                        </template>
                      </q-input>
                      <div v-if="editUser">
                      <q-separator />
                        <q-input
                          dark
                          color="amber"
                          type="password"
                          filled
                          label-color="white"
                          v-model="confirmPassword"
                          label="Confirm Password"
                          :disable="!editUser"
                          lazy-rules
                          :rules="[ val => val && val == this.password || 'Passwords do not match']"
                        >
                          <template v-slot:prepend>
                            <q-icon name="key" />
                          </template>
                        </q-input>
                      </div>
                      <q-separator />
                      <br>
                      <q-btn :disable="editUser" size="md" color="amber" @click="editUserSettings()" text-color="white" label="Edit" />
                        &nbsp;
                      <q-btn type="submit" :disable="!editUser" size="md" color="amber" @click="saveUserSettings()" text-color="white" label="Save" />
                      <br>
                      <br>
                    </q-form>
                  </q-card>
                </div>
                <br>
                <q-separator />
                <br>
                <div class="flex fit row  justify-center  content-center">
                  <q-card class="bg-dark col-8">
                    <br>
                    <div class="text-h6">
                      User Logs
                    </div>
                    <q-card-section>
                      <q-table
                        dark
                        color="amber"
                        :columns="accountCols"
                        :rows="accountRows"
                      >
                      </q-table>
                    </q-card-section>
                  </q-card>
                </div>
              </q-tab-panel>
              <q-tab-panel name="adminSettings">
                <div class="flex fit row  justify-center  content-center">
                  <q-card class="bg-dark col-6">
                    <q-card-section>
                      <div class="text-h6">
                        Customer Creation
                      </div>
                      <br>
                      <q-input
                        dark
                        color="amber"
                        type="name"
                        filled
                        label-color="white"
                        label="Customer Name"
                      >
                        <template v-slot:prepend>
                          <q-icon name="account_circle" />
                        </template>
                      </q-input>
                      <q-separator />
                      <q-input
                        dark
                        color="amber"
                        type="name"
                        filled
                        label-color="white"
                        label="Access ID"
                        disable
                        v-model="accessID"
                      >
                        <template v-slot:prepend>
                          <q-icon name="security" />
                        </template>
                        <template v-slot:after>
                          <q-btn @click="generateID()" dense flat icon="shuffle" />
                        </template>
                      </q-input>
                      <br v-if="!customerCreated">
                      <div v-if="customerCreated">
                      <q-card-section>
                        <q-input
                          dark
                          color="amber"
                          bg-color="dark"
                          type="name"
                          filled
                          label-color="white"
                          label="Customer's Admin Register Link"
                          disable
                          dense
                          v-model="customerLink"
                        >
                        </q-input>
                      </q-card-section>
                      </div>
                      <q-btn size="md" color="amber" text-color="white" label="Create" @click="createCustomer()" />
                    </q-card-section>
                  </q-card>
                </div>
                <br>
                <q-separator />
                <br>
                <div class="flex fit row  justify-center  content-center">
                  <q-card class="bg-dark col-10">
                    <q-card-section>
                      <div class="text-h6">
                        User Management
                      </div>
                    </q-card-section>
                    <q-card-section>
                      <q-table
                        dark
                        color="amber"
                        :columns="userCols"
                        :rows="userRows"
                      >
                      <template v-slot:body-cell-actions="props">
                        <q-td :props="props">
                          <q-btn color="amber" dense size="xs" icon="more_horiz">
                            <q-menu dark>
                              <q-list style="min-width: 100px">
                                <q-item clickable v-close-popup>
                                  <q-item-section>Assign Account</q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                  <q-item-section>Change Role</q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup>
                                  <q-item-section>Email</q-item-section>
                                </q-item>
                                <q-separator />
                                <q-item clickable v-close-popup>
                                  <q-item-section>Delete User</q-item-section>
                                </q-item>
                              </q-list>
                            </q-menu>
                          </q-btn>
                        </q-td>
                      </template>
                      </q-table>
                    </q-card-section>
                  </q-card>
                </div>
              </q-tab-panel>
              <q-tab-panel name="dashboardSettings">
                Dashboard Settings
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .q-item.q-router-link--active {
    color: #f88404;
  }
</style>

<script>
import { useQuasar, QSpinnerTail } from 'quasar'
import moment from 'moment'
export default {
  name: 'Admin',
  data: function() {
    return {
      userCols: [
        { name: 'role', align: 'left', label: 'Role', field: 'role' },
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'email', align: 'left', label: 'Email', field: 'email' },
        { name: 'customer', align: 'left', label: 'Customer', field: 'customer', sortable: true},
        { name: 'accountSiteCount', align: 'center', label: 'Accounts / Sites', field: 'accountSiteCount' },
        { name: 'actions', align: 'right', label: 'Actions', field: 'actions' },
      ],
      userRows: [
        { role: 'SuperUser', name: 'Joey Dorwart', email: 'joey@sunovision.com', customer: 'Sunovision', accountSiteCount: '1 / 20'}
      ],
      customerLink: null,
      customerCreated: false,
      accessID: null,
      moment: moment,
      accountLogged: [],
      accountCols: [
        { name: 'date', align: 'left', label: 'Date', field: 'date', sortable: true },
        { name: 'message', align: 'left', label: 'Log', field: 'message' },
        { name: 'ipAddress', align: 'left', label: 'IP Address', field: 'ipAddress' },
        { name: 'country', align: 'left', label: 'Country', field: 'country' },
      ],
      accountRows: [
        { date: '', ipAddress: '', country: ''}
      ],
      q: useQuasar(),
      isPwd: true,
      editUser: false,
      name: 'Joey Dorwart',
      email: 'joey@sunovision.com',
      password: 'Sunovision1',
      confirmPassword: null,
      tab: 'userSettings',
    }
  },
  methods: {
    createCustomer() {
      this.customerCreated = !this.customerCreated;

      this.customerLink = window.location.hostname + "/register?AID=" + this.accessID
      navigator.clipboard.writeText(this.customerLink);
      if(this.customerCreated) {
        this.q.notify({
          message: 'Copied Registration Link to Clipboard',
          timeout: 3000,
          color: 'dark', 
          position: 'bottom-right'
        });
      }
    },
    generateID() {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 7; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this.accessID = result;
    },
    editUserSettings() {
      this.editUser = !this.editUser;
      this.password = null;
      this.confirmPassword = null;
    },
    saveUserSettings() {
      if(this.password.length > 0 && this.confirmPassword.length > 0 && this.name.length > 0 && this.email.length > 0 && this.password == this.confirmPassword) {
        this.editUser = !this.editUser;
        this.q.notify({
          spinner: QSpinnerTail,
          spinnerColor: 'amber',
          message: 'Saving Account Settings...',
          timeout: 2500,
          color: 'dark',
          position: 'bottom-right'
        });
        console.log("Saving Account Settings for " + this.email);
      }
    },
    accountLogger() {
      var today = new Date();
      var time = new Date().toLocaleTimeString();
      var currentDate = this.moment(today).format("YYYY-MM-DD");
      fetch('http://ip-api.com/json')
      .then(x => x.json())
      .then(({ query, country }) => {
        this.accountRows = [
          { date: time + ' ' + currentDate, message: 'Logged In', ipAddress: query, country: country }
        ]
      });
    }
  },
  created: function () {
    this.accountLogger();
  },
  mounted() {

  },
}
</script>