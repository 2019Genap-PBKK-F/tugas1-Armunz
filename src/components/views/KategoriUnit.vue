<template>
  <section class="content">
    <div class="container">
      <div class="row">
        <div>
          <div id="app" ref="spreadsheet"></div>
          <div class="col-md-11">
            <input type="button" class="btn btn-primary" value="Add Data" @click="() => spreadsheet.insertRow()" />
            <input type="button" class="btn btn-danger" value="Delete Data" @click="() => spreadsheet.deleteRow()" />
          </div>
        </div>
      </div>
    </div>
  </section>  
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'

export default {
  // load jexcel
  mounted: function () {
    let spreadsheet = jexcel(this.$el, this.jexcelOptions)
    Object.assign(this, { spreadsheet })
  },

  methods: {
    // fungsi insert Row
    insertRow () {
      axios.post('http://localhost:8006/api/kategori-unit/').then(res => {
        console.log(res.data)
      })
    },

    // fungsi update Row
    updateRow (instance, cell, columns, row, value) {
      axios.get('http://localhost:8006/api/kategori-unit/').then(res => {
        console.log(res.data[row])
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://localhost:8006/api/kategori-unit/' + index[0], {
          id: index[0],
          nama: index[1]
        }).then(res => {
          console.log(res.data)
        })
      })
    },

    // fungsi delete row
    deleteRow (instance, row) {
      axios.get('http://localhost:8006/api/kategori-unit/').then(res => {
        var index = Object.values(res.data[row])

        console.log(row)
        axios.delete('http://localhost:8006/api/kategori-unit/' + index[0])
      })
    }
  },

  computed: {
    jexcelOptions () {
      return {
        allowToolbar: true,
        url: 'http://localhost:8006/api/kategori-unit/',
        onchange: this.updateRow,
        oninsertrow: this.insertRow,
        ondeleterow: this.deleteRow,
        search: true,
        pagination: 10,
        columns: [
          { type: 'hidden', title: 'id', width: '10px' },
          { type: 'text', title: 'Nama', width: '200px' }
        ]
      }
    }
  }
}

</script>
