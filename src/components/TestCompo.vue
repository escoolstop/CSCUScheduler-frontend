<script>
export default {
  data() {
    return {
      message: 'This is TestCompo'
    }
  },
  props: {
    name: String,
    number: String
  }
}
</script>

<template>
  <p class="greeting">{{ message }} {{name}}: {{number}}</p>
</template>

<style scoped>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
