/* eslint-disable */
//utils.js
const toSimbol = (l) => {
    if(l > 9)
      return '' + l
    else if (l > 0)
      return '0' + l
    else 
      return '00'
  }
  //---------------------------------------------------
  const getArTimesStr = (arr) => {  //переводим в миллисекунды из текстового формата ['начало h:m','окончание h:m']
    let date1 = new Date
    let date2 = new Date
    date1.setHours(arr[0].substring(0,arr[0].indexOf(':')))
    date1.setMinutes(arr[0].substring(arr[0].indexOf(':')+1))
    date2.setHours(arr[1].substring(0,arr[1].indexOf(':')))
    date2.setMinutes(arr[1].substring(arr[1].indexOf(':')+1))
    return [date1.getTime(), date2.getTime()]
  }
  //----------------------------------------------------
  const insertTime = (urTimes, evTime) => {
    let n = urTimes.length
    for(; n > 0; n--){
      if(urTimes[n-1].time[1] < evTime.time[0]){
        urTimes.splice(n, 0, evTime)
        break
      } 
    }
    if(n == 0) urTimes.splice(n, 0, evTime)
    // console.log('urTimes =>', urTimes)
    return urTimes
  }
  //------------------------------------
  const getArTimes = (ur_time) => {  //переводим в секунды
    let date1 = new Date
    let date2 = new Date
    return ur_time.map((el)=>{
        date1.setHours(el[0], el[1])
        date2.setHours(el[2], el[3])
        return [date1.getTime(), date2.getTime()]
      })
  }
//-------------------------------
  const timeToStr = (el) => {
    let date0 = new Date(el[0])
    let date1 = new Date(el[1])
    return toSimbol(date0.getHours()) + ':' + toSimbol(date0.getMinutes()) + ' - ' + toSimbol(date1.getHours()) + ':' + toSimbol(date1.getMinutes())
  }
//---------------------------
  const urTimesToText = (ur_time) => {
    let date0 = new Date()
    let date1 = new Date()
    return ur_time.map((el)=>{
      date0.setTime(el[0])
      date1.setTime(el[1])
      return toSimbol(date0.getHours()) + ':' + toSimbol(date0.getMinutes()) + ' — ' + toSimbol(date1.getHours()) + ':' + toSimbol(date1.getMinutes())
    })
  }
  //-------------------------------
  const urTimeText = (ur_time) => {
    return ur_time.map((el)=>{
        return [toSimbol(el[0]) + ':'+ toSimbol(el[1]), toSimbol(el[2]) + ':'+toSimbol(el[3])]
    })
  }

export {toSimbol, getArTimes, getArTimesStr, insertTime, timeToStr, urTimeText, urTimesToText }