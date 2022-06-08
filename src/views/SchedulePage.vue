<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'
import { useRouter } from 'vue-router'
import ScheduleSubjectCompo from '../components/ScheduleSubjectCompo.vue'
import SubjectTest from '../components/SubjectTestCompo.vue'
import axios from 'axios'
export default {
  name: 'SchedulePage',
  data(){
    return{
      loadstate:true,
      scheduleArray:[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                    [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                    [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                    [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                    [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],
      /*scheduleArray:[[],[],[],[],[],[],[],[],[],[],[11],[],[],[],[],[],[],[],[],[],[],[22],
                    [],[],[],[],[],[],[],[],[],[],[33],[],[],[],[],[],[],[],[],[],[],[44],
                    [],[],[],[],[],[],[],[],[],[],[55],[],[],[],[],[],[],[],[],[],[],[66],
                    [],[],[],[],[],[],[],[],[],[],[77],[],[],[],[],[],[],[],[],[],[],[88],
                    [],[],[],[],[],[],[],[],[],[],[99],[],[],[],[],[],[],[],[],[],[],[110]],*/
      student_ID:'',  
      all_subj_ID:[],            
      midTimeSubj:[],
      finalTimeSubj:[],
      all_subj_pre:[],
      all_subj:[],
      /* [{ "su_level": "2", "su_credit": "3", "su_sec": [1], "su_name": "FREEDOM OF ASSEMBLY AND LAW", "su_test": ["TDF","TDF"], "su_time": [[77,78,79,80,81,82]], "su_genre": "GEN-SO", "su_id": "3404131" },
      { "su_name": "GENERAL PHYSICS I", "su_credit": "3", "su_sec": [1], "su_genre": "SC-CORE", "su_test": ["11-Mar_PM","18_May_PM"], "su_id": "2304103", "su_time": [[40,41,42,82,83,84]], "su_level": "4" },      
      { "su_name": "CALCULUS III", "su_id": "2301217", "su_sec": [1], "su_genre": "CS-CORE", "su_credit": "3", "su_level": "4", "su_test": ["8-Mar_PM","12-May_PM"], "su_time": [[9,10,75,76,97,98]] },
      { "su_test": ["TDF","TDF"], "su_id": "5500112", "su_level": "2", "su_name": "EXPERIENTIAL ENGLISH II", "su_genre": "GEN-LANG", "su_credit": "3", "su_time": [[11,12,13,14,15,16],[11,12,13,14,15,16],[11,12,13,14,15,16]], "su_sec": [29,30,31] }],
        */         /* {su_id:'9876543', su_name: 'NOT CALC2', su_credit:"3", su_level:'4',su_genre:'CS1',su_time:[[55,56,57,58,59,60],[99,100]],su_sec:[1,2],su_test:["9-Feb_PM","13-May_PM"]},
                {su_id:'9876544', su_name: 'NOT CALC2', su_credit:"3", su_level:'4',su_genre:'CS1',su_time:[[55,56,57,58,59,60],[99,100]],su_sec:[1,2],su_test:["9-Feb_PM","13-May_PM"]},
                {su_id:'9876545', su_name: 'NOT CALC2', su_credit:"3", su_level:'4',su_genre:'CS1',su_time:[[55,56,57,58,59,60]],su_sec:[1],su_test:["9-Feb_PM","13-May_PM"]}] */
    }
  },
  components: {
    ScheduleSubjectCompo,
    SubjectTest
  },
  setup() {
    const { user } = useAuthState()
    const auth = getAuth()
    const router = useRouter()
    const signOutUser = async () => {
      try {
        await signOut(auth)
        router.push('/login')
      } catch (e) {
        alert(e.message)
      }
    }

    return { user, signOutUser }
  },
  methods: {
    addSubject(subject_id,subjectTimeArray) {
      for (var i = 0; i < subjectTimeArray.length; i++) {
        this.scheduleArray[subjectTimeArray[i]-1].push(subject_id);
      }
      this.addTimeSubject(subject_id);
    },
    hideSubject(subject_id,subjectTimeArray) { // hide subject
      for (var i = 0; i < subjectTimeArray.length; i++) {
        this.scheduleArray[subjectTimeArray[i]-1] = this.scheduleArray[subjectTimeArray[i]-1].filter(x => x != subject_id);
      }
      this.removeTimeSubject(subject_id);
    },
    async trashSubject(subject_id){ //delete from all subject
      this.all_subj = this.all_subj.filter( subject => subject.su_id != subject_id)
      this.all_subj_ID = this.all_subj_ID.filter( subject => subject != subject_id)
      this.removeTimeSubject(subject_id);
      var stringArrID = JSON.stringify(this.all_subj_ID);
      /* console.log(typeof(stringArrID)) */
      await axios.put('https://us-central1-cscuscheduler.cloudfunctions.net/api/student/updateSubject',{
        id: this.student_ID , data: stringArrID , headers:{"Access-Control-Allow-Origin":"*"}
      }).then(response => (console.log(response.data))).catch(error => { console.log(error) })

    },

    addAllSubject(){
      for (var i = 0; i < this.all_subj.length; i++) {
        this.addSubject(this.all_subj[i].su_id,this.all_subj[i].su_time[0]);
        //this.addTimeSubject(this.all_subj[i].su_id); // addTimeSubject but loop = addAllTimeSubject()
      }
    },
    sortByTime(){
      this.midTimeSubj.sort( (a, b) => (a.su_time[2] >= b.su_time[2]) ? 1 : -1 );
      this.midTimeSubj.sort( (a, b) => (a.su_time[0] > b.su_time[0]) ? 1 : -1 );
      this.midTimeSubj.sort( (a, b) => (parseInt(a.su_time[0]) > parseInt(b.su_time[0])) ? 1 : -1 );
      this.midTimeSubj.sort( (a, b) => (a.su_time[1] > b.su_time[1]) ? 1 : -1 );
      this.finalTimeSubj.sort( (a, b) => (a.su_time[2] >= b.su_time[2]) ? 1 : -1 );
      this.finalTimeSubj.sort( (a, b) => (a.su_time[0] > b.su_time[0]) ? 1 : -1 );
      this.finalTimeSubj.sort( (a, b) => (parseInt(a.su_time[0]) > parseInt(b.su_time[0])) ? 1 : -1 );
      this.finalTimeSubj.sort( (a, b) => (a.su_time[1] > b.su_time[1]) ? 1 : -1 )
    },
    addTimeSubject(subject_id){ //timeSlot 0 for mid / 1 for final
      var subjObject = this.all_subj.find(x => x.su_id == subject_id)
      if (subjObject.su_test[0] == "TDF") { 
        this.midTimeSubj.push({su_id:subjObject.su_id, su_name:subjObject.su_name, su_time:["TDF"]});
        this.finalTimeSubj.push({su_id:subjObject.su_id, su_name:subjObject.su_name, su_time:["TDF"]}) 
      }
      else {
        var monthMap = { Jan:'1', Feb:'2', Mar:'3', Apr:'4', May:'5', Jun:'6', Jul:'7', Aug:'8', Sep:'9', Oct:'10', Nov:'11', Dec:'12',}
        var testTime = subjObject.su_test[0].split(/-|_/);
        testTime[1] = monthMap[testTime[1]]
        this.midTimeSubj.push({su_id:subjObject.su_id, su_name:subjObject.su_name, su_time:testTime})

        testTime = subjObject.su_test[1].split(/-|_/);
        testTime[1] = monthMap[testTime[1]]
        this.finalTimeSubj.push({su_id:subjObject.su_id, su_name:subjObject.su_name, su_time:testTime})
      }
      this.sortByTime();
    },
    removeTimeSubject(subject_id){
      this.midTimeSubj = this.midTimeSubj.filter (subject => subject.su_id != subject_id)
      this.finalTimeSubj = this.finalTimeSubj.filter (subject => subject.su_id != subject_id)
    },
    formatAllSubject(){ 
      for (var i = 0; i < this.all_subj.length; i++) {
        this.all_subj[i].su_time = JSON.parse(this.all_subj[i].su_time)
        this.all_subj[i].su_sec = JSON.parse(this.all_subj[i].su_sec)
        this.all_subj[i].su_test = this.all_subj[i].su_test.slice(1, -1).split(",")
      }
    },
  },
  async mounted() {
    await axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/student/queryStudentByEmail',{
      params: { email: getAuth().currentUser.email }, headers:{"Access-Control-Allow-Origin":"*"}
    }).then(response => {
      if (response.data.st_subject == "") { this.all_subj_ID = [];}
      else {this.all_subj_ID = JSON.parse(response.data.st_subject);} 
      this.student_ID = response.data.cr_id})
    
    if (!this.all_subj_ID.length == 0) {
    await axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/subject/queryMultSubject',{
      params: { id: this.all_subj_ID }, headers:{"Access-Control-Allow-Origin":"*"}
    }).then(response =>{ (this.all_subj=(response.data))
    this.formatAllSubject();
    this.addAllSubject();
    this.all_subj.sort( (a, b) => ( a.su_id > b.su_id) ? 1:-1);
    })
    }
    this.loadstate=false
  }
}
</script>

