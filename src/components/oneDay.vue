<template>
  <div class="px-0 px-sm-3 col-12 col-md-4 col-lg-3" @click="clickOneDay">
    <div :class="['text-center row mt-1', { 'color_dn_off': dN, 'color_dn_on': !dN}]">
      <h5 class="offcanvas-title col" id="offcanvasLabel">{{ rasp.dn }}</h5><span v-if="dN" class="col mt-1" style="color: #bdffbf">{{tDate}}</span>
    </div>
    <div class="row" role="button">
      <ul class="col-12">
        <li v-for="(el, w1) in rasp.events" :key="el.time[0]" class="position-relative">
          <time_nk :time="el.time" :lesson="el.lesson && dN" :prm="el.prm" />
          <span :style="{'color':el.color}">{{ el.name }}</span>
          <div class="position-absolute translate-middle bg-secondary" :style="[{'z-index': 100}, {'width': w1*10}, {'height': '1.4rem'}, {'top': '50%'}, {'left': w1*5}]"></div>
        </li>

      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import time_nk from './time_nk.vue'
import { ref } from 'vue'

export default {
  name: 'oneDay',
  components: {time_nk},
  props: ['rasp'],
  setup(props){
    const tDate = ref('')
    const tDn = ref(new Date().getDay() - 1)
    const tTime = ref(false)
    const dN = ref(false)
    console.log("rasp", props.rasp)

    //--------------------------
    const clickOneDay = () => {
      const t = getDate()
      for(let i in props.rasp.events){
        const el = props.rasp.events[i]
        const t0 = new Date(el.time[0])
        const t1 = new Date(el.time[1])
        if((t > t0) && (t < t1)){
          el.lesson = true
        } else {
          el.lesson = false
          if(i > 0){
            const t1 = new Date(props.rasp.events[i - 1].time[1])
            if((t > t1) && (t < t0))
                el.prm = true
            else
                el.prm = false
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

    if(tDn.value == props.rasp.nDN){
      dN.value = true
      getDate()
    }

    return {
      clickOneDay,
      dN,
      tDate
    }
  },
  // data: function(){
  //   this.dayNed = new Date().getDay()
  //   // console.log(this.rasp, this.dayNed)
  //   return {
  //     dN: (this.dayNed-1 == this.rasp.nDN || (!this.dayNed && this.rasp.nDN==6))
  //   }
  // }
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