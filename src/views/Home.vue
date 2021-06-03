<template>
  <b-container>
    <b-row>
      <b-col>
        <picker-date />
      </b-col>
      <b-col>
        <input-filter />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="d-flex flex-row-reverse">
        <pagination />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <table-app />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import PickerDate from '@/components/PickerDate.vue'
import InputFilter from '@/components/InputFilter.vue'
import Pagination from '@/components/Pagination.vue'
import TableApp from '@/components/TableApp.vue'

export default {
  name: 'Home',
  components: {
    PickerDate,
    InputFilter,
    Pagination,
    TableApp,
  },
}
</script>
