<template>
  <div>
    <!--搜索表单部分-->
    <el-card style="margin: 5px">
      <el-form :ref="searchForm" :model="searchForm" label-width="50px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="账号:">
              <el-input v-model="searchForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="昵称:">
              <el-input v-model="searchForm.nickname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="权限:">
              <el-input v-model="searchForm.role"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="getList">搜索</el-button>
              <el-button type="info">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!--数据展示部分-->
    <el-card style="margin: 5px">
      <el-table :data="list"></el-table>
    </el-card>

  </div>
</template>

<script>
import {listAllUser} from "@/db/system/userDB";

export default {
  name: 'userInfo',
  data() {
    return {
      list: [],
      //搜索表单
      searchForm: {
        username: undefined,
        nickname: undefined,
        role: undefined,
      },
      //权限字典
      roleDict: [
        {id: 0, name: "超级管理员"},
        {id: 1, name: "管理员"},
        {id: 2, name: "用户"},
      ]
    };

  },
  created() {
    console.log("userInfo loading");
  },
  methods: {
    getList() {
      let query = this.searchForm;
      listAllUser(query).then(res => {
        this.list = res;
        console.log(this.list);
      });
    },
  }
}
</script>


<style scoped>

</style>