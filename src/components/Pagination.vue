<template>
  <transition :name="transitionName" mode="out-in">
    <ul class="pagination pagination-sm" :key="frameIndex">
      <li class="page-item" key="Previous">
        <div class="page-link" @click="prev">
          <span aria-hidden="true">&laquo;</span>
        </div>
      </li>
      <li
        class="page-item"
        v-for="i of frame"
        :key="i"
        :class="{active: pageNo === i}"
        @click="pageNo = i"
      >
        <div class="page-link">{{ i }}</div>
      </li>
      <li class="page-item" key="Next">
        <div class="page-link" @click="next">
          <span aria-hidden="true">&raquo;</span>
        </div>
      </li>
    </ul>
  </transition>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      pages: 100,
      pagesPerFrame: 10,
      frameIndex: 0,
      pageNo: 0,
      transitionName: 'slide-right',
    }
  },
  methods: {
    next() {
      const next = this.frameIndex + 1
      if (next * this.pagesPerFrame < this.pages) {
        this.frameIndex = next
        this.transitionName = 'slide-left'
      }
    },
    prev() {
      if (this.frameIndex) {
        this.frameIndex--
        this.transitionName = 'slide-right'
      }
    },
  },
  computed: {
    maxFrameIndex() {
      return Math.ceil(this.pages / this.pagesPerFrame)
    },
    frame() {
      const frame = []
      const offset = this.frameIndex * this.pagesPerFrame
      for (let i = 1; i <= this.pagesPerFrame; i++) {
        frame.push(offset + i)
      }
      return frame
    },
  },
}
</script>

<style scoped lang="scss">
ul {
  margin: {
    top: 0.5rem;
    bottom: 0.5rem;
  }
}
.page-link {
  cursor: pointer;
}
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
</style>
