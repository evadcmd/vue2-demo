<template>
  <section>
    <table class="table table-hover">
      <thead class="thead-light">
        <tr>
          <th
            v-for="field of fields"
            :key="field.key"
            @click="sort(field.key)"
            class="pointer"
          >
            {{ field.name }}
          </th>
          <th>
            <check-box label="自分のアプリのみ" />
          </th>
        </tr>
      </thead>
      <transition-group name="flip-list" tag="tbody">
        <tr v-for="item of items" :key="item.id">
          <td v-for="field of fields" :key="field.key">
            {{ item[field.key] }}
          </td>
          <td>
            <button
              v-if="user.id === item.maintainerId"
              class="btn btn-outline-primary btn-sm"
            >
              編集
            </button>
          </td>
        </tr>
      </transition-group>
    </table>
  </section>
</template>

<script>
import CheckBox from '@/components/CheckBox'
import {mapState, mapGetters, mapMutations} from 'vuex'
import {SET_SORT_CRITERION} from '@/store/type-mutation'

export default {
  name: 'TableApp',
  components: {CheckBox},
  computed: {
    ...mapState({
      user: ({user}) => user,
      fields: ({app}) => app.fields,
    }),
    ...mapGetters(['items']),
  },
  methods: mapMutations({
    sort: SET_SORT_CRITERION,
  }),
}
</script>

<style scoped lang="scss">
section {
  border: {
    style: solid;
    width: 1px;
    color: silver;
    radius: 0.25rem;
  }
}
.pointer {
  cursor: pointer;
}
table {
  margin: 0;
  &.table > tbody > tr > td {
    vertical-align: middle;
  }
  .flip-list-move {
    transition: transform 0.3s ease;
  }
  .flip-list-enter-active {
    transition: all 0.2s ease-out;
  }
  .flip-list-leave-active {
    transition: all 0.2s ease-in;
  }
  .flip-list-enter,
  .flip-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
