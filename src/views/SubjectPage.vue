<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'
import { useRouter } from 'vue-router'
import axios from 'axios'
import SubjectCompo from '../components/SubjectCompo.vue'
import debounce from 'lodash.debounce'
//import SubjectCompoN from '../components/SubjectNestCompo.vue'
export default {
  name: 'SubjectPage',
  data() {
    return{
      loadstate:true,
      subject: [],
      subj_input:'',
      search_subj:[],
        //[{su_id:'2301111', su_name: 'FREEDOM OF ASSEMBLY AND LAW1121321321', su_credit:"3", su_level:'4',su_genre:'CS-CORE',su_time:[[55,56,57,58,59,60],[99,100]],su_sec:[1,2],su_test:["10-Mar_AM","13-May_AM"]},],
      cart_subj_id:[],//['2301111','2301112'],
      cart_subj:[],
      //[{su_id:'2301111', su_name: 'FREEDOM OF ASSEMBLY AND LAW', su_credit:"3", su_level:'4',su_genre:'CS-CORE',su_time:[[55,56,57,58,59,60],[99,100]],su_sec:[1,2],su_test:["10-Mar_AM","13-May_AM"]},],
      inDB_subj_id:[],
      inDB_subj_temp:[], 
      inDB_subj:[],
      showModal: false,
      student_ID:'',
      //[{su_id:'2301111', su_name: 'FREEDOM OF ASSEMBLY AND LAW', su_credit:"3", su_level:'4',su_genre:'CS-CORE',su_time:[[55,56,57,58,59,60],[99,100]],su_sec:[1,2],su_test:["10-Mar_AM","13-May_AM"]},],
      windowTop:false,
    }
  },
  components: {
    SubjectCompo,
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
    async getSubj() {
      /* if (!(this.subj_input.length == 7) || !(/^\d+$/.test(this.subj_input)) ) { this.$vaToast.init({message: 'Please insert 7 digits input', position: 'bottom-left', color: 'warning'}); return; } */
      /*  if ( !(/^\d+$/.test(this.subj_input)) ) { this.$vaToast.init({message: 'Please insert digits input', position: 'bottom-left', color: 'warning'}); return; } */
      await axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/subject/querySubject',{
      params: { id: this.subj_input }, headers:{"Access-Control-Allow-Origin":"*"}
      }).then(response =>{ ( this.subject=(response.data)) 
          /* console.log(this.subject) */
          if (this.subject != "No matching documents."){
            for (var i = 0; i < this.subject.length; i++){
              /* console.log(this.subject[i].su_name + this.subject[i].su_time + "sec" + this.subject[i].su_sec) */
              this.subject[i].su_time = JSON.parse(this.subject[i].su_time) 
              this.subject[i].su_sec = JSON.parse(this.subject[i].su_sec)
              /* if (!(Array.isArray(this.subject[i].su_time))){this.subject[i].su_time = JSON.parse(this.subject[i].su_time)}
              if (!(Array.isArray(this.subject[i].su_sec))){this.subject[i].su_sec = JSON.parse(this.subject[i].su_sec)} */
            }
            this.search_subj = [...this.subject] 
          }
          else { this.$vaToast.init({message: 'This subject does not exist.', position: 'bottom-left', color: 'warning'}); }
      }).catch(error => { console.log(error) })

    },
    async sendtoSubjList(){
      this.inDB_subj_id.push(...this.cart_subj_id);
      this.inDB_subj.push(...this.cart_subj);
      //this.inDB_subj = [this.inDB_subj,...this.cart_subj]
      this.cart_subj = []
      this.cart_subj_id = []
      var stringArrID = JSON.stringify((this.inDB_subj_id).map(String))
      /* console.log(stringArrID) */
      await axios.put('https://us-central1-cscuscheduler.cloudfunctions.net/api/student/updateSubject',{
        id: this.student_ID , data: stringArrID , headers:{"Access-Control-Allow-Origin":"*"}
    }).then(response => (console.log(response.data))).catch(error => { console.log(error) })
    },  
    async updateDB(){
      var stringArrID = JSON.stringify(this.inDB_subj_id);
      console.log("id: "+this.student_ID+" data: "+stringArrID );
      axios.put('https://us-central1-cscuscheduler.cloudfunctions.net/api/student/updateSubject',{
        id: this.student_ID , data: stringArrID , headers:{"Access-Control-Allow-Origin":"*"}
      }).then(response => (console.log(response.data))).catch(error => { console.log(error) })
    },
    moveUp(){
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    scrollCheck(e){
      if (window.top.scrollY > 400 ) { this.windowTop =true; return; }
      this.windowTop = false;
      return;
    },
  },
  async mounted() {
    this.scrollCheckDebounced = debounce(this.scrollCheck, 100);
    window.addEventListener("scroll", this.scrollCheckDebounced)
    var stEmail = getAuth().currentUser.email;
    await axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/student/queryStudentByEmail',{
      params: { email: stEmail }, headers:{"Access-Control-Allow-Origin":"*"}
    }).then(response => {  
      if (response.data.st_subject == "") { this.inDB_subj_id = [];}
      else {this.inDB_subj_id = JSON.parse(response.data.st_subject);} this.student_ID = response.data.cr_id})

    if (!this.inDB_subj_id.length == 0) {
      axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/subject/queryMultSubject',{
      params: { id: this.inDB_subj_id }, headers:{"Access-Control-Allow-Origin":"*"}
      }).then(response =>{ (this.inDB_subj_temp=(response.data))
      for (var i = 0; i < this.inDB_subj_temp.length; i++){
        this.inDB_subj_temp[i].su_time = JSON.parse(this.inDB_subj_temp[i].su_time)
        this.inDB_subj_temp[i].su_sec = JSON.parse(this.inDB_subj_temp[i].su_sec)
      }
      this.inDB_subj = [...this.inDB_subj_temp]
    })}
    this.loadstate=false
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.scrollCheckDebounced)
  },
}
</script>

