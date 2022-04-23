<script>
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const auth = getAuth()
    const router = useRouter()

    const handleSubmit = async e => {
      const { email, password } = e.target.elements
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value)
        router.push('/schedule')
      } catch (e) {
        alert(e.message)
      }
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
        <h1>Register</h1>
        <input class="fillbox" name="email" placeholder="E-mail" type="email" />
        <input class="fillbox" name="password" placeholder="Password" type="password" />
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
