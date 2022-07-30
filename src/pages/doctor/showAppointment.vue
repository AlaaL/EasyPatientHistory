<script>
import AppointmentService from '../../../services/AppointmentService'
export default {
  data() {
    return {
      appointments: null,
      layout: 'grid',
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
        { label: 'Appointment Time High to Low', value: '!time' },
        { label: 'Appointment Time to High', value: 'time' }
      ]
    }
  },
  appointmentService: null,
  created() {
    this.appointmentService = new AppointmentService()
  },
  mounted() {
    this.appointmentService.getAppointments().then(data => this.appointments = data)
  },
  methods: {
    onSortChange(event) {
      const value = event.value.value
      const sortValue = event.value

      if (value.indexOf('!') === 0) {
        this.sortOrder = -1
        this.sortField = value.substring(1, value.length)
        this.sortKey = sortValue
      } else {
        this.sortOrder = 1
        this.sortField = value
        this.sortKey = sortValue
      }
    },
  }
}
</script>

<template>
  <div class="card">
    <DataView
      :value="appointments"
      :layout="layout"
      :paginator="true"
      :rows="9"
      :sort-order="sortOrder"
      :sort-field="sortField"
    >
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Dropdown v-model="sortKey" :options="sortOptions" option-label="label" placeholder="Sort By time" @change="onSortChange($event)" />
          </div>
          <div class="col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="appointment-list-item">
            <div class="appointment-list-detail">
              <div class="appointment-name">
                {{ slotProps.data.patientName }}
              </div>
              <div class="appointment-description">
                {{ slotProps.data.description }}
              </div>
          </div>
            <div class="appointment-list-action">
              <span class="appointment-time">{{ slotProps.data.time }}</span>
              <Button label="View Patient file" @click="navigateTo('/doctor/updatePatientFile')" />
              <span :class="`appointment-badge status-${slotProps.data.patientName.toLowerCase()}`">{{ slotProps.data.patientName }}</span>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 md:col-4">
          <div class="appointment-grid-item card">
            <div class="appointment-grid-item-top">
              <span :class="`appointment-badge status-${slotProps.data.patientName.toLowerCase()}`">{{ slotProps.data.patientName }}</span>
            </div>
            <div class="appointment-grid-item-content">
              <div class="appointment-name">
                {{ slotProps.data.patientName }}
              </div>
              <div class="product-description">
                {{ slotProps.data.description }}
              </div>
            </div>
            <div class="appointment-grid-item-bottom">
              <span class="appointment-time">{{ slotProps.data.time }}</span>
              <Button label="Patient file" @click="navigateTo('/doctor/updatePatientFile');" />
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<style lang="scss" scoped>
.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

.appointment-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.appointment-description {
	margin: 0 0 1rem 0;
}


::v-deep(.appointment-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;

	.appointment-list-detail {
		flex: 1 1 0;
	}

	.p-rating {
		margin: 0 0 .5rem 0;
	}

	.appointment-time {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .5rem;
		align-self: flex-end;
	}

	.appointment-list-action {
		display: flex;
		flex-direction: column;
	}

	.p-button {
		margin-bottom: .5rem;
	}
}

::v-deep(.appointment-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);

	.appointment-grid-item-top,
	.appointment-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.appointment-grid-item-content {
		text-align: center;
	}

	.appointment-time {
		font-size: 1.5rem;
		font-weight: 600;
	}
}

@media screen and (max-width: 576px) {
	.appointment-list-item {
		flex-direction: column;
		align-items: center;

		.appointment-list-detail {
			text-align: center;
		}

		.appointment-time {
			align-self: center;
		}

		.appointment-list-action {
			display: flex;
			flex-direction: column;
		}

		.appointment-list-action {
			margin-top: 2rem;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
}
</style>
