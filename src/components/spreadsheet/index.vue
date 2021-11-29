<template>
  <div>
    <div v-if="!displayedEntry">
      Loading ...
    </div>
    <div v-else-if="!displayedEntry.length">
      <p>There is no data</p>
    </div>
    <div v-else>
      <div>
        <button @click="setPaginatonMode('static')"><span>Static Pagination</span></button>
        <button @click="setPaginatonMode('infinite')"><span>Infinite Pagination</span></button>
      </div>
      <TableStructure :rows="displayedEntry">
        <Column field="index" label="ID" />
        <Column field="name" label="Name" />
        <Column field="age" label="Age" />

        <Column field="email">
          <template #label>Email</template>

          <template #data="row">
            <a :href="`mailto:${row.email}`">{{ row.email }}</a>
          </template>
        </Column>

        <Column field="phone">
          <template #label>Phone</template>

          <template #data="row">
            <a :href="`tel:${row.phone.split(' ').join('')}`">{{ row.phone }}</a>
          </template>
        </Column>

        <Column field="company" label="Company" />
      </TableStructure>
    </div>
  </div>
</template>

<script>
  import TableStructure from '@/components/spreadsheet/TableStructure.vue';
  import Column from '@/components/spreadsheet/Column.vue';
  import api from '@/api';

  export default {
    name: 'Spreadsheet',
    components: {
      TableStructure,
      Column,
    },
    async created() {
      this.users = await api.getUsersData();
    },
    data: () => ({
      users: null,
      paginationMode: null,
    }),
    computed: {
      displayedEntry() {
        return this.users;
      },
    },
    methods: {
      setPaginatonMode(mode) {
        this.paginationMode === mode
          ? this.paginationMode = null
          : this.paginationMode = mode;
      },
    },
  };
</script>

<style scoped>
</style>
