<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'
import { useRouter } from 'vue-router'
/* import { db } from "../firebase";
import { onMounted, reactive } from "vue";
import { doc, getDoc } from "firebase/firestore";  */
import NewsCompo from '../components/NewsCompo.vue'
import axios from 'axios'
export default {
  name: 'SubjectPage',
  data() {
    return{
      loadstate:true,
      subject:{},
      //annArrayData:[],
      annArrayData:[{ann_id:"1",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"2",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"3",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"4",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},
                    {ann_id:"5",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"6",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"7",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"8",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},
                    {ann_id:"9",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"10",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"11",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"12",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},      
                    {ann_id:"13",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"14",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"15",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"16",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},
                    {ann_id:"17",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"18",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"19",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},{ann_id:"20",ann_des:"ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ ข่าวสารที่จะประกาศ "},                   
      ],
      //annArray:[],
      pageSize:6,
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
    /* setDisplay(){
      this.annArray = this.annArrayData.slice()
    }, */
  },
  mounted(){
    /* this.annArray = this.annArrayData.slice(2,3) 
    this.setDisplay() */
    axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/announcement/queryAnnouncement',{
      headers:{"Access-Control-Allow-Origin":"*"}
    }).then(response => {(this.annArrayData=(response.data));
     this.annArrayData.sort((a,b) => parseInt(b.ann_id) - parseInt(a.ann_id));
     this.loadstate=false}) 
  }
}
</script>

<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <div class="navbar">
    <router-link to="/home" style="text-decoration: none; color: inherit;"><div class="navboxactive">Home</div></router-link>
    <router-link to="/subject" style="text-decoration: none; color: inherit;"><div class="navbox">Subject</div></router-link>
    <router-link to="/schedule" style="text-decoration: none; color: inherit;"><div class="navbox">Schedule</div></router-link>
    <router-link to="/history" style="text-decoration: none; color: inherit;"><div class="navbox">History</div></router-link>
    <div class="navbox" style="margin-left: auto;">{{ user?.email }}</div>
    <div class="navbox" @click="signOutUser">Sign Out</div>
  </div>
  <img class="loading" v-if="loadstate" src = "../assets/loading-spinner.svg" alt="My Happy SVG"/>
  <div class="news" v-if="!loadstate">
  <!-- <div class="centerNews"> -->
    <h1>Announcement</h1>
    <hr style="width:35%; min-width:300px;">
    <div class="centerNews">
    <NewsCompo v-for="ann in this.annArrayData.slice(((currentPage-1)*pageSize),(currentPage*pageSize))" v-bind="ann" :key="ann.ann_id"> 
      <!-- Announcement ID {{ann.ann_id}} : {{ann.ann_des}} -->
    </NewsCompo></div>
    <div class="pagecenter">
      <va-pagination v-model="currentPage" :pages="Math.ceil(annArrayData.length/pageSize)" :visible-pages="5"/>
    </div>
  
  </div>
</template>
<style scope>
.loading{
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  width: 100px;
  height: 100px;
}
.news{
  margin: 0 min(25%, 400px);
  margin-top: 30px;
  padding-top: 1px;
  border-radius: 5px;
  height: 80vh;
  position: relative;
  background-color: rgb(189, 228, 241);
  
}
.centerNews{
  width: 100%;
  margin: auto auto;
  margin-top: 30px; 
  padding-top: 0.05vw;
  
  height: 75%;
  overflow: auto;
  scrollbar-color: #888 #f1f1f1;
  scrollbar-width: thin;
}
.pagecenter{
  position: absolute;
  width: 100%;
  margin: 0px auto;
  padding-top: 20px;
  margin-bottom: 0px;
  display:flex;
  justify-content: center;
  bottom: 0; 
  
  background-color: #f1f5f8;
}
</style>