<template>
  <section class="content">
    <div class="container">
      <div class="row">
        <div>
          <div id="app" ref="spreadsheet"></div>
          <div class="col-md-11">
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
    // fungsi delete row
    deleteRow (instance, row) {
      axios.get('http://10.199.14.46:8006/api/indikator-satuan-kerja-log/').then(res => {
        var index = Object.values(res.data[row])

        console.log(row)
        axios.delete('http://10.199.14.46:8006/api/indikator-satuan-kerja-log/' + index[0])
      })
    }
  },

  computed: {
    jexcelOptions () {
      return {
        allowToolbar: true,
        url: 'http://10.199.14.46:8006/api/indikator-satuan-kerja-log/',
        ondeleterow: this.deleteRow,
        search: true,
        pagination: 10,
        responsive: true,
        columns: [
          { type: 'hidden', title: 'id', width: '10px' },
          { type: 'text', title: 'Indikator Satuan Kerja', width: '150px', url: 'http://10.199.14.46:8006/api/indikator-satuan-kerja-list/' },
          { type: 'text', title: 'Periode', width: '150px', url: 'http://10.199.14.46:8006/api/periode-list/' },
          { type: 'text', title: 'Master Indikator', width: '150px', url: 'http://10.199.14.46:8006/api/master-indikator-list/' },
          { type: 'text', title: 'Satuan Kerja', width: '150px', url: 'http://10.199.14.46:8006/api/satuan-kerja-list/' },
          { type: 'numeric', title: 'Capaian', width: '150px' },
          { type: 'text', title: 'Create_Date', width: '200px' }
        ]
      }
    }
  }
}

</script>
