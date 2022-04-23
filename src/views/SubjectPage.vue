<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'
import { useRouter } from 'vue-router'
import axios from 'axios'
import SubjectCompo from '../components/SubjectCompo.vue'
export default {
  name: 'SubjectPage',
  data() {
    return{
      subject: {},
      subj_input:'',
      search_subj:[],
        //[{su_id:'2301111', su_name: 'FREEDOM OF ASSEMBLY AND LAW1121321321', su_credit:"3", su_level:'4',su_genre:'CS-CORE',su_time:[[55,56,57,58,59,60],[99,100]],su_sec:[1,2],su_test:["10-Mar_AM","13-May_AM"]},],
      cart_subj_id:[],//['2301111','2301112'],
      cart_subj:[],
      inDB_subj_id:[], 
      inDB_subj:[], 
    }
  },
  components: {
    SubjectCompo
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
      if ((this.subj_input.length == 0) || (isNaN(this.subj_input)) || (this.subj_input > 10000000 ) || (this.subj_input < 999999)) { this.$vaToast.init({message: 'Please insert 7 digits input', position: 'bottom-left', color: 'warning'}); return; }
      
      await axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/subject/querySubject',{
      params: { id: this.subj_input }, headers:{"Access-Control-Allow-Origin":"*"}
      }).then(response =>{ ( this.subject=(response.data)) 
          if (this.subject != "No matching documents."){
            this.subject.su_time = JSON.parse(this.subject.su_time)
            this.subject.su_sec = JSON.parse(this.subject.su_sec)
            this.subject.su_test = this.subject.su_test.slice(1, -1).split(",")
            this.search_subj = [this.subject] 
          }
          else { this.$vaToast.init({message: 'No subject with this Subject ID.', position: 'bottom-left', color: 'warning'}); }
      }).catch(error => { console.log(error) })

    },
    sendtoSubjList(){
      this.inDB_subj_id = [...this.cart_subj_id]
      this.inDB_subj = [...this.cart_subj]
      this.cart_subj = []
      this.cart_subj_id = []
    }  
  },
  mounted() {
    
  },
}
</script>

<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <div class="navbar">
    <router-link to="/home" style="text-decoration: none; color: inherit;"><div class="navbox">Home</div></router-link>
    <router-link to="/subject" style="text-decoration: none; color: inherit;"><div class="navbox">Subject</div></router-link>
    <router-link to="/schedule" style="text-decoration: none; color: inherit;"><div class="navbox">Schedule</div></router-link>
    <router-link to="/history" style="text-decoration: none; color: inherit;"><div class="navbox">History</div></router-link>
    <div class="navbox" style="margin-left: auto;">{{ user?.email }}</div>
    <div class="navbox" @click="signOutUser">Sign Out</div>
  </div>

  <div class="subjectPageSplit">
    <div class="searchwrapper">
      <div class="searchSection">
        <h1>Search Subject</h1>
        <!-- <input v-model.lazy="subj_input" placeholder="Subject ID"> -->
        <div class="centerbutton">
          <va-input class="mb-4" style="width: 70%; margin-right: 30px;" v-model.lazy="subj_input" label="Subject ID (7 digits)" :mask="{blocks: [7]}" />
          <va-button @click="getSubj()" flat icon="search" color="blue" outline text-color="#2c3e50"></va-button> <!-- style="width: 30%; height: 20%;border-radius: 3px;" -->
        </div>
        <!-- <div>ID: {{ subject.su_id }} Name: {{ subject.su_name }} Genre: {{ subject.su_genre }}</div>
        <div>Subject: {{subj_input}}</div>-->
        </div>
    <div ><SubjectCompo v-for="item in this.search_subj" v-bind="item" :key="item.su_id"></SubjectCompo></div>
    <div class="cartSection">
    <h1>Cart</h1>
    <div><SubjectCompo v-for="item in this.cart_subj" v-bind="item" :key="item.su_id"></SubjectCompo></div>
    <va-button @click="sendtoSubjList()" icon="shopping_cart" color="blue" outline text-color="#2c3e50">Send {{cart_subj_id.length}} subject to Subject List</va-button>
    </div>
    </div>
  <div class="DBSection">
    <h1>Subject List</h1>
    <div><SubjectCompo v-for="item in this.inDB_subj" v-bind="item" :key="item.su_id"></SubjectCompo></div>
    {{inDB_subj_id}}
  </div>
  
  </div>
</template>
<style scoped>
.subjectPageSplit{
  width:100vw;
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
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.centerbutton{
  width: 40%;
  margin: auto;
  display: flex;
  /* flex-wrap: wrap; outline: solid #5e6f81 1px; */
}
.cartSection{
  width: 50vw;
  /* outline: solid #5e6f81 1px; */
  margin-top: 40px;
}
.DBSection{
  width:50vw;
  /* outline: solid #5e6f81 1px; */
}

</style>