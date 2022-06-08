<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { getUserState } from '../firebase'
export default {
  setup() {
    /* console.log(getUserState()) */
    const auth = getAuth()
    const router = useRouter()
    var createDB = ""
    const handleSubmit = async e => {
      const { stID,name,email, password } = e.target.elements
      /* console.log(stID.value,name.value,email.value,password.value); */
      if ( (/^\d+$/.test(stID.value)) && stID.value.length == 10 ) {
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value)
        axios.put('https://us-central1-cscuscheduler.cloudfunctions.net/api/student/createStudent',{
        id: stID.value, name: name.value, email: email.value , headers:{"Access-Control-Allow-Origin":"*"}
        }).then(response => {(createDB=(response.data.status))
        if (createDB == 'OK') { router.push('/schedule') }        
        }).catch(error => { getAuth().currentUser.delete(); alert("Your student ID is already used."); console.log(error);})
      } catch (e) {
        alert(e.message)
      }
      }
      else { alert("Please input valid student ID.")}
    }
    return { handleSubmit }
  }
}
</script>

<template>
<div class="background">
  <div id="absoluteCenteredDiv">
    <form @submit.prevent="handleSubmit">
      <div class="box">
        <h1>Register </h1>
        <input class="fillbox" maxlength="20" name="name" placeholder="First name" type="text" />
        <input class="fillbox" maxlength="10" name="stID" placeholder="Student ID (10 Digits)" type="text" />
        <input class="fillbox" name="email" placeholder="E-mail" type="email" />
        <input class="fillbox" name="password" placeholder="Password (at least 6 char)" type="password" />
        <a href="#"><button class="button" type="submit">Sign Up</button></a>
      </div>
    </form>
    <p>
      Already have an account? <router-link to="/login">Login here</router-link>
    </p>
  </div>
</div>
</template>

<style scoped>
.background{
  background-image: url("../assets/cool-background.png");
  width: 100vw;
  height: 100vh;
}
.box {
  background: skyblue;
  width: 300px;
  border-radius: 6px;
  margin: 0 auto 0 auto;
  padding: 0px 0px 70px 0px;
  border: skyblue 4px solid;
}
.fillbox {
  background: white;
  border: #ccc 1px solid;
  border-bottom: #ccc 2px solid;
  padding: 8px;
  width: 250px;
  color: #000000;
  margin-top: 10px;
  font-size: 1em;
  border-radius: 4px;
}
.button {
  background: #2ecc71;
  width: 125px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: white; 
  border-radius: 4px;
  border: #27ae60 1px solid;
  margin-top: 20px;
  margin-bottom: 20px;
  float: left;
  margin-left: 88px;
  font-weight: 800;
  font-size: 0.9em;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
}
.button:hover {
  background: #2cc06b;
}
#absoluteCenteredDiv {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 400px;
  height: 300px;
  text-align: center;
}
</style>