<template>
  <div class="navbar">
    <router-link to="/home" style="text-decoration: none; color: inherit;"><div class="navbox">Home</div></router-link>
    <router-link to="/subject" style="text-decoration: none; color: inherit;"><div class="navbox">Subject</div></router-link>
    <router-link to="/schedule" style="text-decoration: none; color: inherit;"><div class="navboxactive">Schedule</div></router-link>
    <router-link to="/history" style="text-decoration: none; color: inherit;"><div class="navbox">History</div></router-link>
    <div class="navbox" style="margin-left: auto;">{{ user?.email }}</div>
    <div class="navbox" @click="signOutUser">Sign Out</div>
  </div>
  <!--h1>Welcome {{ user?.email }}!</h1>
  <button @click="signOutUser">Sign Out</button-->
  <img class="loading" v-if="loadstate" src = "../assets/loading-spinner.svg" alt="My Happy SVG"/>
  <div v-if="!loadstate">
  <div class="wrapRtable">
  <div class="Rtable">
    <!--div class="overlay">2301369<br>DATA COMM I</div>
    <div class="overlay a">I'M HERE</div>
    <div class="overlay b">I'M HERE</div>
    <div class="overlay c">I'M HERE</div>
    <div class="overlay d">I'M HERE</div-->
    <div class="Rtable-cell head edge">Day/Time</div>
    <div class="Rtable-cell head columnH">8:00-9:00</div>
    <div class="Rtable-cell head columnH">9:00-10:00</div>
    <div class="Rtable-cell head columnH">10:00-11:00</div>
    <div class="Rtable-cell head columnH">11:00-12:00</div>
    <div class="Rtable-cell head columnH">12:00-13:00</div>
    <div class="Rtable-cell head columnH">13:00-14:00</div>
    <div class="Rtable-cell head columnH">14:00-15:00</div>
    <div class="Rtable-cell head columnH">15:00-16:00</div>
    <div class="Rtable-cell head columnH">16:00-17:00</div>
    <div class="Rtable-cell head columnH">17:00-18:00</div>
    <div class="Rtable-cell head columnH">18:00-19:00</div>
        
    <div class="Rtable-cell head rowH">MON</div>
    <div class="Rtable-cell inner" v-for="subArray in scheduleArray.slice(0, 22)" :key="subArray" :class="{redTimeSlot: subArray.length>1}"><div v-for="subId in subArray" :key="subId">{{subId}}</div></div>
    <!--div class="Rtable-cell inner"><div v-for="subArray in scheduleArray[0]" :key="subArray">{{subArray}}</div></div-->

    <div class="Rtable-cell head rowH">TUE</div>
    <div class="Rtable-cell inner" v-for="subArray in scheduleArray.slice(22, 44)" :key="subArray" :class="{redTimeSlot: subArray.length>1}"><div v-for="subId in subArray" :key="subId">{{subId}}</div></div>
    
    <div class="Rtable-cell head rowH">WED</div>
    <div class="Rtable-cell inner" v-for="subArray in scheduleArray.slice(44, 66)" :key="subArray" :class="{redTimeSlot: subArray.length>1}"><div v-for="subId in subArray" :key="subId">{{subId}}</div></div>

    <div class="Rtable-cell head rowH">THU</div>
    <div class="Rtable-cell inner" v-for="subArray in scheduleArray.slice(66, 88)" :key="subArray" :class="{redTimeSlot: subArray.length>1}"><div v-for="subId in subArray" :key="subId">{{subId}}</div></div>

    <div class="Rtable-cell head rowH">FRI</div>
    <div class="Rtable-cell inner" v-for="subArray in scheduleArray.slice(88, 110)" :key="subArray" :class="{redTimeSlot: subArray.length>1}"><div v-for="subId in subArray" :key="subId">{{subId}}</div></div>
      
  </div> </div>
  <div class="lowerhalf">
  <div class="subjforSchedule">Subject List<div class="space"><ScheduleSubjectCompo v-for="item in this.all_subj" v-bind="item" :key="item.su_id"></ScheduleSubjectCompo></div></div>
  <div class="testDisplay">Midterm Schedule<div class="space"><SubjectTest v-for="item in this.midTimeSubj" :testArr="this.midTimeSubj" v-bind="item" :key="item.su_id" :class="{active: item.su_time}"></SubjectTest></div></div>
  <div class="testDisplay">Final Schedule<div class="space"><SubjectTest v-for="item in this.finalTimeSubj" :testArr="this.finalTimeSubj" v-bind="item" :key="item.su_id" :class="{active: item.su_time}"></SubjectTest></div></div>
  </div>
  </div>
