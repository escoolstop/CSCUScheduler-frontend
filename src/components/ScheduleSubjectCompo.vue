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
    },
    changeSection(){
      if (this.hideValue == false) {
      this.$parent.hideSubject(this.su_id,this.su_time[this.prevSection]);
      this.$parent.addSubject(this.su_id,this.su_time[this.section]);
      }
      this.prevSection = this.section;
    },
    trashSubjectChild(){
      //if (confirm('Do you want to remove [ '+this.su_id+' '+this.su_name+' ] from your schedule?')){
        this.$parent.hideSubject(this.su_id,this.su_time[this.section]);
        this.$parent.trashSubject(this.su_id)
      //}else { return; }
    },
    toggleHiding(){
      if (this.hideValue == false) {
        this.$parent.hideSubject(this.su_id,this.su_time[this.section]);
        this.hideValue = true;
      }
      else { 
        this.$parent.addSubject(this.su_id,this.su_time[this.section]); 
        this.hideValue = false;
      }
    }
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
  <select class="selectButton" v-model="section" @change="this.timeArr=this.getTimeArray(this.su_time,section),this.changeSection()" > <!-- v-if="this.secOptions.length>1" in case of use don't want drop down-->
    <option v-for="option in this.secOptions" :key="option.value" :value="option.value">
      {{ option.text }}
    </option>
  </select>
  </div>
  <div class='time'><div v-for="item in timeArr" :key="item.date">{{ item.date }}: {{ item.stTime }} - {{ item.enTime }}</div></div>
  <div class="buttonPack"><button class="miniButton eye" :class="{ eyeSlash: hideValue }" @click="this.toggleHiding()"></button><button class="miniButton trash" @click="this.trashSubjectChild()"></button></div>
  
  
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
  margin-bottom: 0.521vw; /**10 */
  border-radius: 0.208vw;
  border: solid 1px black;
  display: flex;/**/
  flex-wrap: wrap;
  justify-content: flex-start;
  /*height: 5.208vw;/*100*/ 
  width: calc(100% - 3px);/*400px 900*/
  font-size: max(0.833vw, 12px);
  row-gap: 0.521vw;
  column-gap: 0.521vw;  
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
}
.maintext{
  font-size: 1.25em;
  position: relative;
  left: 0;
  top: 0; 
  text-align: left;
}
.notmain{
  border: solid 1px black; 
}
.time{
  font-size: 1.1em;
}
.bb{
  border: solid 1px black;
  display: flex; 
  flex-wrap: wrap;
}
.miniButton{
  border: 0px;
  width: max(1.823vw, 25px);
  height: max(1.823vw, 25px);
  background-size: 71% 71%;
  /*width: 1.823vw;
  height: 1.823vw;
  background-size: 1.302vw 1.302vw; /*35->25 40->25 image*/
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.3s;
  background-color: transparent; /*#f1f5f8*/
  align-self: flex-end;
  margin-left: auto;
}
.miniButton:hover{
  background-color: #D3D3D3;
}
.trash{
  background-image: url("../assets/trash-solid.svg");
}
.eye{
  background-image: url("../assets/eye-solid.svg");
}
.eyeSlash{
  background-image: url("../assets/eye-slash-solid.svg");
}
.buttonPack{
  align-self: flex-end;
  margin-left: auto;
}
</style>