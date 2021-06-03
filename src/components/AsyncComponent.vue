<template>
  <!-- a sample component for Jest to test -->
  <div>
    <span>count:{{ count }}</span>
    <button @click="increment">increment</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      count: null,
    }
  },
  mounted() {
    axios.get('/api/count').then(({count}) => (this.count = count))
  },
  methods: {
    increment() {
      this.count++
    },
  },
}
</script>
