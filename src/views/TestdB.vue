<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'
import { useRouter } from 'vue-router'
import Test from '../components/TestCompo.vue'
import { arrnumber } from '../why.js'
import axios from 'axios'
//import { initializeApp, applicationDefault, cert } from 'firebase/app'

//import { student } from '../backend/Routes/student.js'

/*
import { firebaseApp } from '../firebase'
// eslint-disable-next-line no-unused-vars
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const app = firebaseApp;
const db = getFirestore(app);
const how = "test";
async function getAll(db) {
    const citiesCol = collection(db, 'student');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    document.getElementById("demo").innerHTML = cityList;

    const studentRef = db.collection('student').doc('YVSSgZShJYbMTBuIdnPp');
    const test = await studentRef.get();
    document.getElementById("demo").innerHTML = test.data();
}
getAll(db);
*/
var test= [{id: 1, number: 8}, {id: 2, number: 16}];
var test1= [{id: 123, number: 456}, {id: 234, number: 567}];
var test5= [[12,34],[31,42]]


//test1.push(test.pop(test));
var len = test.length;
var arra = arrnumber();
function hello(){
  document.getElementById("demo").innerHTML = "demo"+arra+"/137";
}

export default {
  data() {
    return {
      displaymode:0,
      how:test,
      how1:test1,
      how5:test5,
      leng:len,
      array1:test,
      info:"something",
      //impromtu:student
    }
  },
  components: {
    Test
  },
  setup() {
    /*const db = firebaseApp;
    const studentRef = db.collection('student').doc('YVSSgZShJYbMTBuIdnPp');
    const doc = await studentRef.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }*/
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
  mounted(){
    hello();
    document.getElementById("test").innerHTML = "test"+arrnumber()+"/147";
    test.push({id: 123456, number: 456789});
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
    //student.post()
  },
  methods: {
    //myFunction() { document.getElementById("demo").innerHTML = "demo"+arra+"/157"; }
    myFunction() { this.how.push([123]); }
  }
}

</script>

<template>
  <div class="container">
    <div class="navt">
      <router-link to="/home" style="text-decoration: none; color: inherit;"><div class="navtbox">Home</div></router-link>
      <router-link to="/subject" style="text-decoration: none; color: inherit;"><div class="navtbox">Subject</div></router-link>
      <router-link to="/schedule" style="text-decoration: none; color: inherit;"><div class="navtbox">Schedule</div></router-link>
      <router-link to="/history" style="text-decoration: none; color: inherit;"><div class="navtbox"><div>Weight</div></div></router-link>
      <div class="navtbox" style="margin-left: auto;">{{ user?.email }}</div>
      <div class="navtbox" style="cursor:pointer;" @click="signOutUser">Sign Out</div>
  </div>
  </div>
  <div>
    <p>Test</p>
  </div>
  <div><Test name='idk' number=123></Test></div>
  <button @click="myFunction()">Click me</button>
  <button @click="displaymode=1;">Display 1</button>
  <button @click="displaymode=2;">Display 2</button>
  <button @click="displaymode=3;">Display 3</button>
  <button @click="displaymode=4;">Display 4</button>
  <button @click="displaymode=5;">Display 5</button>
  <p id="demo">demo</p>
  <p id>array1 {{how}}</p>
  <p id>array2 {{how1}}</p>
  <p id="bind">arraylength {{leng}}</p>
  <p id="bind">arraylength test{{array1.length}}</p>
  <p id="test">test</p>
  <ul>
  <li v-for="item in how" :key="item.id">
    test id:{{ item.id }} number:{{ item.number }}
  </li>
  </ul>
  <button @click="test()">insert 1</button>
  <div v-if="displaymode==1" class=wraplist>
    <div v-for="item in how" :key="item.id" class=fordisplay>
      test id:{{ item.id }} number:{{ item.number }}
    </div>
  </div>
  <div v-if="displaymode==2" class=wraplist>
    <div v-for="item in how1" :key="item.id" class=fordisplay>
      test id:{{ item.id }} number:{{ item.number }}
    </div>
  </div>
  <div v-if="displaymode==4" class=wraplist>
    {{how5[0][1]}}
  </div>
  <div v-if="displaymode==5" class=wraplist>
    <div v-for="item in how5" :key="item.id" class=fordisplay>
      test id:{{ item[0] }} number:{{ item.number }}
    </div>
  </div>
  {{info}}
</template>

<style scope>
.wraplist{
  background-color: lightblue;
  margin: 0 auto;
  width: 20%;
}
.fordisplay{
  text-align: left;
}
.navt{
  margin: 0;
  border: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
	position: sticky;
	top: 0;
  width: 100%;
  display: flex;
}
.navtbox{
  text-decoration: none;
  display: block;
  color: white;
  text-align: center;
  padding: 0 25px;
  height: 50px;
  display: flex;
  align-items: center;
}
.navtboxstatic{
  text-decoration: none;
  display: block;
  color: white;
  text-align: center;
  padding: 0 16px;
  display: flex;
  align-items: center;
}
.navtbox:hover {
  background-color: #111;
}
</style>