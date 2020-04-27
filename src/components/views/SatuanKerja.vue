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
      axios.post('http://10.199.14.46:8006/api/satuan-kerja/').then(res => {
        console.log(res.data)
      })
    },

    // fungsi update Row
    updateRow (instance, cell, columns, row, value) {
      axios.get('http://10.199.14.46:8006/api/satuan-kerja/').then(res => {
        console.log(res.data)
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://10.199.14.46:8006/api/satuan-kerja/' + index[0], {
          id: index[0],
          id_satker: index[1],
          nama: index[2],
          level_unit: index[3],
          id_induk_satker: index[4],
          id_jns_satker: index[5],
          create_date: index[6],
          last_update: index[7],
          expired_date: index[8]
        }).then(res => {
          console.log(res.data)
        })
      })
    },

    // fungsi delete row
    deleteRow (instance, row) {
      axios.get('http://10.199.14.46:8006/api/satuan-kerja/').then(res => {
        var index = Object.values(res.data[row])

        console.log(row)
        axios.delete('http://10.199.14.46:8006/api/satuan-kerja/' + index[0])
      })
    }
  },

  computed: {
    jexcelOptions () {
      return {
        allowToolbar: true,
        url: 'http://10.199.14.46:8006/api/satuan-kerja/',
        onchange: this.updateRow,
        oninsertrow: this.insertRow,
        ondeleterow: this.deleteRow,
        search: true,
        pagination: 50,
        responsive: true,
        columns: [
          { type: 'hidden', title: 'id', width: '10px' },
          { type: 'text', title: 'id Satuan Kerja', width: '200px' },
          { type: 'text', title: 'Nama', width: '100px' },
          { type: 'numeric', title: 'Level Unit', width: '100px' },
          { type: 'text', title: 'id Induk Satuan Kerja', width: '200px' },
          { type: 'dropdown', title: 'Jenis Satuan Kerja', width: '100px', url: 'http://10.199.14.46:8006/api/jenis-satuan-kerja-list/' },
          { type: 'calendar', title: 'Create_Date', width: '150px', options: { format: 'DD/MM/YYYY HH:MI:SS', time: 1 }, today: 1 },
          { type: 'calendar', title: 'Last_Update', width: '150px', options: { format: 'DD/MM/YYYY HH:MI:SS', time: 1 }, today: 1 },
          { type: 'calendar', title: 'Expired_Date', width: '150px', options: { format: 'DD/MM/YYYY HH:MI:SS', time: 1 }, today: 1 }
        ],
        updateTable: function(instance, cell, col, row, val, label, cellName) {
          if (row % 2) {
            cell.style.backgroundColor = '#edf3ff'
          }
        }
      }
    }
  }
}

</script>
