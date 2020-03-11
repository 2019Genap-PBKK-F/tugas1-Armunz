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
      axios.post('http://10.199.14.46:8006/api/mahasiswa/').then(res => {
        console.log(res.data)
      })
    },

    // fungsi update Row
    updateRow (instance, cell, columns, row, value) {
      axios.get('http://10.199.14.16:8006/api/mahasiswa/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://10.199.14.46:8006/api/mahasiswa/' + index[0], {
          id: index[0],
          nrp: index[1],
          nama: index[2],
          angkatan: index[3],
          jenis_kelamin: index[4],
          tanggal_lahir: index[5],
          foto: index[6],
          aktif: index[7]
        }).then(res => {
          console.log(res.data)
        })
      })
    },

    // fungsi delete row
    deleteRow (instance, row) {
      axios.get('http://10.199.14.46:8006/api/mahasiswa/').then(res => {
        var index = Object.values(res.data[row])

        console.log(row)
        axios.delete('http://10.199.14.46:8006/api/mahasiswa/' + index[0])
      })
    }
  },

  computed: {
    jexcelOptions () {
      return {
        allowToolbar: true,
        url: 'http://10.199.14.46:8006/api/mahasiswa/',
        onchange: this.updateRow,
        oninsertrow: this.insertRow,
        ondeleterow: this.deleteRow,
        search: true,
        pagination: 10,
        columns: [
          { type: 'hidden', title: 'id', width: '10px' },
          { type: 'text', title: 'NRP', width: '120px' },
          { type: 'text', title: 'Nama', width: '200px' },
          { type: 'text', title: 'Angkatan', width: '80px' },
          { type: 'dropdown', title: 'Jenis Kelamin', width: '120px', source: [ 'Laki-laki', 'Perempuan' ], autocomplete: true },
          { type: 'calendar', title: 'Tanggal Lahir', width: '120px' },
          { type: 'image', title: 'Photo', width: '120px' },
          { type: 'checkbox', title: 'Aktif', width: '80px' }
        ]
      }
    }
  }
}

</script>