<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <div class="navbar">
    <router-link to="/home" style="text-decoration: none; color: inherit;"><div class="navbox">Home</div></router-link>
    <router-link to="/subject" style="text-decoration: none; color: inherit;"><div class="navboxactive">Subject</div></router-link>
    <router-link to="/schedule" style="text-decoration: none; color: inherit;"><div class="navbox">Schedule</div></router-link>
    <router-link to="/history" style="text-decoration: none; color: inherit;"><div class="navbox">History</div></router-link>
    <div class="navbox" style="margin-left: auto;">{{ user?.email }}</div>
    <div class="navbox" @click="signOutUser">Sign Out</div>
  </div>
  <img class="loading" v-if="loadstate" src = "../assets/loading-spinner.svg" alt="My Happy SVG"/>
  <va-button @click="moveUp()" v-if="windowTop" style="position: fixed;bottom: 20px;right: 20px;" icon-right="keyboard_arrow_up" outline>Return to Top</va-button>
  <div class="subjectPageSplit" v-if="!loadstate">
    <div class="searchwrapper">

      <div class="cartSection">
      <!-- <hr style="width:50%;">   -->   
        <div class="cartWrapper">
        <h1>Appending Subject</h1>
        <SubjectCompo v-for="item in this.cart_subj" v-bind="item" :key="item.su_id"></SubjectCompo>
        <va-button @click="sendtoSubjList()" icon="playlist_add" color="blue" outline text-color="#2c3e50">Send {{cart_subj_id.length}} subject to Subject List</va-button></div>
      </div>

      <div class="cartWrapper" style="margin-top: 2.1vw;">
        <h1>Search Subject</h1>
        <!-- <input v-model.lazy="subj_input" placeholder="Subject ID"> -->
        <div class="centerbutton">
          <va-input class="mb-4" style="width: 70%; margin-right: 30px; " v-model.lazy="subj_input" label="Subject ID (7 digits)" :mask="{blocks: [7]}" />
          <va-button @click="getSubj()" flat icon="search" color="blue" outline text-color="#2c3e50" style="width: 20px;"></va-button> <!-- style="width: 30%; height: 20%;border-radius: 3px;" -->
        </div>
        <!-- <div>ID: {{ subject.su_id }} Name: {{ subject.su_name }} Genre: {{ subject.su_genre }}</div>
        <div>Subject: {{subj_input}}</div>-->
        
        <div><SubjectCompo v-for="item in this.search_subj" v-bind="item" :key="item.su_id"></SubjectCompo></div>      
      </div>

      
      <!-- <div class="cartSection">
       
        <div class="cartWrapper">
        <h1>Subject in Cart</h1>
        <SubjectCompo v-for="item in this.cart_subj" v-bind="item" :key="item.su_id"></SubjectCompo>
        <va-button @click="sendtoSubjList()" icon="shopping_cart" color="blue" outline text-color="#2c3e50">Send {{cart_subj_id.length}} subject to Subject List</va-button></div>
      </div> -->

      
    </div>
  <div class="DBSection">
    <div class="cartWrapper">
    <h1>Subject List</h1>
    <div><SubjectCompo v-for="item in this.inDB_subj" v-bind="item" :key="item.su_id"></SubjectCompo></div></div>
  </div>
  
  </div>
</template>
<style scoped>
.loading{
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
}
.subjectPageSplit{
  width: 100%;
  /* outline: solid #5e6f81 1px; */
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
}
.searchwrapper{
  width: 50vw; box-shadow: inset -3px 0 #808080;
/*   outline: solid #5e6f81 1px; */
}
.searchSection{
  background-color: lightblue;
  /* outline: solid #5e6f81 1px; */
/*   width: 30%;
  margin: 0% 10%; */
  width: 60%;
  margin: 0% 20%;
  margin-bottom: 1.042vw;
  padding-bottom: 1.042vw;
}
.centerbutton{
  width: 40%;
  margin: auto;
  display: flex;
  
  margin-bottom: 1.042vw;
  justify-content: center;
  /* flex-wrap: wrap; outline: solid #5e6f81 1px; */
}
.cartSection{
  width: 50vw;
  /* outline: solid #5e6f81 1px; */
 /*  margin-top: 2.1vw; */
 /*  background-color: lightblue; */
  /* background: linear-gradient(#6699cc, #6699cc);
background-size: 50% 200px;
background-repeat: no-repeat; */
}
.cartWrapper{
  background-color: lightblue;
  /* outline: solid 2px #2c3e50; */
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
  padding-top: 2px;
  padding-bottom: 0.521vw;
  width: 90%;
  margin: 0 5%;
  border-radius: 5px;
  
}
.DBSection{
  width: calc(50vw - 10px);
  /* outline: solid #5e6f81 1px; */
}

</style>