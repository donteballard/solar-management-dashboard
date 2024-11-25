<template>
<div class="login">
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
                Login
              </div>
            </q-card-section>
            <q-card-section>
                <q-input dark filled color="amber" label-color="white" v-model="email" label="Email">
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
            <q-separator />
            <q-card-section>
                <q-btn size="md" color="amber" text-color="white" label="Login" to="/" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function() {
    return {
        email: null,
        password: null,
        isPwd: true,
  }
}
}
</script>