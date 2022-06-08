<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState, getUserState } from '../firebase'
import { useRouter } from 'vue-router'
import axios from 'axios'
import NewsCompo from '../components/NewsCompo.vue'
export default {
  name: 'AdminPage',
  data() {
    return{
      loadstate:true,
      adminList : ["coolstopmaplestory@gmail.com","supalerkchokwaree@gmail.com"],
      annArrayData:[],
      pageSize:6,
      currentPage:1,
      AnnInput:"",
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
    async addNews(){
      var ann_ID = (parseInt(this.annArrayData[0].ann_id)+1).toString();
      await axios.put('https://us-central1-cscuscheduler.cloudfunctions.net/api/announcement/addAnnouncement',{
            des: this.AnnInput , headers:{"Access-Control-Allow-Origin":"*"}
            }).then(response =>{ (console.log(response))
              this.annArrayData.splice(0,0, { ann_id: ann_ID, ann_des: this.AnnInput })
              this.AnnInput= "";
            })
      }
  },
  async mounted(){
    if (this.adminList.includes(getAuth().currentUser.email)) { 
      this.admin = true;
      await axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/announcement/queryAnnouncement',{
      headers:{"Access-Control-Allow-Origin":"*"}
      }).then(response => {(this.annArrayData=(response.data)); this.loadstate=false})
      this.annArrayData.sort((a,b) => parseInt(b.ann_id) - parseInt(a.ann_id));
      this.loadstate=false
      }
    else {useRouter().push('/home')}
    
  }
}
</script>

<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <div class="navbar">
    <router-link to="/home" style="text-decoration: none; color: inherit;"><div class="navbox">Return to User Mode</div></router-link>
    <router-link to="/admin" style="text-decoration: none; color: inherit;"><div class="navboxactive">Add Announcement</div></router-link>
    <div class="navbox" style="margin-left: auto;">{{ user?.email }}</div>
    <div class="navbox" @click="signOutUser">Sign Out</div>
  </div>
  <img class="loading" v-if="loadstate" src = "../assets/loading-spinner.svg" alt="My Happy SVG"/>

  <div class="newsWrap">
  <div class="newsAdmin" v-if="!loadstate">
  <!-- <div class="centerNews"> -->
    <h1>Announcement</h1>
    <hr style="width:35%; min-width:300px;">
    <div class="centerNews">
    <NewsCompo v-for="ann in this.annArrayData.slice(((currentPage-1)*pageSize),(currentPage*pageSize))" v-bind="ann" :key="ann.ann_id"> 
     <!--  Announcement ID {{ann.ann_id}} : {{ann.ann_des}} -->
    </NewsCompo></div>
    <div class="pagecenter">
      <va-pagination v-model="currentPage" :pages="Math.ceil(annArrayData.length/pageSize)" :visible-pages="5"/>
    </div>
  </div>
  <div class="newsAdd" v-if="!loadstate"><h1>Add Announcement</h1>
  <!-- <va-input class="mb-4" style="width: 70%; margin-right: 30px; " v-model.lazy="subj_input" label="Subject ID (7 digits)" :mask="{blocks: [7]}" /> -->
    <va-input class="mb-4" v-model="this.AnnInput" type="textarea" label="Announcement Description" style="width: 80%; margin: 0 auto;"/>
    <va-button @click="addNews()" icon="add_circle_outline" color="blue" outline text-color="#2c3e50" style="margin: 20px auto;">Publish Announcement</va-button>
  </div>
  </div>
</template>
<style scope>
.newsWrap{
  width: 100%;
  display: flex;
}
.newsAdd{
  width: 35%;
  margin-right: 5%;
  margin-top: 30px;
  padding-top: 1px;
  border-radius: 5px;
  height: fit-content;
  position: relative;
  background-color: rgb(189, 228, 241);
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
.newsAdmin{
  width: 50%;
  margin: 0 5%;
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