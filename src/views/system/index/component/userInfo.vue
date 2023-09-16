<template>
  <div>
    <!--搜索表单部分-->
    <el-card style="margin: 5px">
      <el-form ref="searchForm" :model="searchForm" label-width="50px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="账号:" prop="username">
              <el-input v-model="searchForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="昵称:" prop="nickname">
              <el-input v-model="searchForm.nickname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="权限:" prop="role">
              <el-input v-model="searchForm.role"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="getList">搜索</el-button>
              <el-button type="info" @click="this.$refs.searchForm.resetField()">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!--新增按钮部分-->
    <el-card style="margin: 5px">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleInsert">新增</el-button>
        </el-col>
      </el-row>
    </el-card>


    <!--数据展示部分-->
    <el-card style="margin: 5px">
      <el-table :data="list">
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column label="权限">
          <template v-slot="scope">
            {{ roleDict.find(item => item.id === scope.row.role).name }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--    数据修改增加部分-->
    <el-dialog :title="title" :visible.sync="updateInsertOpen" width="50%" ref="updateInsertDialog">
      <el-form ref="updateInsertForm" :model="updateInsertForm" label-width="50px" :rules="updateInsertRules">
        <el-form-item prop="username" label="账号">
          <el-input v-model="updateInsertForm.username" placeholder="账号"
                    :disabled="title==='修改用户信息'"></el-input>
        </el-form-item>
        <el-form-item prop="nickname" label="昵称">
          <el-input v-model="updateInsertForm.nickname" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="权限">
          <el-select v-model="updateInsertForm.role">
            <el-option v-for="item in roleDict.filter(role => role.id >= currentRole)" :key="item.id" :label="item.name"
                       :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="8" :offset="16">
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button type="info" @click="updateInsertOpen=false">取消</el-button>

          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import {
  listAllUser,
  getUserById,
  getUserByUsername,
  insertUser,
  updateUser
} from "@/db/system/userDB";

import {isEmptyObject,
isNotEmptyObject} from "@/utils/ObjectUtils";

export default {
  name: 'userInfo',
  data() {
    return {
      //修改增加弹窗是否打开
      updateInsertOpen: false,
      title: "修改信息",
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
      ],
      //修改增加表单
      updateInsertForm: {
        id: undefined,
        username: undefined,
        nickname: undefined,
        role: undefined,
      },
      //修改增加表单规则
      updateInsertRules: {
        username: [
          {required: true, message: "账号不能为空", trigger: "blur"},
          {min: 3, max: 20, message: "账号长度在3-20之间", trigger: "blur"},
          {
            validator: (rule, value, callback) => {
              //因为更新的话不允许修改账号，而且如果不放行的话肯定会跟自己重复
              if (isNotEmptyObject(this.updateInsertForm.id)) {
                callback();
              }
              if (isEmptyObject(value)) {
                callback();
              } else {
                getUserByUsername(value).then(res => {
                  if (isEmptyObject(res)) {
                    callback();
                  } else {
                    callback(new Error("账号已存在"));
                  }
                }).catch(err => console.log(err));
              }
            }, trigger: "blur"
          }
        ],
        nickname: [
          {required: true, message: "昵称不能为空", trigger: "blur"},
          {min: 3, max: 20, message: "昵称长度在3-20之间", trigger: "blur"}
        ],
        role: [
          {required: true, message: "权限不能为空", trigger: "blur"},
        ],
      }
    };
  },
  computed: {
    currentRole() {
      return this.$store.getters.userInfo.role;
    },
  },
  mounted() {
    this.updateInsertOpen = true //:visible.sync="open"
    this.$refs.updateInsertDialog.rendered = true //dialogForm是dialog的ref;
    this.updateInsertOpen = false
  },
  created() {
    this.getList();
  },
  methods: {
    //获取数据
    getList() {
      let query = this.searchForm;
      listAllUser(query).then(res => {
        this.list = res;
      });
    },
    clearUpdateInsertForm() {
      this.updateInsertForm = {
        userId: undefined,
        username: undefined,
        nickname: undefined,
        role: undefined,
      };
      this.$refs.updateInsertForm.clearValidate();
    },
    //处理新增
    handleInsert() {
      this.clearUpdateInsertForm();
      this.updateInsertOpen = true;
      this.title = "新增用户";
    },
    //处理编辑
    handleUpdate(id) {
      this.clearUpdateInsertForm();
      getUserById(id).then(res => {
        this.updateInsertOpen = true;
        this.title = "修改用户信息";
        this.updateInsertForm = res;
      })
    },
    //处理删除
    handleDelete(id) {
      console.log(id);
    },
    //处理提交
    handleSubmit() {
      this.$refs.updateInsertForm.validate(valid => {
        if (!valid) {
          return;
        }
        if (this.updateInsertForm.id === undefined) {
          //新增
          insertUser(this.updateInsertForm).then(() => {
            this.updateInsertOpen = false;
            this.$modal.msgSuccess("添加用户成功");
            this.getList();
          }).catch(err => {
            this.$modal.msgError("添加用户失败 " + err);
          });
        } else {
          //修改
          updateUser(this.updateInsertForm).then(() => {
            this.updateInsertOpen = false;
            this.$modal.msgSuccess("修改用户成功");
            this.getList();
          }).catch(err => {
            this.$modal.msgError("修改用户失败 " + err);
          });
        }
      })
    }
  }
}
</script>


<style scoped>

</style>