</template>
<style scope>
button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 //this is to make firefox ie chrome display the same*/
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}
html {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}
.loading{
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
}
.wrapRtable{
  width: 100%;
  overflow-x: auto;
}
.Rtable {
  margin: 0 1%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  align-self: center;
  width: 98%;
  min-width: 1440px;/**/
  font-size: max(0.833vw, 12px);/*16px with min 12px*/
  margin-top: 50px;
}
.Rtable-cell {
  box-sizing: border-box;
  width: 4.3%;
  /*padding: 0.8em 1.2em;*/
  padding: 0.651vw 0.156vw;/*12.5px 3px;*/
  overflow: hidden;
  list-style: none;
  border: solid 1px black;
  background: white;
  white-space: nowrap;
  /*text-overflow: "";/*ellipsis;*/
  text-overflow: ellipsis;
  text-align: center;
  align-items: center;
  height: max(5.208vw, 70px); /*75px for 1440*/
  /*height: 5.208vw;/*100px;*/
  
  
}
.head {
  background-color: lightcyan;
}
.rowH {
  width: 5.4%;
  /*padding: 1.953vw 0/*37.5px 0*/;
  border-left-style: solid;
  border-top-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
.columnH {
  height: max(2.604vw, 35px);/*50px;*/
  display: flex;
  justify-content: center;
  align-items: center;
  /*padding: 0.781vw 0;/*15px 0;*/
  width: 8.6%;
  border-top-style: solid;
  border-left-style: none;
}
.edge {
  border-left-style: solid;
  border-top-style: solid;
  height: max(2.604vw, 35px);/*50px;*/
  width: 5.4%;
  /*padding: 0.781vw 0;/*15px 0;*/
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner {
  border-left-style: none;
  border-top-style: none;
  background-color: white;
}
.redTimeSlot{
  background-color: #ffcc00;
}
.lowerhalf{
  margin: 1.5vw 2%;
  width: 96%;
  display: flex;
  justify-content: space-around;
  align-items: top;
  height: auto;
  /* column-gap: 20px; */
}
.subjforSchedule{
  width: 40%;
  overflow:auto;
  scrollbar-color: #888 #f1f1f1;
  scrollbar-width: thin;
  font-size: 25px;
  text-align: left; 
  padding: 0.821vw 1.042vw; 
  background-color: lightblue;
  border-radius: 0.208vw;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
}
.testDisplay{
  width: 25%;
  overflow:auto;
  scrollbar-color: #888 #f1f1f1;
  scrollbar-width: thin;
  font-size: 25px;
  text-align: left;  
  padding: 0.821vw 1.042vw; 
  background-color: lightblue;
  border-radius: 0.208vw;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
}
.space{
  padding-top: 10px;
}

.overlay {
  position: absolute;
  box-sizing: border-box;
  padding: 12.5px 3px;
  overflow: hidden;
  list-style: none;
  background: lightblue;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  align-items: center;
  width: calc(2 * 4.3% + 1px); /*cell*4.3% + 1px*/
  height: 101px;
  left: calc(5.4% - 1px + 4.3% * 0); /*day cell width - border 1px*/
  top: calc(
    49px + 0 * 100px
  ); /*column height 50px - border 1px + day-1 *100px*/
  margin: none;
  border: solid 1px;
  display: inline-block;
}
.a {
  width: calc(3 * 4.3% + 1px); /*half hour*4.3% +1px*/
  top: calc(49px + 100px); /*49px + day-1 * 100px*/
}
.b {
  width: calc(4 * 4.3% + 1px);
  top: calc(49px + 2 * 100px);
}
.c {
  width: calc(5 * 4.3% + 1px);
  top: calc(49px + 3 * 100px);
}
.d {
  width: calc(6 * 4.3% + 1px);
  top: calc(49px + 4 * 100px);
  left: calc(5.4% - 1px + 4.3% * 3);
}
</style>