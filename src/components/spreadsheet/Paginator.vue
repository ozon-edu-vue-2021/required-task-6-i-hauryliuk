<template>
  <div>
    <div>
      <button @click="gotoPageClickHandler(1)">First</button>
      <button @click="gotoPageClickHandler(currentPage - 1)">Prev</button>
      <span>{{ currentPage }} {{ lastPage ? `from ${lastPage}` : '' }}</span>
      <button @click="gotoPageClickHandler(currentPage + 1)">Next</button>
      <button @click="gotoPageClickHandler(lastPage)">Last</button>
    </div>
    <div>
      <select @change="entriesChangeHandler">
        <option :selected="entriesPerPage === 10">10</option>
        <option :selected="entriesPerPage === 20">20</option>
        <option :selected="entriesPerPage === 30">30</option>
        <option :selected="entriesPerPage === 40">40</option>
        <option :selected="entriesPerPage === 50">50</option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Paginator',
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      lastPage: {
        type: [Number, Object],
        default: null,
      },
      entriesPerPage: {
        type: Number,
        required: true,
      }
    },
    methods: {
      gotoPageClickHandler(page) {
        if (this.currentPage === page || page <= 0 || page > this.lastPage) return;
        this.$emit('goto-page', page);
      },
      entriesChangeHandler(event) {
        const ops = event.target.options;
        this.$emit('entries-perpage-changes', Number(ops[ops.selectedIndex].text));
      },
    },
  };
</script>

<style scoped>

</style>
