<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'
import { useRouter } from 'vue-router'
import { axios } from 'axios'

//var test2= [{id:2301111, number: 'CALCULUS I', weight:3.0}, {id:2301112, number: 'CALCULUS II', weight:3.0}];

export default {
  name: 'HistoryPage',
  data(){
    return{
      displaymode:2,
      subj1_1:[{id:2301111, number: 'CALCULUS I', weight:3.0}],
      subj1_2:[{id:2301111, number: 'CALCULUS I', weight:3.0}],
      subj2_1:[{id:2301111, number: 'CALCULUS I', weight:3.0}, {id:2301112, number: 'CALCULUS II', weight:3.0}
      
      ,{id:2301111, number: 'CALCULUS I', weight:3.0}, {id:2301112, number: 'CALCULUS II', weight:3.0},{id:2301112, number: 'CALCULUS II', weight:3.0}
      ,{id:2301111, number: 'CALCULUS I', weight:3.0}, {id:2301112, number: 'CALCULUS II', weight:3.0},{id:2301112, number: 'CALCULUS II', weight:3.0}
      ,{id:2301111, number: 'CALCULUS I', weight:3.0}, {id:2301112, number: 'CALCULUS II', weight:3.0},{id:2301112, number: 'CALCULUS II', weight:3.0}
      ,{id:2301111, number: 'CALCULUS I', weight:3.0}, {id:2301112, number: 'CALCULUS II', weight:3.0}
      ,{id:2301111, number: 'CALCULUS I', weight:3.0}, {id:2301112, number: 'CALCULUS II', weight:3.0},{id:2301112, number: 'CALCULUS II', weight:3.0} 
      ],
      subj2_2:[{id:2301111, number: 'SOME KIND OF SOFTWARE DEVELOPMENT', weight:3.0}, {id:2301112, number: 'SYS ANAL IDK', weight:3.0}],
      subj3:[],
      subj4_1:[
        {id:2301111, number: 'CALCULUS I', weight:3.0},{id:2301111, number: 'CALCULUS I', weight:3.0},{id:2301111, number: 'CALCULUS I', weight:3.0},{id:2301111, number: 'CALCULUS I', weight:3.0},{id:2301111, number: 'CALCULUS I', weight:3.0},
        {id:2301111, number: 'CALCULUS I', weight:3.0},{id:2301111, number: 'CALCULUS I', weight:3.0},{id:2301111, number: 'CALCULUS I', weight:3.0},{id:2301111, number: 'CALCULUS I', weight:3.0},{id:2301111, number: 'CALCULUS I', weight:3.0},
      ],
      subj4_2:[],
      subj4_3:[],
      subj4_4:[],
      subj4_5:[],
      subj4_6:[],
      subj5:[],
      info:"test"
    }
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
    totalRequest(subarr) {      
      return subarr.reduce((acc, item) => acc + item.weight, 0);
    }
  },
  created(){
    this.subj5.push({id:123,weight:3.0})
    axios.post("https://reqres.in/invalid-url", this.info)
    .then(response => this.info = response.data.id)
    .catch(error => {
      this.errorMessage = error.message;
      console.error("There was an error!", error);
    });
  }
}
</script>

