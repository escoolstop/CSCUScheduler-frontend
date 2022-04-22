<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'
import { useRouter } from 'vue-router'
import { db } from "../firebase";
import { onMounted, reactive } from "vue";
import { doc, getDoc } from "firebase/firestore"; 
import NewsCompo from '../components/NewsCompo.vue'
export default {
  name: 'SubjectPage',
  data() {
    return{
      subject:{},
      annArrayData:[{ann_id:"1",ann_des:"Testing your mom-------------------------------------"},{ann_id:"2",ann_des:"Testing your mom"},{ann_id:"3",ann_des:"Testing your mom"},{ann_id:"4",ann_des:"Testing your mom"},
                    {ann_id:"5",ann_des:"Testing your mom"},{ann_id:"6",ann_des:"Testing your mom"},{ann_id:"7",ann_des:"Testing your mom"},{ann_id:"8",ann_des:"Testing your mom"},
                    {ann_id:"9",ann_des:"Testing your mom"},{ann_id:"10",ann_des:"Testing your mom"},{ann_id:"11",ann_des:"Testing your mom"},{ann_id:"12",ann_des:"Testing your mom"},      
                    {ann_id:"13",ann_des:"Testing your mom"},{ann_id:"14",ann_des:"Testing your mom"},{ann_id:"15",ann_des:"Testing your mom"},{ann_id:"16",ann_des:"Testing your mom"},
                    {ann_id:"17",ann_des:"Testing your mom"},{ann_id:"18",ann_des:"Testing your mom"},{ann_id:"19",ann_des:"Testing your mom"},{ann_id:"20",ann_des:"Testing your mom"},   
                    
      ],
      annArray:[],
      pageSize:10,
      currentPage:1,
    }
  },
  components: {
    NewsCompo
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
  methods:{
    setDisplay(){
      this.annArray = this.annArrayData.slice()
    },
  },
  created(){
    this.annArray = this.annArrayData.slice(2,3) 
    this.setDisplay()
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
  Announcement
  <div class="centerNews"><NewsCompo v-for="ann in this.annArrayData.slice(((currentPage-1)*pageSize),(currentPage*pageSize))" v-bind="ann" :key="ann.ann_id"> Announcement ID {{ann.ann_id}} : {{ann.ann_des}}</NewsCompo></div>
  <div class="center"><va-pagination v-model="currentPage" :pages="annArrayData.length/pageSize" :visible-pages="5" color="#aa3b6a" /></div>
</template>
<style scope>
.centerNews{
  width:100%;
}
.center{
  margin: auto;
  display:flex;
  justify-content: center;
}
</style>