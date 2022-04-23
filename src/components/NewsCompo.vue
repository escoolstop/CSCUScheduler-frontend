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
  border: solid 1px black;
  width: 40vw;/* 500px; */
  min-width: 700px;
  padding: 20px 20px;
  margin: 30px auto;
  text-align: left;
  border-radius: 0.208vw;
  display:flex;
  flex-wrap: wrap;
  row-gap: 20px;
}
.full{
  width: 100%;
}
</style>