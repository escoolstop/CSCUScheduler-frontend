<script>
import { getAuth, signOut } from 'firebase/auth'
import { useAuthState } from '../firebase'
import { useRouter } from 'vue-router'

export default {
  name: 'SchedulePage',
  data(){
    return{
      testdata:[[2301696,2301369],[3301696,3301369],[2116516],[],[],[],[],[],[],[],[11],[],[],[],[],[],[],[],[],[],[],[22],
               [23],[],[],[],[],[],[],[],[],[],[33],[],[],[],[],[],[],[],[],[],[],[44],
               [],[],[],[],[],[],[],[],[],[],[55],[],[],[],[],[],[],[],[],[],[],[66],
               [],[],[],[],[],[],[],[],[],[],[77],[],[],[],[],[],[],[],[],[],[],[88],
               [],[],[],[],[],[],[],[],[],[],[99],[],[],[],[],[],[],[],[],[],[],[110]]
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
    <h1>Welcome {{ user?.email }}!</h1>
    <button @click="signOutUser">Sign Out</button>
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
        <div class="Rtable-cell inner" v-for="subArray in testdata.slice(0, 22)" :key="subArray" :class="{redTimeSlot: subArray.length>1}"><div v-for="subId in subArray" :key="subId">{{subId}}</div></div>
        <!--div class="Rtable-cell inner"><div v-for="subArray in testdata[0]" :key="subArray">{{subArray}}</div></div-->

        <div class="Rtable-cell head rowH">TUE</div>
        <div class="Rtable-cell inner" v-for="subArray in testdata.slice(22, 44)" :key="subArray"><div v-for="subId in subArray" :key="subId">{{subId}}</div></div>
      
        <div class="Rtable-cell head rowH">WED</div>
        <div class="Rtable-cell inner" v-for="subArray in testdata.slice(44, 66)" :key="subArray"><div v-for="subId in subArray" :key="subId">{{subId}}</div></div>

        <div class="Rtable-cell head rowH">THU</div>
        <div class="Rtable-cell inner" v-for="subArray in testdata.slice(66, 88)" :key="subArray"><div v-for="subId in subArray" :key="subId">{{subId}}</div></div>

        <div class="Rtable-cell head rowH">FRI</div>
        <div class="Rtable-cell inner">2301112<br>CALCULUS</div>
        <div class="Rtable-cell inner">2301112<br>CALCULUS</div>
        <div class="Rtable-cell inner" style="background-color: lightcyan;">2000501<br>CON PDG PEACE CONF</div>
        <div class="Rtable-cell inner" style="background-color: lightcyan;">2000501<br>CON PDG PEACE CONF</div>
        <div class="Rtable-cell inner" style="background-color: red;">2000501<br>CON PDG PEACE CONF<br>2301112<br>CALCULUS</div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner">99</div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner"></div>
        <div class="Rtable-cell inner">110</div>
      
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

.Rtable {
  margin: 0 1%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  align-self: center;
  width: 98%;
  /*min-width: 1440px;*/
  font-size: max(0.833vw, 12px);/*16px with min 12px*/
}
.Rtable-cell {
  box-sizing: border-box;
  width: 4.3%;
  /*padding: 0.8em 1.2em;*/
  padding: 12.5px 3px;
  overflow: hidden;
  list-style: none;
  border: solid 1px black;
  background: white;
  white-space: nowrap;
  /*text-overflow: "";/*ellipsis;*/
  text-overflow: ellipsis;
  text-align: center;
  align-items: center;
  height: 100px;
}
.head {
  background-color: lightcyan;
}
.rowH {
  width: 5.4%;
  padding: 37.5px 0;
  border-left-style: solid;
  border-top-style: none;
}
.columnH {
  height: 50px;
  padding: 15px 0;
  width: 8.6%;
  border-top-style: solid;
  border-left-style: none;
}
.edge {
  border-left-style: solid;
  border-top-style: solid;
  height: 50px;
  width: 5.4%;
  padding: 15px 0;
}
.inner {
  border-left-style: none;
  border-top-style: none;
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
.redTimeSlot{
  background-color: red;
}
</style>