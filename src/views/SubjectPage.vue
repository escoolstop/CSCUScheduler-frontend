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
      subject:{},
      subj_input:'',
      search_subj:[{su_id:'2301111', su_name: 'CALCULUS I', su_credit:3, su_level:'4',su_genre:'CS1',su_time:[[51,52,93,94,95,96],[11,12,13,14,51,52,91,92,93,94,95,96]],su_sec:[1,2]},
      {su_id:'1234567', su_name: 'FREEDOM OF ASSEMBLY AND LAW1121321321', su_credit:3, su_level:'4',su_genre:'CS-CORE',su_time:[[55,56,57,58,59,60],[99,100]],su_sec:[1,2],su_test:["10-Mar_AM","13-May_AM"]},],
      cart_subj_id:[],//['2301111','2301112'],
      cart_subj:[]
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
    getSubj(subj_id) {
      console.log("good") 
      axios.post('http://localhost:3000/subject/querySubject',{
        id: subj_id
      })
      .then(response =>{ (this.subject=(response.data)) })
      .catch(error => { console.log(error) }) }
  }
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
  <div class="searchSection">
    <h1>Finding Subject</h1>
    <input v-model.lazy="subj_input" placeholder="Subject ID">
    <button class="button" @click="getSubj(subj_input)">Search</button>
  <div>ID: {{ subject.su_id }} Name: {{ subject.su_name }} Genre: {{ subject.su_genre }}</div>
  <div>Subject: {{subj_input}}</div>

  <!-- <div><SubjectCompo v-bind="{su_id:'2301111', su_name: 'CALCULUS I', su_credit:3, su_level:'4',su_genre:'CS1',su_time:[[51,52,93,94,95,96],[11,12,13,14,51,52,91,92,93,94,95,96]],su_sec:[1,2]}"></SubjectCompo></div> -->

  <div><SubjectCompo v-for="item in this.search_subj" v-bind="item" :key="item.su_id"></SubjectCompo></div>
  </div>
  <div class="cartSection">
  <h1>Cart</h1>
  <div><SubjectCompo v-for="item in this.cart_subj" v-bind="item" :key="item.su_id"></SubjectCompo></div>
  </div>
  </div>
</template>
<style>
.subjectPageSplit{
  width:100%;
  outline: solid #5e6f81 1px;
  display: flex;
}
.searchSection{
  width:50%;
  outline: solid #5e6f81 1px;
}
.cartSection{
  width:50%;
  outline: solid #5e6f81 1px;
}
</style>