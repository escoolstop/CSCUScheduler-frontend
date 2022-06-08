<script>
export default {
  data() {
    return {
      message: 'This is SubjectCompo',
    }
  },
  props: {
    ann_id:String,
    ann_des:String,
  },
  methods: {
    
  },
  mounted(){

  }
}
</script>

<template>
 <div class="outerBox">
   <div class="full">{{ ann_des }}</div>
  </div>
</template>

<style scoped>
.greeting {
  color: red;
  font-weight: bold;
}
.outerBox{
  /* outline: solid 2px #2c3e50; */
  width: 40vw;/* 500px; */
  min-width: 400px;
  padding: 20px 20px;
  margin: 30px auto;
  /* margin: 40px auto; */
  text-align: left;
  border-radius: 0.208vw;
  display:flex;
  flex-wrap: wrap;
  row-gap: 20px;
  background-color: #f1f5f8;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
}
.full{
  width: 100%;
}
</style>