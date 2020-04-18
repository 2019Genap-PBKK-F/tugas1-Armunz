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
      axios.post('http://10.199.14.46:8006/api/indikator-satuan-kerja/').then(res => {
        console.log(res.data)
      })
    },

    // fungsi update Row
    updateRow (instance, cell, columns, row, value) {
      axios.get('http://10.199.14.46:8006/api/indikator-satuan-kerja/').then(res => {
        console.log(res.data)
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://10.199.14.46:8006/api/indikator-satuan-kerja/' + index[0], {
          id: index[0],
          id_periode: index[1],
          id_master: index[2],
          id_satker: index[3],
          bobot: index[4],
          target: index[5],
          capaian: index[6],
          last_update: index[7]
        }).then(res => {
          console.log(res.data)
        })
      })
    },

    // fungsi delete row
    deleteRow (instance, row) {
      axios.get('http://10.199.14.46:8006/api/indikator-satuan-kerja/').then(res => {
        var index = Object.values(res.data[row])

        console.log(row)
        axios.delete('http://10.199.14.46:8006/api/indikator-satuan-kerja/' + index[0])
      })
    }
  },

  computed: {
    jexcelOptions () {
      return {
        allowToolbar: true,
        url: 'http://10.199.14.46:8006/api/indikator-satuan-kerja/',
        onchange: this.updateRow,
        oninsertrow: this.insertRow,
        ondeleterow: this.deleteRow,
        search: true,
        pagination: 10,
        responsive: true,
        columns: [
          { type: 'hidden', title: 'id', width: '10px' },
          { type: 'dropdown', title: 'Periode', width: '100px', url: 'http://10.199.14.46:8006/api/periode-list/' },
          { type: 'dropdown', title: 'Master Indikator', width: '110px', url: 'http://10.199.14.46:8006/api/master-indikator-list/' },
          { type: 'dropdown', title: 'Satuan Kerja', width: '100px', url: 'http://10.199.14.46:8006/api/satuan-kerja-list/' },
          { type: 'numeric', title: 'Bobot', width: '80px' },
          { type: 'numeric', title: 'Target', width: '80px' },
          { type: 'numeric', title: 'Capaian', width: '80px' },
          { type: 'calendar', title: 'Last_Update', width: '150px', options: { format: 'DD/MM/YYYY HH:MI:SS', time: 1 }, today: 1 }
        ]
      }
    }
  }
}

</script>
