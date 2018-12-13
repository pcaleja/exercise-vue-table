<template>
  <div class='c-table__wrapper'>
    <table class='c-table' v-if='computedItems.length'>
      <tr class='c-table__row c-table__row--header'>
        <th class='c-table__cell c-table__cell--header' v-for='spec in specs' :key='spec.name'>
          <span>{{ spec.label }}</span>
          <button
            class='c-button'
            v-if='spec.sortable'
            @click='handleSort(spec)'
            :data-test='`sort-${spec.name}`'
          >&#8597;</button>
        </th>
        <th class='c-table__cell c-table__cell--header'>Actions</th>
      </tr>
      <tr class='c-table__row' v-for='item in computedItems' :key='item[identifier]'>
        <td class='c-table__cell' v-for='spec in specs' :key='spec.name' :class='defineClassForNumbers(item[spec.name])'>
          <span class='c-table__cell__inline-label'>{{ spec.name }}:</span>
          <span
            class='c-table__cell__value'
            :data-test='`cell-${spec.name}`'
          >{{ spec.format ? spec.format(item[spec.name]) : item[spec.name] }}</span>
        </td>
        <td class='c-table__cell'>
          <span class='c-table__cell__inline-label'>Actions</span>
          <span class='c-table__cell__value'>
            <button class='c-button' @click='handleEdit(item)'>Edit</button>
          </span>
        </td>
      </tr>
    </table>

    <div v-else data-test='no-data'>
        <p>No Data Found</p>
    </div>

    <div class='c-table__search'>
      <button class='c-button' @click='searchToggled = !searchToggled'>{{ searchToggled ? 'Close' : 'Search' }}</button>
      <form v-show='searchToggled'>
        <div>
          <label for='searchBy'>Search By</label>
          <select name='searchBy' v-model='searchBy'>
            <option v-for='spec in computedSearchables' :key='spec.name' :value='spec.name'>{{ spec.label }}</option>
          </select>
        </div>

        <div>
          <label for='searchOperation'>Search Operation</label>
          <select name='searchOperation' v-model='searchOperation' :disabled='!searchBy'>
            <option value='like'>Like</option>
          </select>
        </div>

        <div>
          <label for='searchValue'>Search Value</label>
          <input name='searchValue' v-model='searchValue' :disabled='!searchOperation'/>
        </div>
      </form>
    </div>

    <div class='c-table__edit' v-if='editItem' @click.self='editItem = null'>
      <button @click.self='editItem = null' class='c-button c-table__edit__close'>Close</button>
      <div class='c-table__edit__wrapper'>
        <p><strong>ID: </strong>{{ editItem.ID }}</p>
        <form>
          <div>
            <label for='description'>Description</label>
            <textarea name='description' v-model='editItem.Description' />
          </div>

          <div>
            <button type='submit' class='c-button' @click.prevent='handleEditSubmit'>Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        required: true
      },
      specs: {
        type: Array,
        required: true
      },
      identifier: {
        type: String,
        required: true
      },
      updateData: {
        type: Function,
        required: true
      }
    },

    data () {
      return {
        searchToggled: false,
        searchBy: '',
        searchOperation: '',
        searchValue: '',
        sortBy: '',
        sortOrder: 'ascending',
        editItem: null
      }
    },

    computed: {
      computedSearchables () {
        return this.specs.filter(spec => {
          return spec.searchable
        })
      },

      computedItems () {
        let items = this.data.length ? this.data : []

        if (this.sortBy && this.sortOrder) {
          items = items.sort((a, b) => {
            let aVal = typeof a === 'string' ? a.toUpperCase : a
            let bVal = typeof b === 'string' ? b.toUpperCase : b
            if (aVal[this.sortBy] < bVal[this.sortBy]) {
              return -1;
            }
            if (aVal[this.sortBy] > bVal[this.sortBy]) {
              return 1;
            }

            return 0;
          })

          if (this.sortOrder === 'ascending') {
            items = items.reverse()
          }
        }

        if (this.searchBy && this.searchOperation && this.searchValue) {
          items = items.filter(i => {
            return i[this.searchBy].toLowerCase().search(this.searchValue.toLowerCase()) > -1
          })
        }

        return items
      }
    },

    methods: {
      defineClassForNumbers (amount) {
        if (typeof amount !== 'number') return
        return amount >= 0
          ? 'positive'
          : 'negative'
      },

      handleSort (spec) {
        this.sortBy = spec.name
        this.sortOrder = this.sortOrder === 'ascending'
          ? 'descending'
          : 'ascending'
      },

      handleEdit (item) {
        this.editItem = Object.assign({}, item)
      },

      handleEditSubmit () {
        this.updateData(this.editItem, 'ID')
        this.editItem = null
      }
    }
  }
</script>

<style scoped>
  .c-table {
    border-collapse: collapse;
  }

  .c-table__cell {
    border: 1px solid lightgray;
    border-collapse: collapse;
    padding: 0.5rem;
  }

  .c-table__cell {
    padding: 0.5rem;
    padding-top: 1.5rem;
    display: block;
    position: relative;
    margin-bottom: -1px;
  }

  .c-table__row {
    display: block;
    margin-bottom: 1rem;
  }

  .c-table__row--header {
    display: none;
    border-top: 5px solid lightslategray;
  }

  .c-table__cell__inline-label {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    font-size: 0.8rem;
    color: lightslategray;
  }

  .c-table__cell:first-of-type {
    border-top: 5px solid lightslategray;
  }

  .c-table__wrapper {
    padding-bottom: 5rem;
  }

  .c-table__search {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: white;
    padding: 1rem;
    box-sizing: border-box;
    box-shadow: 1px 1px 1px 2px lightgrey;
    text-align: right;
  }

  .c-table__search div {
    position: relative;
    margin-bottom: 1rem;
  }

  .c-table__search label {
    position: absolute;
    font-size: 0.6rem;
    left: 0.5rem;
    top: 0.25rem;
  }

  .c-table__search input,
  .c-table__search select {
    width: 100%;
    box-sizing: border-box;
    appearance: none;
    padding: 0.5rem;
    padding-top: 1rem;
    font-size: 0.8rem;
    border: 1px solid lightslategray;
    border-radius: 4px;
    background: white;
  }

  .c-table__search input[disabled],
  .c-table__search select[disabled] {
    cursor: not-allowed;
    background: lightgray;
  }

  .c-table__search form {
    margin-top: 1rem;
  }

  .positive .c-table__cell__value {
    color: green;
  }

  .negative .c-table__cell__value {
    color: red;
  }

  .c-button {
    cursor: pointer;
    margin: 0 0.25rem;
  }

  .c-table__edit {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .c-table__edit__wrapper {
    max-width: 600px;
    width: 100%;
    background: white;
    box-shadow: 1px 1px 1px 2px lightgrey;
    padding: 2rem;
  }

  .c-table__edit__wrapper textarea {
    display: block;
    width: 100%;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .c-table__edit__wrapper .c-button {
    margin-left: 0;
  }

  .c-table__edit__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  @media screen and (min-width: 769px) {
    .c-table__cell {
      display: table-cell;
      white-space: nowrap;
      padding: 0.5rem;
    }

    .c-table__row {
      display: table-row;
    }

    .c-table__cell__inline-label {
      display: none;
    }

    .c-table__cell:first-of-type {
      border-top: 1px solid lightgray;
    }

    .positive, .negative {
      text-align: right;
    }

    .c-table__search form {
      margin-top: 0;
      order: -1;
      display: flex;
      width: 80%;
    }

    .c-table__search div {
      width: 33.33%;
      margin: 0 0.5rem;
    }
  }
</style>
