<template>
  <div>

    <div v-if="users">
      <div>
        <button @click="setPaginatonMode('static')"><span>Static Pagination</span></button>
        <button @click="setPaginatonMode('infinite')"><span>Infinite Pagination</span></button>
      </div>

      <TableStructure :rows="users">
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

      <Paginator
        v-if="isStaticMode"
        :currentPage="currentPage"
        :lastPage="pageCount"
        :entriesPerPage="entriesPerPage"
        @goto-page="gotoPage"
        @entries-perpage-changes="changeEntriesPerPage"
      />
    </div>

    <div v-else>
      Loading ...
    </div>
    <div v-if="users && !users.length">
      <p>There is no data</p>
    </div>
  </div>
</template>

<script>
  import api from '@/api';
  import TableStructure from '@/components/spreadsheet/TableStructure.vue';
  import Column from '@/components/spreadsheet/Column.vue';
  import Paginator from '@/components/spreadsheet/Paginator.vue';

  export default {
    name: 'Spreadsheet',
    components: {
      TableStructure,
      Column,
      Paginator,
    },
    async created() {
      const data = await api.getUsersData();
      this.users = data.users;
      this.pageCount = data.count;
    },
    data: () => ({
      users: null,
      currentPage: 1,
      entriesPerPage: 20,
      pageCount: null,
      paginationMode: null,
    }),
    computed: {
      isStaticMode() {
        return this.paginationMode === 'static';
      },
    },
    watch: {
      async paginationMode(mode) {
        this.users = null;
        this.currentPage = 1;
        this.entriesPerPage = 20;
        let data = null;
        switch (mode) {
          case 'static':
            data = await api.getUsersData({_page: this.currentPage, _limit: this.entriesPerPage,});
            this.users = data.users
            this.pageCount = data.count;
            break;
          case 'infinite':
            break;
          default:
            data = await api.getUsersData();
            this.users = data.users
            this.pageCount = data.count;
        }
      },
    },
    methods: {
      setPaginatonMode(mode) {
        this.paginationMode === mode
          ? this.paginationMode = null
          : this.paginationMode = mode;
      },
      async gotoPage(page) {
        const data = await api.getUsersData({_page: page, _limit: this.entriesPerPage,});
        this.users = data.users
        this.pageCount = data.count;
        this.currentPage = page;
      },
      async changeEntriesPerPage(amount) {
        this.entriesPerPage = amount;
        const data = await api.getUsersData({_page: 1, _limit: this.entriesPerPage,});
        this.currentPage = 1;
        this.users = data.users;
        this.pageCount = data.count;
      }
    },
  };
</script>

<style scoped>
</style>
