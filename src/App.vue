<template>
  <router-view/>
</template>

<style>
::-webkit-scrollbar {
    width: 0.5em;
    background-color: #f1f1f1;
}
::-webkit-scrollbar-thumb {
    background-color: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
html,body {
    margin:0;
    padding:0;
    font-size: 16px; /*default 16px*/ 
    background-color: #f1f5f8;
    scrollbar-color: #888 #f1f1f1;
    scrollbar-width: thin;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
.signOutButton{
  /*background-color: #4CAF50;*/
  background-color: #333;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  box-sizing: border-box;
  margin: 0;
}
.userDisplay{
  background-color: #333;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  box-sizing: border-box;
  margin: 0;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.signOutButton:hover{
  background-color: #111;
}

.navbar {
  margin: 0;
  border: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;/*
  background-color: white;
  border-bottom: solid 1px black;*/
	position: sticky;
	top: 0;
  width: 100%;
  display: flex;
}
.navbox{
  text-decoration: none;
  display: block;
  color: white;
  /*color: black;*/
  text-align: center;
  padding: 0 25px;
  height: 50px;
  display: flex;
  align-items: center;
  
}
.navboxstatic{
  text-decoration: none;
  display: block;
  color: white;
  text-align: center;
  padding: 0 25px;
  height: 50px;
  display: flex;
  align-items: center;
}
.left{
  float: left;
}
.right{
  float: right;
}
.navbox:hover {
  background-color: #111;
}
</style>

<!--template>
  <div class="nav">
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link> | 
    <router-link to="/test">Test</router-link> |
    <router-link to="/history">Weight</router-link>
  </div>
  <router-view />
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style-->