<script>
export default {
  data() {
    return {
    }
  },
  props: {
  },
  methods: {
    
  },
  mounted(){
  }
}
</script>

<template>
  <div class="navbar">
    <router-link to="/home" style="text-decoration: none; color: inherit;"><div class="navbox">หน้าหลัก</div></router-link>
    <router-link to="/subject" style="text-decoration: none; color: inherit;"><div class="navbox">ค้นหาวิชา</div></router-link>
    <router-link to="/schedule" style="text-decoration: none; color: inherit;"><div class="navbox">ตารางเรียน/สอบ</div></router-link>
    <router-link to="/history" style="text-decoration: none; color: inherit;"><div class="navbox">ประวัติการเรียน</div></router-link>
    <div class="navbox" style="margin-left: auto;">{{ user?.email }}</div>
    <div class="navbox" @click="signOutUser">ออกจากระบบ</div>
  </div>
</template>

<style>

</style>