<template>
  <div class="navbar">
    <router-link to="/home" style="text-decoration: none; color: inherit;"><div class="navbox">Home</div></router-link>
    <router-link to="/subject" style="text-decoration: none; color: inherit;"><div class="navbox">Subject</div></router-link>
    <router-link to="/schedule" style="text-decoration: none; color: inherit;"><div class="navbox">Schedule</div></router-link>
    <router-link to="/history" style="text-decoration: none; color: inherit;"><div class="navbox">Weight</div></router-link>
    <div class="navboxstatic" style="margin-left: auto;">{{ user?.email }}</div>
    <div class="navbox" @click="signOutUser">Sign Out</div>
  </div>
  <div class="center">
    <div class="wrappermain">
      <div class="selectorBox">
        <div class="circle">
          <div class="big">125</div>
          <div class="break"></div>          
          <div class="small">total credit</div>
        </div>
        <div class="empty"></div>
        <div class="label" @click="displaymode=1;"><div class="category">CS</div><div class="small">{{ totalRequest(subj1_1)+totalRequest(subj1_2) }}/21</div></div>
        <div class="label" @click="displaymode=2;"><div class="category">CS Core</div><div class="small">{{ totalRequest(subj2_1)+totalRequest(subj2_2) }}/49</div></div>  
        <div class="label" @click="displaymode=3;"><div class="category">SC Core</div><div class="small">{{ totalRequest(subj3) }}/31</div></div>
        <div class="label" @click="displaymode=4;"><div class="category">GENED</div><div class="small">{{ totalRequest(subj4_1)+totalRequest(subj4_2)+totalRequest(subj4_3)+totalRequest(subj4_4)+totalRequest(subj4_5)+totalRequest(subj4_6) }}/30</div></div>       
        <div class="label" @click="displaymode=5;"><div class="category">FREE</div><div class="small">{{ totalRequest(subj5) }}/6</div></div>     
      </div>

      <!--display- 1 CS / 2 CS Core / 3 SC Core / 4 GENED / FREE -->
      <div v-if="displaymode==1" class="subjectDisplayBox">

        <div class="subjectHead">CS I {{ totalRequest(subj1_1) }}/15</div>
        <div v-for="item in subj1_1" :key="item.id" class=subjectList>CS I: {{ item.id }} | {{ item.number }} | {{ item.weight }}</div>

        <div class="subjectHead">CS I / CS II {{ totalRequest(subj1_2) }}/6</div>
        <div v-for="item in subj1_2" :key="item.id" class=subjectList>CS I / CS II: {{ item.id }} | {{ item.number }} | {{ item.weight }}</div>

      </div>
      <div v-if="displaymode==2" class="subjectDisplayBox">
        {{info}}

        <div class="subjectHead">CS CORE {{ totalRequest(subj2_1) }}/43</div>
        <div v-for="item in subj2_1" :key="item.id" class=subjectList>CS CORE: {{ item.id }} | {{ item.number }} | {{ item.weight }}</div>

        <div class="subjectHead">CS CHOSEN {{ totalRequest(subj2_2) }}/6</div>
        <div v-for="item in subj2_2" :key="item.id" class=subjectList>CS CHOSEN: {{ item.id }} | {{ item.number }} | {{ item.weight }}</div>

      </div>
      <div v-if="displaymode==3" class="subjectDisplayBox">

        <div class="subjectHead">SC Core {{ totalRequest(subj3) }}/31</div>
        <div v-for="item in subj3" :key="item.id" class=subjectList>SC CORE: {{ item.id }} | {{ item.number }} | {{ item.weight }}</div>

      </div>
      
      <div v-if="displaymode==4" class="subjectDisplayBox">

      <div class="subjectHead">กลุ่มวิชาสังคมศาสตร์ {{ totalRequest(subj4_1) }}/3</div>
      <div v-for="item in subj4_1" :key="item.id" class=subjectList>กลุ่มวิชาสังคมศาสตร์: {{ item.id }} | {{ item.number }} | {{ item.weight }}</div>

      <div class="subjectHead">กลุ่มวิชามนุษยศาสตร์ {{ totalRequest(subj4_2) }}/3</div>
      <div v-for="item in subj4_2" :key="item.id" class=subjectList>กลุ่มวิชามนุษยศาสตร์: {{ item.id }} | {{ item.number }} | {{ item.weight }}</div>

      <div class="subjectHead">กลุ่มวิชามนุษยศาสตร์ {{ totalRequest(subj4_3) }}/3</div>
      <div v-for="item in subj4_3" :key="item.id" class=subjectList>กลุ่มวิชามนุษยศาสตร์: {{ item.id }} | {{ item.number }} | {{ item.weight }}</div>

      <div class="subjectHead">กลุ่มวิชาสหศาสตร์ {{ totalRequest(subj4_4) }}/3</div>
      <div v-for="item in subj4_4" :key="item.id" class=subjectList>กลุ่มวิชาสหศาสตร์: {{ item.id }} | {{ item.number }} | {{ item.weight }}</div>

      <div class="subjectHead">กลุ่มวิชาภาษา {{ totalRequest(subj4_5) }}/12</div>
      <div v-for="item in subj4_5" :key="item.id" class=subjectList>กลุ่มวิชาภาษา: {{ item.id }} | {{ item.number }} | {{ item.weight }}</div>

      <div class="subjectHead">กลุ่มวิชาศึกษาทั่วไปกลุ่มพิเศษ {{ totalRequest(subj4_6) }}/6</div>
      <div v-for="item in subj4_6" :key="item.id" class=subjectList>กลุ่มวิชาศึกษาทั่วไปกลุ่มพิเศษ: {{ item.id }} | {{ item.number }} | {{ item.weight }}</div>
        
          
      </div>
      <div v-if="displaymode==5" class="subjectDisplayBox">
        <div class="subjectHead">FREE {{ totalRequest(subj5) }}/6</div>
        <div v-for="item in subj5" :key="item.id" class=subjectList>FREE: {{ item.id }} | {{ item.number }} | {{ item.weight }}</div>
      </div>

      <div class="summaryBox">
        <div v-if="displaymode==1">1
          <div v-if="totalRequest(subj1_1)+totalRequest(subj1_2)==15">ALL CLEAR</div>
          <div v-else>
            <div v-if="totalRequest(subj1_1)!=15">CS I - {{15 - totalRequest(subj1_1)}} CR</div>
            <div v-if="totalRequest(subj1_2)!=6">CS II - {{6 - totalRequest(subj1_2)}} CR</div>
          </div>
        </div>
        <div v-if="displaymode==2">2
          <div v-if="totalRequest(subj2_1)+totalRequest(subj2_2)==49">ALL CLEAR</div>
          <div v-else>
            <div v-if="totalRequest(subj2_1)!=43">CS CORE - {{43 - totalRequest(subj2_1)}} CR</div>
            <div v-if="totalRequest(subj2_2)!=6">CS CHOSEN - {{6 - totalRequest(subj2_2)}} CR</div>
          </div>
        </div>
        <div v-if="displaymode==3">3
          <div v-if="totalRequest(subj3)==31">ALL CLEAR</div>
          <div v-else>SC CORE - {{31 - totalRequest(subj3)}} CR</div>
        </div>
        <div v-if="displaymode==4">4
          <div v-if="totalRequest(subj4_1)+totalRequest(subj4_2)+totalRequest(subj4_3)+totalRequest(subj4_4)+totalRequest(subj4_5)+totalRequest(subj4_6)==30">ALL CLEAR</div>
          <div v-else>
            <div v-if="totalRequest(subj4_1)!=3">กลุ่มวิชาสังคมศาสตร์ - {{3 - totalRequest(subj4_1)}} CR</div>
            <div v-if="totalRequest(subj4_2)!=3">กลุ่มวิชามนุษยศาสตร์ - {{3 - totalRequest(subj4_2)}} CR</div>
            <div v-if="totalRequest(subj4_3)!=3">กลุ่มวิชามนุษยศาสตร์ - {{3 - totalRequest(subj4_3)}} CR</div>
            <div v-if="totalRequest(subj4_4)!=3">กลุ่มวิชาสหศาสตร์ - {{3 - totalRequest(subj4_4)}} CR</div>
            <div v-if="totalRequest(subj4_5)!=12">กลุ่มวิชาภาษา - {{12 - totalRequest(subj4_5)}} CR</div>
            <div v-if="totalRequest(subj4_6)!=6">กลุ่มวิชาศึกษาทั่วไปกลุ่มพิเศษ - {{6 - totalRequest(subj4_6)}} CR</div>
          </div>
        </div>
        <div v-if="displaymode==5">5
          <div v-if="totalRequest(subj5)==6">ALL CLEAR</div>
          <div v-else>FREE - {{6 - totalRequest(subj5)}} CR</div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/*dev viewport width = 1920*/
