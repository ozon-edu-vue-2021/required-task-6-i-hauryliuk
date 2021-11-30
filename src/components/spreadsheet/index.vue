<template>
  <div>
    <div class="content" v-if="users">
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

      <div v-if="isInfiniteMode" v-observe-visibility="visibilityChanged"></div>
    </div>

    <LoadIndicator  v-if="loading" />

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
  import LoadIndicator from '@/components/LoadIndicator.vue';

  const INIT_CURRENT_PAGE = 1;
  const INIT_ENTRIES_PER_PAGE = 20;
  const STATIC_MODE = 'static';
  const INFINITE_MODE = 'infinite';

  export default {
    name: 'Spreadsheet',
    components: {
      TableStructure,
      Column,
      Paginator,
      LoadIndicator,
    },
    async created() {
      await this.fetchData();
    },
    data: () => ({
      users: null,
      currentPage: INIT_CURRENT_PAGE,
      entriesPerPage: INIT_ENTRIES_PER_PAGE,
      pageCount: null,
      paginationMode: null,
      loading: false,
    }),
    computed: {
      isStaticMode() {
        return this.paginationMode === STATIC_MODE;
      },
      isInfiniteMode() {
        return this.paginationMode === INFINITE_MODE;
      },
    },
    methods: {
      async fetchData(params) {
        this.loading = true;
        const data = await api.getUsersData(params);
        this.loading = false;
        this.isInfiniteMode && this.users ? this.users.push(...data.users) : this.users = data.users;
        this.pageCount = data.count;
      },
      async setPaginatonMode(mode) {
        this.paginationMode === mode
          ? this.paginationMode = null
          : this.paginationMode = mode;
        this.users = null;
        this.currentPage = INIT_CURRENT_PAGE;
        this.entriesPerPage = INIT_ENTRIES_PER_PAGE;
        switch (this.paginationMode) {
          case STATIC_MODE:
            await this.fetchData({_page: this.currentPage, _limit: this.entriesPerPage,});
            break;
          case INFINITE_MODE:
            await this.fetchData({_page: this.currentPage, _limit: this.entriesPerPage,});
            break;
          default:
            await this.fetchData();
        }
      },
      async gotoPage(page) {
        await this.fetchData({_page: page, _limit: this.entriesPerPage,});
        this.currentPage = page;
      },
      async changeEntriesPerPage(amount) {
        await this.fetchData({_page: 1, _limit: amount,});
        this.currentPage = 1;
        this.entriesPerPage = amount;
      },
      async visibilityChanged(isVisible) {
        if (isVisible && this.currentPage < this.pageCount) {
          this.currentPage++;
          await this.fetchData({_page: this.currentPage, _limit: this.entriesPerPage,});
        }
      },
    },
  };
</script>

<style scoped>
  .content {
    padding-bottom: 6px;
  }
</style>
