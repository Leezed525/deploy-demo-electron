<template>
  <div>
    12312321
    <el-button @click="login"></el-button>
  </div>
</template>

<script>
export default {
  name: 'login-view',
  data() {
    return {}
  },
  created() {
    console.log("in login");
    console.log(this.$route)
  },

  methods: {
    login() {
      //登陆成功跳转到首页
      console.log(this.$router)
      this.$router.push("/")
    },
  },

}

</script>


<style scoped>

</style>