<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'
import { useRouter } from 'vue-router'
import Test from '../components/TestCompo.vue'
import { arrnumber } from '../why.js'
import axios from 'axios'
import { useSubjectStore } from '../stores/subjectStore'
//import { initializeApp, applicationDefault, cert } from 'firebase/app'

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
      info:["something"],
      timeArray:['idk'],
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
    const subjStore = useSubjectStore()
    return { user, signOutUser, subjStore }
  },
  mounted(){
    hello();
    document.getElementById("test").innerHTML = "test"+arrnumber()+"/147";
    test.push({id: 123456, number: 456789});
    this.timeArray= this.getTimeArray([[51,52,93,94,95,96]],0);
    
    /*axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))*/
    /* axios.post('http://localhost:3000/subject/querySubject',{
      id: '5500112'
    }).then(response => (this.info=(response.data))) */////(this.info.push(response.data.su_time).catch(err => console.log(err))))//(this.info = response.data))*/

    /* axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/subject/querySubject',{
      params: { id: '5500112' }, headers:{"Access-Control-Allow-Origin":"*"}
    }).then(response => (this.info=(response.data)))  */
    
    axios.get('https://us-central1-cscuscheduler.cloudfunctions.net/api/student/queryStudent',{
      params: { id: '6133762823' }, headers:{"Access-Control-Allow-Origin":"*"}
    }).then(response => (this.info=(response.data))) 


    //console.log(this.info)
  },
  methods: {
    //myFunction() { document.getElementById("demo").innerHTML = "demo"+arra+"/157"; }
    test() //{ console.log(typeof(this.info))},
    { console.log(JSON.parse(this.info.su_time)) }, 
    //{ console.log(typeof(this.info.su_time))},
    myFunction() { this.how.push([123]); },
    getTimeArray(inputList,sec) {
      var inList = inputList[sec]; 
      var splitArr = [];
      var start = 0;
      var end = 0;
      for (var i = 0; i < inList.length; i++) {
      if (i < inList.length-1) {
        if (inList[i+1]> inList[i]+1) {
          end = i+1;
          splitArr.push(inList.slice(start,end));
          start = end;
        }
      }
      else {splitArr.push(inList.slice(start,inList.length));}
      }
      var timeArr = [];
      for (var j=0; j < splitArr.length; j++) { 
        var timeObj = {date:'',stTime:'',enTime:''}
        var startTime = splitArr[j][0]
        var endTime = (splitArr[j]).at(-1);
        switch (Math.floor(startTime/22)) {
          case 0: timeObj.date = 'MON'; break;
          case 1: timeObj.date = 'TUE'; break;
          case 2: timeObj.date = 'WED'; break;
          case 3: timeObj.date = 'THU'; break;
          case 4: timeObj.date = 'FRI'; break;
          default: break;
        }
        switch ((startTime%22)-1) {
          case 0: timeObj.stTime = '8:00'; break;
          case 1: timeObj.stTime = '8:30'; break;
          case 2: timeObj.stTime = '9:00'; break;
          case 3: timeObj.stTime = '9:30'; break;
          case 4: timeObj.stTime = '10:00'; break;
          case 5: timeObj.stTime = '10:30'; break;
          case 6: timeObj.stTime = '11:00'; break;
          case 7: timeObj.stTime = '11:30'; break;
          case 8: timeObj.stTime = '12:00'; break;
          case 9: timeObj.stTime = '12:30'; break;
          case 10: timeObj.stTime = '13:00'; break;
          case 11: timeObj.stTime = '13:30'; break;
          case 12: timeObj.stTime = '14:00'; break;
          case 13: timeObj.stTime = '14:30'; break;
          case 14: timeObj.stTime = '15:00'; break;
          case 15: timeObj.stTime = '15:30'; break;
          case 16: timeObj.stTime = '16:00'; break;
          case 17: timeObj.stTime = '16:30'; break;
          case 18: timeObj.stTime = '17:00'; break;
          case 19: timeObj.stTime = '17:30'; break;
          case 20: timeObj.stTime = '18:00'; break;
          case 21: timeObj.stTime = '18:30'; break;
          default: break;
        }
        switch ((endTime%22)-1) {
          case 0: timeObj.enTime = '8:30'; break;
          case 1: timeObj.enTime = '9:00'; break;
          case 2: timeObj.enTime = '9:30'; break;
          case 3: timeObj.enTime = '10:00'; break;
          case 4: timeObj.enTime = '10:30'; break;
          case 5: timeObj.enTime = '11:00'; break;
          case 6: timeObj.enTime = '11:30'; break;
          case 7: timeObj.enTime = '12:00'; break;
          case 8: timeObj.enTime = '12:30'; break;
          case 9: timeObj.enTime = '13:00'; break;
          case 10: timeObj.enTime = '13:30'; break;
          case 11: timeObj.enTime = '14:00'; break;
          case 12: timeObj.enTime = '14:30'; break;
          case 13: timeObj.enTime = '15:00'; break;
          case 14: timeObj.enTime = '15:30'; break;
          case 15: timeObj.enTime = '16:00'; break;
          case 16: timeObj.enTime = '16:30'; break;
          case 17: timeObj.enTime = '17:00'; break;
          case 18: timeObj.enTime = '17:30'; break;
          case 19: timeObj.enTime = '18:00'; break;
          case 20: timeObj.enTime = '18:30'; break;
          case 21: timeObj.enTime = '19:00'; break;
          default: break;
        }
        timeArr.push(timeObj);
      }
      return timeArr;
    }
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
  counter{{ this.subjStore.counter }} <br>
  counter original?{{ subjStore.counter }} <br>
  {{timeArray}}
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
  API Call Here: {{info}}
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