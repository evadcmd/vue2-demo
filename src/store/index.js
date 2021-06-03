import Vue from 'vue'
import Vuex from 'vuex'

import {FETCH_APP_LIST} from './type-action'
import {
  SET_APP_LIST,
  SET_SORT_CRITERION,
  SET_FILTER_CRITERION,
  TOGGLE_SHOW_MY_APP,
} from './type-mutation'

import {DEFAULT_APP_LIST} from './const-demo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {id: 1},
    app: {
      list: DEFAULT_APP_LIST,
      fields: [
        {key: 'id', name: 'ID'},
        {key: 'name', name: 'APP名'},
        {key: 'summary', name: 'サマリー'},
      ],
      datetimeRange: {
        from: new Date(),
        to: new Date(),
      },
      showMyApp: false,
      filter: {
        by: 'id',
        criterion: '',
      },
      order: {
        by: 'id',
        asc: 1,
      },
      pagination: {
        pageNo: 0,
        itemsPerPage: 10,
      },
    },
  },
  getters: {
    items({app: {list, showMyApp, filter, order}, user}) {
      const filteredList = list.filter(
        app =>
          (!showMyApp || app.maintainerId === user.id) &&
          app[filter.by].toString().includes(filter.criterion)
      )
      const isNumeric = !isNaN(list[0]?.[order.by])
      return filteredList.sort(
        (a, b) =>
          order.asc *
          (isNumeric
            ? a[order.by] - b[order.by]
            : a[order.by].localeCompare(b[order.by]))
      )
    },
    fieldKeyToName({app: {fields}}) {
      return fields.reduce((map, field) => {
        map[field.key] = field.name
        return map
      }, {})
    },
  },
  mutations: {
    [SET_APP_LIST]({app}, list) {
      app.list = list
    },
    [SET_SORT_CRITERION]({app}, orderBy) {
      const {order} = app
      app.order = {
        by: orderBy,
        asc: order.by === orderBy ? -order.asc : 1,
      }
    },
    [SET_FILTER_CRITERION]({app}, filter) {
      app.filter = filter
    },
    [TOGGLE_SHOW_MY_APP]({app}) {
      app.showMyApp = !app.showMyApp
    },
  },
  actions: {
    [FETCH_APP_LIST]({commit}) {
      fetch('api/apps')
        .then(resp => resp.json())
        .then(appList => commit(SET_APP_LIST, appList))
    },
  },
  modules: {},
})
