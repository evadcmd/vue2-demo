<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import {routes} from '@/router/index'

const pathToOrder = routes.reduce((map, route, i) => {
  map[route.path] = i
  return map
}, {})

export default {
  data() {
    return {
      transitionName: 'slide-left',
    }
  },
  watch: {
    $route(to, from) {
      this.transitionName =
        pathToOrder[to.path] < pathToOrder[from.path]
          ? 'slide-right'
          : 'slide-left'
    },
  },
}
</script>

<style lang="scss">
// -> enter
.slide-right-enter-active {
  transition: all 0.2s ease-out;
}
.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.slide-right-enter-to {
  opacity: 1;
  transform: translateX(0);
}
// -> leave
.slide-right-leave-active {
  transition: all 0.2s ease-in;
}
.slide-right-leave {
  opacity: 1;
  transform: translateX(0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

// <- enter
.slide-left-enter-active {
  transition: all 0.2s ease-out;
}
.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}
.slide-left-enter-to {
  opacity: 1;
  transform: translateX(0);
}
// <- leave
.slide-left-leave-active {
  transition: all 0.2s ease-in;
}
.slide-left-leave {
  opacity: 1;
  transform: translateX(0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
