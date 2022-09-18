<template>
    <div class="row">
      <div v-for="one_day in arrWeek" v-bind:key="one_day.dn" ref="od" class="col-12 col-md-4 col-lg-3" >
        <oneDay :rasp="one_day" />
      </div>
    </div>
  </template>
<script>
/* eslint-disable */
import { nextTick, onMounted, ref} from 'vue'
import {toSimbol, getArTimes, getArTimesStr, insertTime, urTimeText, urTimesToText } from './utils.js'
import oneDay from './oneDay'
// import data from 'bootstrap/js/dist/dom/data'
    export default {
      name: 'rasp',
      components: {oneDay},
      setup(){
        const od = ref([])

        const arrWeek = ref([])
        const arTimes = ref([])
        const ur_time = ref([
            [8, 35, 9, 20],
            [9, 30, 10, 15],
            [10, 25, 11, 10],
            [11, 30, 12, 15],
            [12, 35, 13, 20],
            [13, 30, 14, 15],
            [14, 25, 15, 10]
          ])
          const ur_names = ref([
  /*0*/        {name: '', color: '#ffffff'},
  /*1*/        {name: 'Окружающий мир', color: '#72f377'},
  /*2*/        {name: 'Русский язык', color: '#ffcccc'},
  /*3*/        {name: 'Физкультура', color: '#ccccff'},
  /*4*/        {name: 'Математика', color: '#fffccc'},
  /*5*/        {name: 'Ритмика', color: '#ec75f3'},
  /*6*/        {name: 'Лит. чтение', color: '#c7f38e'},
  /*7*/        {name: 'Изо', color: '#dfa3fd'},
  /*8*/        {name: 'Музыка', color: '#45e8cc'},
  /*9*/        {name: 'Технологии', color: '#ffffff'},
  /*10*/       {name: 'МТП', color: '#f97f58'},
  /*11*/       {name: 'Английский язык', color: '#1df3d7'},
  /*12*/       {name: 'Проекты', color: '#f3a52c'},
  /*13*/        {name: 'Классный час', color: '#777777'},
  /*14*/        {name: 'География', color: '#77ff77'},
  /*15*/        {name: 'История', color: '#7777ff'},
  /*16*/        {name: 'Биология', color: '#ff7777'},
  /*17*/        {name: 'ОДНКНР', color: '#11aa77'},
  /*18*/        {name: 'Функ. грамотность', color: '#22bb66'},
              ])
  
        const additional_lessons = ref([
          {dn: 2, time: ['19:10', '20:30'], name : 'Хореография', color: '#ffc107', lesson: false},
          {dn: 4, time: ['20:00', '21:20'], name : 'Хореография Пр.', color: '#ffc107', lesson: false},
          {dn: 3, time: ['17:45', '18:45'], name : 'Бассейн', color: '#87cfeb', lesson: false},
          {dn: 5, time: ['17:00', '18:10'], name : 'Хип-хоп', color: '#ffc107', lesson: false},
          {dn: 6, time: ['14:00', '15:00'], name : 'Вокал', color: '#f90e70', lesson: false},
          // {dn: 7, time: ['20:20', '21:05'], name : 'Test', color: 'red', lesson: false},
        ])

        const arRasp = ref([
          {dn: 'Понедельник', 'urok': [{ur: 1, name: 13},{ur: 2, name: 2}, {ur:3, name: 11}, {ur: 4, name: 14}, {ur: 5, name: 2}, {ur: 6, name: 15}, {ur: 7, name: 4}]},
          {dn: 'Вторник', 'urok': [{ur: 1, name: 0}, {ur: 2, name: 2}, {ur:3, name: 9}, {ur: 4, name: 7}, {ur: 5, name: 4}, {ur: 6, name: 2}, {ur: 7, name: 3}]},
          {dn: 'Среда', 'urok': [{ur: 1, name: 4},{ur: 2, name: 11}, {ur:3, name: 2}, {ur: 4, name: 15}, {ur: 5, name: 16}, {ur: 6, name: 8}]},
          {dn: 'Четверг', 'urok': [{ur: 1, name: 11},{ur: 2, name: 17}, {ur:3, name: 2}, {ur: 4, name: 4}, {ur: 5, name: 11}]},
          {dn: 'Пятница', 'urok': [{ur: 1, name: 2},{ur: 2, name: 9}, {ur:3, name: 4}, {ur: 4, name: 6}, {ur: 5, name: 11}, {ur: 6, name: 3}, {ur: 7, name: 18}]},
          {dn: 'Суббота', 'urok': []},
          {dn: 'Воскресение', 'urok': []}
        ])

        arTimes.value = getArTimes(ur_time.value)

        arrWeek.value = arRasp.value.map((elWeek, i)=>{
          return {
            'nDN': i,
            'dn': elWeek.dn,  //TODO сделать ссылкой на массив названий
            'events': elWeek.urok.map((elDay)=>{
              return {
                'time': arTimes.value[elDay.ur-1],
                name: ur_names.value[elDay.name].name,
                color: ur_names.value[elDay.name].color
              }
            })
          }
        })

        additional_lessons.value.forEach(el => {
          let aaa = insertTime(arrWeek.value[el.dn-1].events, 
              {time: getArTimesStr(el.time), name: el.name, color: el.color, lesson: false}
            )
        });
        //--------------------------
        const f1 = () => {
          let dn = new Date().getDay() - 1
          if(dn < 0)dn = 6
          // console.log("@@@ od", od.value[dn])
          nextTick( () => {
            od.value[dn].scrollIntoView()
          })
        }

        onMounted(f1)

        return {
          additional_lessons,
          arRasp,
          arrWeek,
          od,
          ur_names,
          ur_time
        }
      }
    }
  </script>
  <style>
  ul {
    list-style: none;
  }
  .odin_urok li {
      display: flex;
      width: 18em;
      justify-content: space-between;
  }
  h3 {color: khaki;}
  label {color:aquamarine}
  </style>