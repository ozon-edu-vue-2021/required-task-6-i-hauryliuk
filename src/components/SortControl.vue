<template>
  <button class="sort-btn" @click="sortClickHandler">
    <svg class="icon" :class="{'icon_asc-active': isAscSorting}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path fill="currentColor" d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
    </svg>
    <svg class="icon" :class="{'icon_desc-active': isDescSorting}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
      <path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'SortControl',
  props: {
    field: {
      type: String,
      required: true,
    },
  },
  inject: ['sortOptions'],
  computed: {
    isAscSorting() {
      return this.field === this.sortOptions.field && this.sortOptions.direction === 'asc';
    },
    isDescSorting() {
      return this.field === this.sortOptions.field && this.sortOptions.direction === 'desc';
    },
  },
  methods: {
    sortClickHandler() {
      this.$emit('sorting-initiated', this.field);
    },
  },
}
</script>

<style scoped>
.sort-btn {
  position: absolute;
  top: 50%;
  right: 0;
  width: 1em;
  height: 1em;
  padding: 0;
  border: none;
  transform: translateY(-50%);
  color: inherit;
  background-color: transparent;
  cursor: pointer;
}

.icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  color: inherit;
  opacity: 0.4;
}

.icon_asc-active,
.icon_desc-active {
  opacity: 1;
}
</style>