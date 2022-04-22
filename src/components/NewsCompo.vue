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
 <div class="outerBox">{{ ann_id }} {{ ann_des }}</div>
</template>

<style scoped>
.greeting {
  color: red;
  font-weight: bold;
}
.outerBox{
  border: solid 1px black;
  width: 500px;
  padding: 10px 20px;
  margin: 10px auto;
  text-align: left;
  border-radius: 0.208vw;
}
</style>