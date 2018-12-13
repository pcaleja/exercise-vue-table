import { mount } from '@vue/test-utils'
import Table from './Table'

function formatDate (date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}

function formatAmount (amount) {
  const options = { style: 'currency', currency: 'USD'}
  return new Intl.NumberFormat('en-US', options).format(amount)
}

function updatePayments (payment, identifier) {
  const index = this.payments.findIndex(p => p[identifier] === payment[identifier])
  this.payments.splice(index, 1, payment)
}

const data = [
  {
    id: '1',
    name: 'Zero Hero',
    description: 'Test Description',
    amount: 555,
    date: new Date('December 1, 2018')
  },
  {
    id: '2',
    name: 'A Person',
    description: 'Just a payment',
    amount: -95,
    date: new Date('December 5, 2018')
  },
  {
    id: '3',
    name: 'Sir Testalot',
    description: 'Dollar dollar bills',
    amount: 0,
    date: new Date('September 20, 2018')
  }
]

const specs = [
  {
    name: 'id',
    label: 'ID',
    searchable: true
  },
  {
    name: 'name',
    label: 'Full Name',
    sortable: true,
    searchable: true
  },
  {
    name: 'description',
    label: 'Description',
    searchable: true
  },
  {
    name: 'date',
    label: 'Date',
    format: formatDate,
    sortable: true
  },
  {
    name: 'amount',
    label: 'Amount',
    format: formatAmount,
    sortable: true
  }
]

const propsData = {
  data,
  specs,
  identifier: 'id',
  updateData: updatePayments
}

describe('Table', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Table, { propsData })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('is the right number of rows including the header', () => {
    const wrapper = mount(Table, { propsData })
    expect(wrapper.findAll('tr')).toHaveLength(data.length + 1)
  })

  it('is sortable to be ascending', () => {
    const wrapper = mount(Table, { propsData })
    const button = wrapper.find('[data-test="sort-name"]')
    button.trigger('click')
    expect(wrapper.findAll('[data-test="cell-name"]').at(0).html()).toContain('A Person')
  })

  it('is sortable to be descending', () => {
    const wrapper = mount(Table, { propsData })
    const button = wrapper.find('[data-test="sort-name"]')
    button.trigger('click')
    button.trigger('click')
    expect(wrapper.findAll('[data-test="cell-name"]').at(0).html()).toContain('Zero Hero')
  })

  it('is searchable', () => {
    const wrapper = mount(Table, { propsData })
    wrapper.setData({
      searchBy: 'name',
      searchOperation: 'like',
      searchValue: 'sir testalot',
    })
    expect(wrapper.findAll('tr')).toHaveLength(2)
  })

  it('is showing no data when no items fit the search params', () => {
    const wrapper = mount(Table, { propsData })
    wrapper.setData({
      searchBy: 'name',
      searchOperation: 'like',
      searchValue: 'asdfasd asdfasdf',
    })
    expect(wrapper.find('[data-test="no-data"] p').html()).toContain('No Data Found')
  })
})
