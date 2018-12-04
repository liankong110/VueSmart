<template>
  <div>
    <el-form
      ref="myform"
      :model="myform"
      label-width="100px"
      :rules="rules"
    >
      <el-form-item
        label="用户名"
        prop="loginId"
      >
        <el-input
          placeholder="请输入用户名"
          v-model="myform.loginId"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="真实姓名"
        prop="Name"
      >
        <el-input
          placeholder="请输入真实姓名"
          v-model="myform.Name"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机"
        prop="Phone"
      >
        <el-input
          placeholder="请输入手机"
          v-model="myform.Phone"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Email"
        prop="Email"
      >
        <el-input
          placeholder="请输入Email"
          v-model="myform.Email"
        ></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input
          placeholder="请输入职位"
          v-model="myform.Position"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属公司">
        <el-input
          placeholder="请输入所属公司"
          v-model="myform.Company"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="所属角色"
        style="folat:left;"
        prop="Roles"
      >
        <el-select
          v-model="myform.Roles"
          multiple
          placeholder="请选择"
        >
          <el-option
            v-for="item in RoleList"
            :key="item.Id"
            :label="item.RoleName"
            :value="item.Id"
          >
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('myform')"
        >立即创建</el-button>
        <el-button @click="resetForm('myform')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import * as userApi from "../../api/user";
import * as utils from "../../js/util";

export default {
  data() {
    return {
      myform: {
        loginId: "",
        Name: "",
        Phone: "",
        Email: "",
        Position: "",
        Company: "",
        Roles: "",
        Id: 0
      },
      RoleList: [],
      rules: {
        loginId: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        Name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        Phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        Email: [{ required: true, message: "请输入Email", trigger: "blur" }],
        Roles: [{ required: true, message: "请选择角色信息", trigger: "blur" }]
      }
    };
  },
  methods: {
    getDefaultData: function() {
      userApi.addAndUpdateGet
        .r({ id: this.myform.Id })
        .then(res => {
          if (res.data && res.data.Code == 0) {
            var vm = this;
            this.RoleList = res.data.model.roleList;
            //复制对象
            var userModel = res.data.model.userModel;
            vm.myform.loginId = userModel.loginId;
            vm.myform.Name = userModel.Name;
            vm.myform.Email = userModel.Email;
            vm.myform.Position = userModel.Position;
            vm.myform.Company = userModel.Company;
            // vm.myform.Roles = userModel.Roles;
            vm.myform.Id = userModel.Id;

            console.log(this.myform);
          } else {
            this.$message(res.data.Message);
          }
        })
        .catch(utils.catchError);
    },
    submitForm: function(formName) {
      var vm=this;
      console.log(this.$refs[formName]);
      this.$refs[formName].validate(valid => {
        if (valid) {
          //提交          
          userApi
            .addAndUpdatePost.r(vm.myform)
            .then(res => {
              if (res.data && res.data.Code == 0) {
                if (this.myform.Id >= 0) {                 
                   vm.$message("修改成功");
                   vm.$router.push('/user/index');
                } else {
                  vm.$message("新增成功");
                }
              } else {
                vm.$message(res.data.Message);
              }
            })
            .catch(utils.catchError);
        } else {
         
          return false;
        }
      });
    },
    resetForm: function(formName) {
     
      this.$refs[formName].resetFields();
    }
  },
  created() {
     this.myform.Id= this.$route.query.Id;
    this.getDefaultData();
  }
};
</script>
