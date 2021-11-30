<template>
  <div id="app">
    <h2 class="page-title">Users Table</h2>
    <Spreadsheet />
  </div>
</template>

<script>
  import Spreadsheet from '@/components/spreadsheet';

  export default {
    name: 'App',
    components: {
      Spreadsheet,
    },
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .page-title {
    margin: 0;
    padding: 1em 0;
    text-align: center;
  }
</style>
