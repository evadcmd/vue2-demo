<template>
  <date-picker
    v-model="range"
    mode="dateTime"
    is24hr
    is-range
    :minute-increment="5"
    :columns="$screens({default: 1, lg: 2})"
  >
    <template v-slot="{inputValue, inputEvents}">
      <div class="datetime-range-picker">
        <input
          class="form-control"
          :value="inputValue.start"
          v-on="inputEvents.start"
        />
        <svg class="svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
        <input
          class="form-control"
          :value="inputValue.end"
          v-on="inputEvents.end"
        />
        <button class="btn btn-outline-primary">update</button>
      </div>
    </template>
  </date-picker>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
  name: 'PickerDate',
  components: {DatePicker},
  data() {
    return {
      range: {
        start: new Date(2020, 0, 1),
        end: new Date(2020, 0, 5),
      },
    }
  },
}
</script>

<style scoped lang="scss">
.datetime-range-picker {
  display: flex;
  align-items: stretch;
  height: calc(1.5em + 0.75rem + 2px);
  > * {
    border-radius: 0%;
  }
  > *:first-child {
    border-radius: 0.25rem 0 0 0.25rem;
  }
  > *:last-child {
    border-radius: 0 0.25rem 0.25rem 0;
  }
  > svg {
    border: {
      style: solid;
      color: silver;
      width: 1px 0;
    }
    height: calc(1.5em + 0.75rem + 2px);
  }
  > input:hover {
    border-color: #80bdff;
  }
}
</style>
