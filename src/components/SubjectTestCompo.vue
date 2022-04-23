<script>
export default {
  data() {
    return {      
      time: "TDF",
      clock: "Morning"
    }
  },
  props: {
    su_id: String, 
    su_name: String, 
    su_time: Array,
  },
  methods: {
  },
  mounted(){
    if (this.su_time[0] != "TDF") {
      var monthMapReverse = { 1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 
                              7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec',}
      if (this.su_time[2] == "PM") { this.clock = "Afternoon"}
      this.time = this.su_time[0]+" "+monthMapReverse[this.su_time[1]]+" "+this.clock;
    }
  }
}
</script>

<template>
  <div class="outerBox">
    <div class="left big">{{this.su_id}} {{this.su_name}} </div><div class="left pad">{{this.time}}</div>
  </div>
</template>

<style scoped>
.html {
  scrollbar-color: #888 #f1f1f1;
  scrollbar-width: thin;
}
.outerBox{
  margin-top: 0.260vw;
  margin-bottom: 0.521vw; /**10 */
  border-radius: 0.208vw;
  border: solid 1px black;
  display: flex;/**/
  flex-wrap: wrap;
  justify-content: flex-start;
  /*height: 5.208vw;/*100*/ 
  width: calc(100% - 30px);
  font-size: max(0.833vw, 12px);
  column-gap: 0.521vw;

  padding: 0.521vw; 
}
.big{
  font-size: 1.25em;
  width: 100%;
  text-overflow: ellipsis; 
}
.left{
  text-align: left;    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.pad{
  padding-left: 10px;
}
</style>