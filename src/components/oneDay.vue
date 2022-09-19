<template>
    <div :class="['text-center row mt-1', { 'color_dn_off': dN, 'color_dn_on': !dN}]">
      <h5 class="offcanvas-title col" id="offcanvasLabel">{{ rasp.dn }}</h5><span v-if="dN" class="col mt-1" style="color: #bdffbf">{{tDate}}</span>
    </div>
      <ul class="row" @click="clickOneDay">
        <li v-for="el in rasp.events" :key="el.time[0]" :class="['position-relative col-12', {'border-top border-success border-4': el.prm}]">
          <time_nk :time="el.time" :lesson="el.lesson && dN" />
          <span :style="{'color':el.color, 'z-index': 101}">{{ el.name }}</span>
          <div 
            v-if="el.lesson"
            class="position-absolute translate-middle" 
            :style="[{'z-index': 100}, {'width': w1*2+'%'}, {'height': '1.4rem'}, {'top': '50%'}, {'left': w1+'%'}, {'background-color': '#02979799'}]"
          >
          </div>
        </li>
      </ul>
</template>
<script>
/* eslint-disable */
import time_nk from './time_nk.vue'
import { onMounted, ref } from 'vue'

export default {
  name: 'oneDay',
  components: {time_nk},
  props: ['rasp'],
  setup(props){
    const tDate = ref('')
    const tDn = ref(new Date().getDay() - 1)
    const tTime = ref(false)
    const dN = ref(false)
    const w1 = ref(0)
    // console.log("rasp", props.rasp)
    if(tDn.value < 0)
      tDn.value = 6
    //--------------------------
    const clickOneDay = () => {
      if(dN.value){
        const t = getDate()
        for(let i in props.rasp.events){
          const el = props.rasp.events[i]
          const t0 = new Date(el.time[0])
          const t1 = new Date(el.time[1])
          if((t > t0) && (t < t1)){
            el.lesson = true
            w1.value = ((t - t0)/1200)/((t1-t0)/60000)
            setTimeout( () => {w1.value = 0}, 5000)
          } else {
            el.lesson = false
            if(i > 0){
              const t1 = new Date(props.rasp.events[i - 1].time[1])
              if((t > t1) && (t < t0)){
                  el.prm = true
                  setTimeout( () => {el.prm = false}, 5000)
              } else
                  el.prm = false
            }
          }
        }
      }
    }
    //--------------------------
    const getDate = () => {
      const t = new Date()
      const m = t.getMonth() + 1
      tDate.value = t.getDate() + '.' + (m > 9? '': '0') + m + '.' + t.getFullYear()
      return t
    }
    // console.log("### tDn, props.rasp.nDN", tDn.value, props.rasp.nDN)
    if(tDn.value == props.rasp.nDN){
      dN.value = true
      getDate()
    }

    onMounted(clickOneDay)

    return {
      clickOneDay,
      dN,
      tDate,
      w1
    }
  },
}
</script>
<style scoped>
  .color_dn_off {
    background-color: #014c44;
    color: #86e789;
  }
  .color_dn_on {
    background-color: cyan;
    color: #034e4e;
  }
  li {
    display: flex;
    justify-content: space-between;
  }
  ul {
    padding: 0.3em;
  }
</style>