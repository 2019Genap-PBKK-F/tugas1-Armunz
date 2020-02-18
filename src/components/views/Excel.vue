<template>
    <!-- <div ref="spreadsheet"></div> -->
    <div>
      <input type="button" value="Add new row" class="btn btn-info" @click="() => spreadsheet.insertRow()"/>
      <input type="submit" name="blabla" id="bla" value="Insert Data" class="btn btn-info">
      </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
var data = [
  ['Dwi Prasetya Armunanta', '05111740000025', '1998-05-10', '', true],
  ['Hendra Ramadani', '05111740000055', '1998-29-10', '', true]
]

var options = {
  data: data,
  allowToolbar: true,
  columns: [
    { type: 'text', title: 'Nama Mahasiswa', width: '120px' },
    { type: 'numeric', title: 'NRP', width: '250px' },
    { type: 'calendar', title: 'Tanggal Lahir', width: '250px' },
    { type: 'image', title: 'Photo', width: '120px' },
    { type: 'checkbox', title: 'Status', width: '80px' }
  ]
}

export default {
  name: 'Jexcel',
  mounted: function () {
    let spreadsheet = jexcel(this.$el, options)
    Object.assign(this, { spreadsheet })
  }
}

</script>
