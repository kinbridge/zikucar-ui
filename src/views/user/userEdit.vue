<template>
  <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :v-if="dialogVisible"
      width="30%"
      :append-to-body="true"
      :before-close="handleClose">
  <div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="fa fa-user" :disabled="params.operation==='修改'" ></el-input>
          </el-form-item>
          <el-form-item prop="deptId">
            <el-select v-model="form.deptId" placeholder="请选择用户" style="width: 100%">
              <el-option v-for="item in deptOptions"
                         :key="item.deptName" :label="item.deptName" :value="item.pkId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="positionId">
            <el-select v-model="form.positionId" placeholder="请选择岗位" style="width: 100%">
              <el-option v-for="item in positionOptions"
                         :key="item.positionName" :label="item.positionName" :value="item.pkId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="fa fa-phone"></el-input>
          </el-form-item>
          <el-form-item prop="age">
            <el-input v-model.number="form.age" placeholder="请输入年龄" ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.pwd" type="password" placeholder="请输入旧密码" prefix-icon="fa fa-lock"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.pwdNew" type="password" placeholder="请输入新密码" prefix-icon="fa fa-lock"></el-input>
          </el-form-item>
          <el-form-item prop="pwd2">
            <el-input v-model="form.pwd2" type="password" placeholder="请确认新密码" prefix-icon="fa fa-lock"></el-input>
          </el-form-item>
          <el-form-item style="text-align: center;">
            <el-button @click="handleClose"  >取消</el-button>
            <el-button @click="submitForm('form')" type="primary">确定
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
    let validatePass2 = (rule, value, callback) => {
      if(!this.form.pwdNew){
        callback();
      }
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.pwdNew) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    let checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value <= 0 || value > 120) {
          callback(new Error('年龄必须在1到120之间'));
        } else {
          callback();
        }
      }
    };
    return {
      form: {
        pkId:'',
        deptId: '',
        positionId: '',
        uin: '',
        username: '',
        pwd: '',
        pwdNew:'',
        pwd2: '',
        age: '',
        email: '',
        phone: '',
        status: 'N',
      },
      deptOptions: [],
      positionOptions: [],
      loading: false,
      title:"用户"+this.params.operation,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, message: '最少输入2个字符', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '请选择用户', trigger: 'change' }
        ],
        positionId: [
          { required: true, message: '请选择岗位', trigger: 'change' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, message: '请输入11个字符', trigger: 'blur' },
          { max: 11, message: '请输入11个字符', trigger: 'blur' },
        ],
        email:[
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        pwd2: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if(this.params.pkId){
      this.initUser();
    }
    this.initPositionList();
    this.initDeptList();

  },
  methods: {
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
    initUser(){
      this.http.get(this.api.user.getById+"/"+this.params.pkId,res=>{
        this.form = res.data;
      },(error)=>{
        console.log("查询岗位信息错误-》"+error);
      })
    },
    initDeptList() {
      this.http.get(this.api.dept.list,res=>{
        this.deptOptions = res.data;
      },(error)=>{
        console.log("查询岗位信息错误-》"+error);
      })
    },
    initPositionList() {
      this.http.get(this.api.position.list,res=>{
        this.positionOptions = res.data;
      },(error)=>{
        console.log("查询岗位信息错误-》"+error);
      })
    },
    edit() {
      this.form.pkId = this.params.pkId;
      this.http.post(this.api.user.edit,this.form,res=>{
        if(res.code == 200){
          this.$message({message: this.params.operation+'成功！',type: 'success'});
          this.$emit("user-edit-close");
          return true;
        }
        this.$message({message: this.params.operation+'失败！', type: 'error'});
      },(error)=>{
        console.log("查询岗位信息错误-》"+error);
      })
    },
    handleClose() {
      this.$emit("user-edit-close");
    },
  }
}
</script>
<style>
</style>