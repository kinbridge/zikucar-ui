<template>
  <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :v-if="dialogVisible"
      width="30%"
      :append-to-body="true"
      :before-close="handleClose">
    <div>
      <el-form ref="attachForm" :model="attachForm" :rules="rules" label-width="80px">
        <el-form-item label="类型" prop="thinkTypeId">
          <el-select v-model="attachForm.thinkTypeId" placeholder="请选择类型" style="width: 100%">
            <el-option v-for="item in thinkTypeOptions"
                       :key="item.thinkType" :label="item.thinkType" :value="item.pkId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品" prop="thinkBaseInfoId">
          <el-select v-model="attachForm.thinkBaseInfoId" placeholder="请选择产品" style="width: 100%">
            <el-option v-for="item in thinkBaseInfoOptions"
                       :key="item.thinkName" :label="item.thinkName" :value="item.pkId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align: right;">
          <el-button @click="handleClose">取 消</el-button>
          <el-button @click="submitForm('attachForm')" type="primary">确定
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {dialogVisible: Boolean, params: Object},
  data() {
    return {
      attachForm: {
        pkId: '',
        thinkTypeId:"",
        thinkBaseInfoId:"",
        fileName:"",
        originName:"",
        fileType:"",
        size:"",
        url:""
      },
      title:"附件"+this.params.operation,
      thinkTypeOptions: [],
      thinkBaseInfoOptions: [],
      rules: {
        thinkTypeId: [
          {required: true, message: '请选择类型', trigger: 'blur'}
        ],
        thinkBaseInfoId: [
          {required: true, message: '请选择产品', trigger: 'change'}
        ]
      }
    }
  },
  mounted() {
    this.initAttach();
    this.initThinkTypeList();
    this.initThinkBaseInfoList();
  },
  methods: {
    // 初始化类型列表
    initThinkTypeList() {
      this.http.get(this.api.thinkType.list, res => {
        this.thinkTypeOptions = res.data;
      }, (error) => {
        console.log("查询岗位信息错误-》" + error);
      })
    },
    // 初始化业务列表
    initThinkBaseInfoList() {
      this.http.get(this.api.thinkBaseInfo.list, res => {
        this.thinkBaseInfoOptions = res.data;
      }, (error) => {
        console.log("查询岗位信息错误-》" + error);
      })
    },
    handleClose() {
      this.$emit("attach-edit-close");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.edit();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    initAttach() {
      this.http.get(this.api.attach.getById + "/" + this.params.pkId, res => {
        this.attachForm = res.data;
      }, (error) => {
        console.log("查询岗位信息错误-》" + error);
      })
    },
    edit() {
      let url = this.api.attach.add;
      let msg = "添加";
      if (this.params.pkId) {
        url = this.api.attach.update;
        msg = "修改";
      }
      this.http.post(url, this.attachForm, res => {
        if (res.code == 200) {
          this.$message({message: msg + '成功！', type: 'success'});
          this.$emit("attach-edit-close");
          return;
        }
        this.$message({message: msg + '失败！', type: 'error'});
      }, (error) => {
        console.log("查询岗位信息错误-》" + error);
      })
    }
  }
}
</script>
<style>
</style>
