<template>
  <div class="input-group" v-click-hide>
    <div class="input-group-prepend">
      <button
        class="btn btn-outline-primary dropdown-toggle"
        @click.stop="showDropdown = !showDropdown"
      >{{ fieldKeyToName[filter.by] }}</button>
      <transition name="fade">
        <div v-show="showDropdown" class="dropdown-menu">
          <div
            v-for="field of fields"
            :key="field.key"
            class="dropdown-item"
            @click="setFilterCriterion({by: field.key, criterion: ''})"
          >{{ field.name }}</div>
        </div>
      </transition>
    </div>
    <input
      type="text"
      class="form-control"
      :value="filter.criterion"
      @input="setFilterCriterion({by: filter.by, criterion: $event.target.value})"
    />
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
import {SET_FILTER_CRITERION} from '@/store/type-mutation'

export default {
  name: 'InputFilter',
  data() {
    return {
      index: 0,
      showDropdown: false,
    }
  },
  computed: {
    ...mapState({
      filter: ({app}) => app.filter,
      fields: ({app}) => app.fields,
    }),
    ...mapGetters(['fieldKeyToName']),
  },
  methods: {
    hide() {
      this.showDropdown = false
    },
    ...mapMutations({
      setFilterCriterion: SET_FILTER_CRITERION,
    }),
  },
  directives: {
    'click-hide': {
      bind(el, bindings, vm) {
        document.body.addEventListener('click', vm.context.hide)
      },
      unbind(el, bindings, vm) {
        document.body.removeEventListener('click', vm.context.hide)
      },
    },
  },
}
</script>

<style scoped>
.dropdown-menu {
  display: block;
}
.dropdown-item {
  cursor: pointer;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
