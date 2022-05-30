<template>
  <div class="box">
    <div class="title">
      <div>新增角色权限</div>
      <div class="title-breadcrumb">
        <el-breadcrumb separator="·">
          <el-breadcrumb-item :to="{ path: '/' }"><i class="el-icon-discount"></i></el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">账号设置</a></el-breadcrumb-item>
          <el-breadcrumb-item>角色与权限</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="subject">
      <div class="subject-title">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="角色名称" prop="roleName" class="el-form-item">
            <el-input v-model="ruleForm.roleName" placeholder="请输入新增角色名称"></el-input>
          </el-form-item>
          <el-form-item label="所属部门" prop="region" class="el-form-item">
            <el-select v-model="ruleForm.groupId" placeholder="请选择所属部门">
              <el-option v-for="item in ruleForm.region" :key="item.id" :label="item.groupName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <el-button type="primary" @click="getRoleCreate()">确认新增</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getRoleCreateApi, getRoleGroupListApi } from "@/assets/api/api";
export default {
  data() {
    return {
      ruleForm: {
        roleName: "",
        region: [],
        groupId: "",
      },
      rules: {
        roleName: [
          { required: true, message: "请输入新增角色名称", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择所属部门", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.getRoleGroupList();
  },
  methods: {
    async getRoleCreate() {
      const { roleName, groupId } = this.ruleForm;
      let res = await getRoleCreateApi({ roleName, groupId });
      console.log(res);
    },
    async getRoleGroupList() {
      let res = await getRoleGroupListApi({ pagination: false });
      if (res.data.status == 1) {
        this.ruleForm.region = res.data.data.rows;
        console.log(this.ruleForm.region);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 20px;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  background-color: #f2f5fa;
  & .title {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    & .title-breadcrumb {
      margin-left: 30px;
    }
  }
  & .subject {
    padding: 20px;
    background-color: #fff;
    & .el-form {
      border-bottom: 1px solid #c7c7c7;
      display: flex;
    }
  }
}
</style>