<template>
  <div class="form-check form-check-inline" @click="toggle">
    <input class="form-check-input" type="checkbox" :checked="value" />
    <label class="form-check-label" :class="{activated: value}">{{
      label
    }}</label>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {TOGGLE_SHOW_MY_APP} from '@/store/type-mutation'
export default {
  props: ['label'],
  computed: mapState({value: ({app}) => app.showMyApp}),
  methods: mapMutations({toggle: TOGGLE_SHOW_MY_APP}),
}
</script>

<style scoped lang="scss">
.activated {
  color: #007bff;
}
.form-check,
.form-check-inline,
.form-check-input,
.form-check-label {
  cursor: pointer;
}
</style>
