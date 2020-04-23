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
      axios.post('http://10.199.14.46:8006/api/master-indikator/').then(res => {
        console.log(res.data)
      })
    },

    // fungsi update Row
    updateRow (instance, cell, columns, row, value) {
      axios.get('http://10.199.14.46:8006/api/master-indikator/').then(res => {
        console.log(res.data)
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://10.199.14.46:8006/api/master-indikator/' + index[0], {
          id: index[0],
          id_aspek: index[1],
          id_komponen_aspek: index[2],
          nama: index[3],
          deskripsi: index[4],
          id_pembilang: index[5],
          id_penyebut: index[6],
          default_bobot: index[7],
          create_date: index[8],
          last_update: index[9],
          expired_date: index[10]
        }).then(res => {
          console.log(res.data)
        })
      })
    },

    // fungsi delete row
    deleteRow (instance, row) {
      axios.get('http://10.199.14.46:8006/api/master-indikator/').then(res => {
        var index = Object.values(res.data[row])

        console.log(row)
        axios.delete('http://10.199.14.46:8006/api/master-indikator/' + index[0])
      })
    }
  },
  computed: {
    jexcelOptions () {
      return {
        allowToolbar: true,
        url: 'http://10.199.14.46:8006/api/master-indikator/',
        onchange: this.updateRow,
        oninsertrow: this.insertRow,
        ondeleterow: this.deleteRow,
        search: true,
        pagination: 30,
        responsive: true,
        columns: [
          { type: 'hidden', title: 'id', width: '10px' },
          { type: 'dropdown', title: 'Aspek', width: '100px', url: 'http://10.199.14.46:8006/api/aspek-list/' },
          { type: 'dropdown', title: 'Komponen Aspek', width: '100px', url: 'http://10.199.14.46:8006/api/komponen-aspek-list/' },
          { type: 'text', title: 'Nama Indikator', width: '200px' },
          { type: 'text', title: 'Deskripsi Indikator', width: '200px' },
          { type: 'dropdown', title: 'Pembilang', width: '100px', url: 'http://10.199.14.46:8006/api/data-dasar-list/' },
          { type: 'dropdown', title: 'Penyebut', width: '100px', url: 'http://10.199.14.46:8006/api/data-dasar-list/' },
          { type: 'numeric', title: 'Default_Bobot', width: '50px' },
          { type: 'calendar', title: 'Create_Date', width: '100px', options: { format: 'DD/MM/YYYY HH:MI:SS', time: 1 }, today: 1 },
          { type: 'calendar', title: 'Last_Update', width: '150px', options: { format: 'DD/MM/YYYY HH:MI:SS', time: 1 }, today: 1 },
          { type: 'calendar', title: 'Expired_Date', width: '100px', options: { format: 'DD/MM/YYYY HH:MI:SS', time: 1 }, today: 1 }
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
