<template>
  <div>
    首页
  </div>
</template>
<script>
// import {listAllUser} from "@/db/system/user";

export default {
  name: 'index',
  data() {
    return {}
  },
  created() {
    console.log("index loading")
    if (this.$store.getters.isLogin === false) {
      this.$router.push({path: '/login'})
    }
  }
}

</script>


<style scoped>

</style>