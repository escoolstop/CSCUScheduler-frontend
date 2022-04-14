<script>
export default {
  data() {
    return {
      message: 'This is SubjectCompo',
      section: 0,
      secOptions: [],
      timeArr: this.getTimeArray(this.su_time,0)
    }
  },
  props: {
    su_time: Array,
    su_sec: Array,
    su_id: String, 
    su_name: String, 
    su_credit: Number, 
    su_level:String,
    su_genre:String,
  },
  methods: {
    getTimeArray(inputList,sec) {
      var inList = inputList[sec]; 
      var splitArr = [];
      var start = 0;
      var end = 0;
      for (var i = 0; i < inList.length; i++) {
      if (i < inList.length-1) {
        if (inList[i+1]> inList[i]+1) {
          end = i+1;
          splitArr.push(inList.slice(start,end));
          start = end;
        }
      }
      else {splitArr.push(inList.slice(start,inList.length));}
      }
      var timeArr = [];
      for (var j=0; j < splitArr.length; j++) { 
        var timeObj = {date:'',stTime:'',enTime:''}
        var startTime = splitArr[j][0]
        var endTime = (splitArr[j]).at(-1);
        switch (Math.floor(startTime/22)) {
          case 0: timeObj.date = 'MON'; break;
          case 1: timeObj.date = 'TUE'; break;
          case 2: timeObj.date = 'WED'; break;
          case 3: timeObj.date = 'THU'; break;
          case 4: timeObj.date = 'FRI'; break;
          default: break;
        }
        switch ((startTime%22)-1) {
          case 0: timeObj.stTime = '8:00'; break;
          case 1: timeObj.stTime = '8:30'; break;
          case 2: timeObj.stTime = '9:00'; break;
          case 3: timeObj.stTime = '9:30'; break;
          case 4: timeObj.stTime = '10:00'; break;
          case 5: timeObj.stTime = '10:30'; break;
          case 6: timeObj.stTime = '11:00'; break;
          case 7: timeObj.stTime = '11:30'; break;
          case 8: timeObj.stTime = '12:00'; break;
          case 9: timeObj.stTime = '12:30'; break;
          case 10: timeObj.stTime = '13:00'; break;
          case 11: timeObj.stTime = '13:30'; break;
          case 12: timeObj.stTime = '14:00'; break;
          case 13: timeObj.stTime = '14:30'; break;
          case 14: timeObj.stTime = '15:00'; break;
          case 15: timeObj.stTime = '15:30'; break;
          case 16: timeObj.stTime = '16:00'; break;
          case 17: timeObj.stTime = '16:30'; break;
          case 18: timeObj.stTime = '17:00'; break;
          case 19: timeObj.stTime = '17:30'; break;
          case 20: timeObj.stTime = '18:00'; break;
          case 21: timeObj.stTime = '18:30'; break;
          default: break;
        }
        switch ((endTime%22)-1) {
          case 0: timeObj.enTime = '8:30'; break;
          case 1: timeObj.enTime = '9:00'; break;
          case 2: timeObj.enTime = '9:30'; break;
          case 3: timeObj.enTime = '10:00'; break;
          case 4: timeObj.enTime = '10:30'; break;
          case 5: timeObj.enTime = '11:00'; break;
          case 6: timeObj.enTime = '11:30'; break;
          case 7: timeObj.enTime = '12:00'; break;
          case 8: timeObj.enTime = '12:30'; break;
          case 9: timeObj.enTime = '13:00'; break;
          case 10: timeObj.enTime = '13:30'; break;
          case 11: timeObj.enTime = '14:00'; break;
          case 12: timeObj.enTime = '14:30'; break;
          case 13: timeObj.enTime = '15:00'; break;
          case 14: timeObj.enTime = '15:30'; break;
          case 15: timeObj.enTime = '16:00'; break;
          case 16: timeObj.enTime = '16:30'; break;
          case 17: timeObj.enTime = '17:00'; break;
          case 18: timeObj.enTime = '17:30'; break;
          case 19: timeObj.enTime = '18:00'; break;
          case 20: timeObj.enTime = '18:30'; break;
          case 21: timeObj.enTime = '19:00'; break;
          default: break;
        }
        timeArr.push(timeObj);
      }
      return timeArr;
    }
  },
  mounted(){
    if (this.su_sec.length>1) {
      for (var k = 0; k < this.su_sec.length; k++) {
        var singleOption = {text: '',value: k};
        singleOption.text = this.su_sec[k];
        this.secOptions.push(singleOption)
      }
    }
  }
}
</script>

<template>
  <p class="greeting">{{ message }} </p>
  <div>{{this.su_id}} {{this.su_name}} weight: {{this.su_credit}} genre: {{this.su_genre}} time:
  <select v-model="section" v-if="this.secOptions.length>1" @change="this.timeArr =this.getTimeArray(this.su_time,section)">
    <option v-for="option in this.secOptions" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select> </div>
  <div v-for="item in timeArr" :key="item.date">{{ item.date }}: {{ item.stTime }} - {{ item.enTime }}</div>  
</template>

<style scoped>
.greeting {
  color: red;
  font-weight: bold;
}
</style>