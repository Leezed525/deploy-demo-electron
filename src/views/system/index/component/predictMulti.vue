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

    <el-dialog ref="resultDialog" :visible.sync="resultOpen" width="600px">
      <el-table :data="result">
        <el-table-column label="序号">
          <template v-slot="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="filename" label="文件名"/>
        <el-table-column prop="label" label="预测结果"/>
        <el-table-column label="图片">
          <template v-slot="scope">
            <el-image fit="scale-down" :src="scope.row.imgUrl">
              <!--              <div slot="error" class="image-slot">-->
              <!--                <i class="el-icon-picture-outline">上传图片后预览</i>-->
              <!--              </div>-->
            </el-image>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
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
      },
      resultOpen: false,
      result: [],
      files: [],

    }
  },
  mounted() {
    this.resultOpen = true;
    this.$refs.resultDialog.rendered = true;
    this.resultOpen = false;
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
      this.files = fu.files;
      console.log(this.files);
      this.predictForm.fileUrl = path.substring(0, path.lastIndexOf("\\"));
      console.log(this.predictForm.fileUrl);
    },
    //提交单张图片
    submitSingleMulti() {
      let sendData = {
        path: this.predictForm.fileUrl
      }
      predictMultipleImage(sendData).then(res => {
        this.result = res.data.result;
        this.result.forEach(item => {
          let targetFile;
          for (let i = 0; i < this.files.length; i++) {
            if (this.files[i].name === item.filename)
              targetFile = this.files[i];
          }
          item.imgUrl = window.URL.createObjectURL(targetFile);
        })
        this.resultOpen = true;
      }).catch(err => {
        this.$modal.msgError("预测失败" + err);
      })
    },
  }
};
</script>


<style scoped>

</style>