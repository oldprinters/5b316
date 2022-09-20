<template>
  <div class="container">
    <h4 class="text-success">5Б 316 школа СПб</h4>
    <rasp size="sm"></rasp>
  </div>
</template>
<script>
//    <b-button variant="outline-primary" squared>Настройки</b-button>

import rasp from './components/rasp.vue'

export default {
  name: 'App',
  components: { rasp }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 1rem 0;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(20, 20, 20);
}
</style>
