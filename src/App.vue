<template>
  <div id="app">
    <h1>Payments</h1>
    <Table
      :data='payments'
      :specs='tableSpecs'
      identifier='ID'
      :updateData='updatePayments'
    />
  </div>
</template>

<script>
import payments from './assets/data/payments.csv'
import Table from './components/Table'

export default {
  name: 'app',

  data () {
    return {
      payments,
      tableSpecs: [
        {
          name: 'ID',
          label: 'ID',
          searchable: true
        },
        {
          name: 'Name',
          label: 'Full Name',
          sortable: true,
          searchable: true
        },
        {
          name: 'Description',
          label: 'Description',
          searchable: true
        },
        {
          name: 'Date',
          label: 'Date',
          format: this.formatDate,
          sortable: true
        },
        {
          name: 'Amount',
          label: 'Amount',
          format: this.formatAmount,
          sortable: true
        }
      ]
    }
  },

  components: {
    Table
  },

  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
    },

    formatAmount (amount) {
      const options = { style: 'currency', currency: 'USD'}
      return new Intl.NumberFormat('en-US', options).format(amount)
    },

    updatePayments (payment, identifier) {
      const index = this.payments.findIndex(p => p[identifier] === payment[identifier])
      this.payments.splice(index, 1, payment)
    }
  }
}
</script>

<style>
  body {
    font-family: 'Arial', 'Helvetica', sans-serif;
  }
</style>
