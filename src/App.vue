<template>
  <div id="app">
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
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
