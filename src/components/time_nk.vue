<template>
    <span>
        {{time_str}}
    </span>
</template>
<script>
/* eslint-disable */
import { timeToStr } from './utils.js'
import {ref} from 'vue'

export default {
    props: ['time'],
    setup(props){
      const time_str = ref(timeToStr(props.time))

      return {
        time_str
      }
    }
}
</script>
<style scoped>
    span {
        color:aqua;
        width: 6em;
    }
</style>