<template>
<div class="sites">
  <div class="q-pa-md">
    <div class="q-pa-md">
        <div class="fit row  justify-center  content-center">
          <q-card dark class="col-12">
            <q-card-section>
              <div class="text-h6">
                Sites
              </div>
            </q-card-section>
            <q-card-section>
              <q-table
                dark
                :columns="siteColumns"
              />
            </q-card-section>
            <q-separator />
          </q-card>
        </div>
      </div>
    </div>
  <div class="q-pa-md">
    <div class="q-pa-md">
        <div class="fit row  justify-center  content-center">
          <q-card dark class="col-8">
            <div class="text-h6">
              <q-uploader
                dark
                class="fit"
                url="http://localhost:4444/upload"
                label="Upload Site(s)"
                color="amber"
                flat
                no-thumbnails
                multiple
              />
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Sites',
  data: function() {
    return {
      medium: false,
      position: 'top',
      siteColumns: [
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'dcSize', align: 'left', label: 'DC Size (kW)', field: 'dcSize' },
        { name: 'monitoringSystem', align: 'left', label: 'Monitoring System', field: 'monitoringSystem' },
        { name: 'account', align: 'left', label: 'Account', field: 'account' },
        { name: 'customer', align: 'left', label: 'Customer', field: 'customer' },
        { name: 'reportingGroup', align: 'left', label: 'Reporting Group', field: 'reportingGroup' },
        { name: 'billingPlan', align: 'left', label: 'Billing Plan', field: 'billingPlan' },
        { name: 'annualVisit', align: 'left', label: 'Annual Visit (Y/N)', field: 'annualVisit' },
        { name: 'annualFee', align: 'left', label: 'Annual Fee', field: 'annualFee' },
        { name: 'expDate', align: 'left', label: 'EXP Date', field: 'expDate' },
      ]
  }
}
}
</script>