.empty{
  width:100%;
  height: 2vw;
}
.category {
  width: 100%;
  font-size: 1.563vw;/*1.563vw;30 small is 17px*/
}
.small {
  width: 100%;
  font-size: 0.885vw;
}
.label{
  width: 50%;
  height: 4.167vw; /*80 px*/
  box-sizing: border-box;
  padding-top: 0.677vw;/*0.417vw;*/
  cursor:pointer;  
  /*border: solid 0.052vw black;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* align horizontal */  
  align-items: center; /* align vertical */  
  align-content: flex-start
}

.center{
  margin: 0 0;
  align-content: center;
}
.wrappermain {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /*background-color: palegreen;*/
  margin-top: 2.604vw; /*50px*/
  height: 1000px;
}
.circle{
  background-color: lightblue;
  border: 0.3vw solid black; /*3 or 5px*/   
  border-radius: 50%;
  height: 10vw;
  width: 10vw;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* align horizontal */  
  align-items: center; /* align vertical */
  margin-top: 1.042vw; /*20px*/
}
.circle>.big{
  margin-bottom: 1vw;
  font-size: 4.5vw;
  position: absolute
}
.circle>.small{
  font-size: 1vw;
}
.break {
  flex-basis: 100%;
  height: 0;
}

.selectorBox{
  box-sizing: border-box;
  width: 25%;
  height: 26.042vw; /*500px+20px (26.042vw+1.042 vw) in case you want bottom padding*/
  background-color: lightblue;/*
  border-right: solid white 3.125vw;
  border-left: solid white 3.125vw; /*60px*/
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* align horizontal */ 
  align-content: flex-start;
  flex: 1;
  width: calc(25% - 6.25vw);
  margin-left: 3.125vw; 
  margin-right: 3.125vw; /*60px*/
  border-radius: 10px;
}
.subjectDisplayBox{
  box-sizing: border-box;
  height: 52.083vw;/*1000px;*//*
  width: 40%;
  border-right: solid white 20px;/**/
  width: calc(40% - 1.042vw);
  margin-right: 1.042vw;/**/
  background-color: lightblue; border-radius: 10px;
}
.subjectHead{  
  text-align: left;
  /*border-top: solid black 1px;*/
  padding-top: 1.302vw; /*25px*/
  padding-left: 1.302vw;
  font-size: 1.042vw; /*20px in 1920px width*/ 
}
.subjectList{  
  text-align: left;
  /*border-top: solid black 1px;*/
  padding-top: 1.302vw; /*25px*/
  padding-left: 1.302vw;
  font-size: 0.833vw; /*16px default*/
}
.summaryBox{
  box-sizing: border-box;  
  height: 26.042vw;/*500px;*/
  width: 35%;
  border-right: solid white 3.125vw; /*60px and 20px*/
  border-left: solid white 1.042vw;
  /*width: calc(35% - 4.167vw);
  margin-right : 3.125vw;
  margin-left : 1.042vw;*/
  background-color: lightblue;
}

</style>