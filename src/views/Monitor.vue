<template>
  <div class="monitor">
    <q-layout>
        <q-page-container>
            <q-page>
                <div class="q-pa-md">
                      <div class="q-pa-md">
      <q-card dark>
        <q-tabs
          v-model="tab"
          dense
          class="bg-dark text-white"
          active-color="white"
          indicator-color="amber"
          align="justify"
          narrow-indicator
        >
          <q-tab name="mails" label="High-Alert Sites  &nbsp;">
            <q-badge class="blob" rounded color="amber" floating>2</q-badge>
          </q-tab>
          <q-tab name="alarms" label="Medium-Alert Sites" />
          <q-tab name="movies" label="All Sites" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="bg-dark text-center text-white">
          <q-tab-panel name="mails">
                                  <q-table
                        title="High-Alert Sites"
                        :rows="rows"
                        :columns="columns"
                        no-data-label="I didn't find anything for you"
                        row-key="name"
                        @row-click="onRowClick"
                        dark
                        color="amber"
                        :loading="loading"
                    >
                                          <template v-slot:body-cell-actions="props">
    <q-td :props="props">
      <q-btn color="amber" dense size="xs" icon="more_horiz">
                <q-menu dark>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Plans</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Notes</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>Cases</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Send Email</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-td>
  </template>
                      <template v-slot:body-cell-nativeMonitoring="props">
    <q-td :props="props">
      <q-btn color="amber" dense size="xs" icon="table_view"></q-btn>
    </q-td>
  </template>
                        <template v-slot:body-cell-systemHealth="props">
    <q-td :props="props">
      <q-linear-progress rounded size="20px" :value="props.value" :color="getProgressColor(props)" class="q-mt-sm" />
    </q-td>
  </template>
                                  </q-table>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Medium-Alert Sites</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">All Sites</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <br>
  </div>
                      <div class="q-mt-md">
                        Selected: {{ selected }}
                    </div>
                </div>

                <div class="fit row  justify-center  content-center">
                      <q-expansion-item
      v-model="expanded"
      dark
      :disable="!expanded"
      expand-icon="none"
      expanded-icon="none"
    >
                        <q-card dark class="col-10">
      <q-card-section>
        <div class="text-h6">
          {{ selected.name }}
          <div class="absolute-right">
          <q-chip size="sm" clickable @click="$router.push('/sites')" color="amber" text-color="white" icon="laptop">
            Site
            <q-tooltip class="bg-amber" :offset="[10, 10]">
              View Full Site Details
            </q-tooltip>
          </q-chip>
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        Solar Company | Account | Past 10 Day's System Health | Day's System Health | Past 30 Days' Performance | Day's Performance | KWH/GHI Variability
      </q-card-section>
      <q-card-section>
        Solar Company: <q-chip square>SunCommon</q-chip>
      </q-card-section>
      <q-card-section>
        Account: <q-chip square>SunCommon</q-chip>
      </q-card-section>
      <q-card-section>
        Past 10 Day's System Health:
        <div class="q-pa-md">
          <q-linear-progress size="25px" :value="progress" color="secondary">
          </q-linear-progress>
        </div>
      </q-card-section>
    </q-card>
    </q-expansion-item>

                </div>
            </q-page>
        </q-page-container>
<br>
         <q-separator />
         Copyright D'onte' Ballard 2024
    </q-layout>
</div>
</template>

<style scoped>
.blob {
	box-shadow: 0 0 0 0 rgba(248, 132, 4);
	transform: scale(1);
	animation: pulse 2s infinite;
}

@keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(248, 132, 4);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
}
</style>

<script>
export default {
  name: 'Monitor',
  data: function() {
    return {
      expanded: false,
      loading: false,
      progress: 0.5,
      progressLabel: '100%',
      tab: 'mails',
      selected: [],
      columns: 
      [
        {
          name: 'name',
          required: true,
          label: 'Site Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'component', align: 'left', label: 'Component', field: 'component' },
        { name: 'systemHealth', align: 'left', label: 'System Health', field: 'systemHealth', sortable: true },
        { name: 'nativeMonitoring', align: 'center', label: 'Native Monitoring', field: 'nativeMonitoring' },
        { name: 'actions', label: 'Actions', field: 'actions' },
      ],
      rows: 
      [
        {
          name: 'Burnette Residence',
          component: 'ALL',
          systemHealth: 0.6,
          nativeMonitoring: 'Link',
        },
        {
          name: 'John Wehmiller',
          component: 'INV 3',
          systemHealth: 0.4,
          nativeMonitoring: 'Link',
        },
        {
          name: 'Larsen Residence',
          component: 'INV 2, INV 4',
          systemHealth: 0.3,
          nativeMonitoring: 'Link',
        },
      ]
    }
  },
  methods: {
    onRowClick (evt, row) {
      console.log('Clicked on', row);
      this.selected = row;
      this.expanded = true;
    },
    getProgressColor: function(props) {
      if(props.value > .5) {
        return 'secondary'
      }
      else if (props.value > .3) {
        return 'warning'
      }
      else {
        return 'negative'
      }
    }
  }
}
</script>