<template>
<div class="register">
  <div class="q-pa-md">
    <div class="q-pa-md">
        <q-img
            src="@/assets/logo2.png"
            spinner-color="white"
            style="height: 75px; width: 170px"
        />
        <br>
        <br>
        <q-separator />
        <div class="fit row  justify-center  content-center">
          <q-card dark class="col-4">
            <q-card-section>
              <div class="text-h6">
                Register
              </div>
            </q-card-section>
            <q-card-section>
                <q-input dark filled color="amber" label-color="white" v-model="email" label="Email" type="email">
                    <template v-slot:prepend>
                        <q-icon name="email" />
                    </template>
                </q-input>
            </q-card-section>
            <q-card-section>
                <q-input dark filled color="amber" label-color="white" v-model="password" label="Password" :type="isPwd ? 'password' : 'text'">
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
            </q-card-section>
            <q-card-section>
                <q-input dark filled color="amber" label-color="white" v-model="confirmPassword" label="Confirm Password" type="password">
                    <template v-slot:prepend>
                        <q-icon name="key" />
                    </template>
                </q-input>
            </q-card-section>
            <q-card-section>
                <q-input dark filled color="amber" label-color="white" v-model="accessID" label="Access ID">
                    <template v-slot:prepend>
                        <q-icon name="security" />
                    </template>
                </q-input>
            </q-card-section>
            <q-separator />
            <q-card-section>
                <q-btn size="md" color="amber" text-color="white" label="Register" to="/login" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['query'],
    name: 'Register',
    data: function() {
        return {
            email: null,
            password: null,
            confirmPassword: null,
            isPwd: true,
            accessID: null,
        }
    },
    setup(props) {
        console.log(props.query.AID);
    },
    mounted(){
        const urlParams = new URLSearchParams(window.location.search);
        this.accessID = urlParams.get("AID");
    }
}
</script>