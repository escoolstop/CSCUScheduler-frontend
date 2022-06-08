<script>
export default {
  data() {
    return {
      message: 'This is SubjectCompo',
      section: 0,
      secOptions: [],
      timeArr: this.getTimeArray(this.su_time,0),
      prevSection: 0,
      hideValue: false
    }
  },
  props: {
    su_id: String, 
    su_name: String, 
    su_credit: String, 
    su_level:String,
    su_genre:String,
    su_time: Array,
    su_sec: Array,
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
        switch ((startTime-1)%22) {
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
        switch ((endTime-1)%22) {
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
    },
    addSubject(){
      this.$parent.$data.cart_subj_id.push(this.su_id) //this.$parent.$data.cart_subj_id.push(parseInt(this.su_id))
      this.$parent.$data.cart_subj.push({su_id:this.su_id, su_name:this.su_name, su_credit:this.su_credit, su_level:this.su_level,su_genre:this.su_genre,su_time:this.su_time,su_sec:this.su_sec});
      this.$parent.$data.cart_subj.sort( (a, b) => ( parseInt(a.su_id) > parseInt(b.su_id)) ? 1:-1);
    },
    removeSubject(){
  
      this.$parent.$data.cart_subj_id = this.$parent.$data.cart_subj_id.filter(x => x != this.su_id);
      this.$parent.$data.cart_subj = this.$parent.$data.cart_subj.filter(y => y.su_id != this.su_id);

      if (this.$parent.$data.inDB_subj_id.some((value) => value == this.su_id)) {
      this.$parent.$data.inDB_subj_id = this.$parent.$data.inDB_subj_id.filter(x => x != this.su_id);
      this.$parent.$data.inDB_subj = this.$parent.$data.inDB_subj.filter(y => y.su_id != this.su_id);
      this.$parent.updateDB();
      }
    },
  },
  mounted(){
    for (var k = 0; k < this.su_sec.length; k++) {
      var singleOption = {text: 'Sec ',value: k};
      singleOption.text = singleOption.text.concat(this.su_sec[k]);
      this.secOptions.push(singleOption)
    }
  }
}
</script>

<template>
  <div class="outerBox">
    <div class="topBox"><div class="toptext"><div class="maintext">{{this.su_id}} {{this.su_name}}</div> <div class="notmain"><span>[{{this.su_genre}}]</span><span> [{{this.su_credit}} credits]</span></div></div></div>  
    <div>
      <select class="selectButton" v-model="section" @change="this.timeArr=this.getTimeArray(this.su_time,section)"> <!-- v-if="this.secOptions.length>1" in case of use don't want drop down-->
      <option v-for="option in this.secOptions" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    </div>
    <div class='time'><div v-for="item in timeArr" :key="item.date">{{ item.date }}: {{ item.stTime }} - {{ item.enTime }}</div></div>
      <div class="buttonPack">
        <va-button v-if="!(this.$parent.$data.cart_subj_id.includes(su_id) || this.$parent.$data.inDB_subj_id.includes(su_id))" icon="add" class="mr-4" @click="this.addSubject()" style="width: 110px; border-radius: 3px;" outline>Add</va-button>
        <va-button v-if="(this.$parent.$data.cart_subj_id.includes(su_id) || this.$parent.$data.inDB_subj_id.includes(su_id))" icon="check" class="mr-4" @click="this.removeSubject()" style="width: 110px; border-radius: 3px;" gradient>Added</va-button>
    </div>
  </div>
</template>

<style scoped>
.selectButton{
  padding: 0.208vw;
  margin-left: 0.521vw;
}
.html {
  scrollbar-color: #888 #f1f1f1;
  scrollbar-width: thin;
}
.outerBox{
  margin-bottom: 2vh; /**10 */
  border-radius: 0.208vw;
  outline: solid 2px #2c3e50;
  display: flex;/**/
  flex-wrap: wrap;
  justify-content: flex-start;
  /*height: 5.208vw;/*100*/ 
  /* width: 80%; */
  width: 40vw;
  margin: 0px auto; /*previous is 5vw*/
  margin-bottom: 2vh;
  /*width: calc(100% - 3px);/*400px 900*/
  font-size: max(0.833vw, 12px);
  row-gap: 0.521vw;
  column-gap: 0.521vw;  
  background-color: #f1f5f8;
  padding: 0.521vw;
}
.topBox{
  width: 100%;
}
.toptext{
  width: 100%;/*47.917vw;900*/
  display: flex; 
  align-items: baseline;
  gap: 0.521vw; /*10*/
  box-sizing: border-box;
  padding-top: 0.260vw; /*5px*/
  padding-left: 0.260vw;
  padding-bottom: 0.521vw;
}
.maintext{
  font-size: 1.25em;
  position: relative;
  left: 0;
  top: 0; 
  text-align: left;
}
/* .notmain{
  border: solid 1px black; 
} */
.time{
  font-size: 1.1em;
  padding-top: 4px;
  padding-left: 5px;  
  padding-bottom: 5px;
}
.bb{
  border: solid 1px black;
  display: flex; 
  flex-wrap: wrap;
}

.buttonPack{
  align-self: flex-end;
  margin-left: auto;
  
}
</style>