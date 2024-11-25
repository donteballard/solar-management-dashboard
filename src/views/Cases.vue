<template>
<div class="cases">
  <div class="q-pa-md">
    <div class="q-pa-md">
        <div class="fit row  justify-center  content-center">
          <q-card dark class="col-12">
            <q-tabs
              v-model="tab"
              dense
              class="bg-dark text-white"
              active-color="white"
              indicator-color="amber"
              align="justify"
              narrow-indicator
            >
              <q-tab name="openCases" label="Open Cases" />
              <q-tab name="closedCases" label="Closed Cases" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated class="bg-dark text-center text-white">
              <q-tab-panel name="openCases">
                <q-table
                  dark
                  :columns="caseColumns"
                />
              </q-tab-panel>
              <q-tab-panel name="closedCases">
               <q-table
                  dark
                  :columns="caseColumns"
                />
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Cases',
  data: function() {
    return {
      tab: 'openCases',
      medium: false,
      position: 'top',
      caseColumns: [
        { name: 'name', align: 'left', label: 'Site', field: 'name', sortable: true },
        { name: 'subject', align: 'left', label: 'Subject', field: 'subject' },
        { name: 'dateAdded', align: 'left', label: 'Date Added', field: 'dateAdded' },
        { name: 'kwAffected', align: 'left', label: 'kW Affected', field: 'kwAffected' },
        { name: 'lostProduction', align: 'left', label: 'Lost Production', field: 'lostProduction' },
        { name: 'status', align: 'left', label: 'Status', field: 'status' },
        { name: 'category', align: 'left', label: 'Category', field: 'category' },
        { name: 'serviceTeam', align: 'left', label: 'Service Team', field: 'serviceTeam' },
        { name: 'venderNum', align: 'left', label: 'Vender Case Number', field: 'venderNum' },
        { name: 'priority', align: 'left', label: 'Priority', field: 'priority' },
      ]
  }
}
}
</script>