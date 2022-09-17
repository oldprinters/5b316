<template>
  <div class="container">
    <rasp></rasp>
  </div>
</template>
<script>
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: rgb(20, 20, 20);
}
</style>
