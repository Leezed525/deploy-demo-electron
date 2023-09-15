<template>
  <div>
    <el-card>
      <el-form :ref="predictForm" :model="predictForm">
        <el-form-item>
          <el-row>
            <el-col :span="16" :offset="4">
              <el-input placeholder="请选择文件夹" v-model="predictForm.fileUrl" disabled>
                <template slot="append">
                  <el-button icon="el-icon-folder-opened" @click="openFile">点此选择文件夹</el-button>
                </template>
              </el-input>
              <input type="file" name="fileMulti" id="openMulti" style="display: none" @change="changeFile"
                     webkitdirectory/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-button type="primary" @click="submitSingleMulti" :disabled="predictForm.fileUrl == null">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {predictMultipleImage} from '@/api/demo/predict';

export default {
  name: 'predictMulti',
  data() {
    return {
      predictForm: {
        fileUrl: null,
      }
    }
  },
  methods: {
    //打开文件选择框
    openFile() {
      document.getElementById("openMulti").click();
    },
    //选择文件后，将文件信息存入predictForm
    changeFile() {
      const fu = document.getElementById("openMulti");
      //判断文件夹是否为空
      if (fu.files.length === 0) {
        this.$modal.msgError("文件夹为空");
        return;
      }
      //获取文件夹路径
      let path = fu.files[0].path;
      this.predictForm.fileUrl = path.substring(0, path.lastIndexOf("\\"));
      console.log(this.predictForm.fileUrl);
    },
    //提交单张图片
    submitSingleMulti() {
      let sendData = {
        path: this.predictForm.fileUrl
      }
      predictMultipleImage(sendData).then(res => {
        console.log(res);
        // this.$modal.msgSuccess("预测成功,预测结果为：" + maxIndex);
      }).catch(err => {
        this.$modal.msgError("预测失败" + err);
      })
    },
  }
};
</script>


<style scoped>

</style>