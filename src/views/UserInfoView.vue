<template>
  <div class="info">
    <div class="box">
      <div class="title">
        <h1>基本信息</h1>
      </div>
      <div class="subject">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="账号昵称" prop="avatarName">
            <el-input v-model="form.avatarName"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所在地" prop="region">
            <el-select v-model="form.provinceNo" placeholder="省">
              <el-option v-for="(item) in province" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <el-select v-model="form.cityNo" placeholder="市" class="inputRegion" v-show="this.city.length">
              <el-option v-for="(item) in city" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
            <el-select v-model="form.areaNo" placeholder="区" class="inputRegion" v-show="this.area.length">
              <el-option v-for="(item) in area" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="简介" prop="desc">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="preservation('form')">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import citydata from "@/assets/josn/citydata.json";
import { getUserInfoApi, getUserUpdateApi } from "@/assets/api/api";
export default {
  data() {
    return {
      form: {
        avatarName: "",
        name: "",
        desc: "",
        phone: "",
        email: "",
        sex: "",
        provinceNo: "", //显示省
        cityNo: "", //显示市
        areaNo: "", //显示区
      },
      province: [], //下面的省
      city: [], //下面的市
      area: [], //下面的区
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        avatarName: [
          { required: true, message: "请输入真实姓名", trigger: "change" },
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        desc: [{ required: true, message: "请填写简介", trigger: "blur" }],
      },
    };
  },
  watch: {
    "form.provinceNo": function (newValue) {
      let res = this.province.find((item) => item.code == newValue);
      this.city = res && res.children ? res.children : [];
      if (this.form.cityNo) {
        let city = this.city.find((item) => item.code == this.form.cityNo);
        this.form.cityNo = city && city.code ? city.code : "";
      }
    },
    "form.cityNo": function (newValue) {
      let res = this.city.find((item) => item.code == newValue);
      this.area = res && res.children ? res.children : [];
      if (this.form.areaNo) {
        let area = this.area.find((item) => item.code == this.form.areaNo);
        this.form.areaNo = area && area.code ? area.code : "";
      }
    },
  },
  // 实例生成前调用获取个人信息接口
  created() {
    this.province = citydata;
    this.getUserInfo();
  },
  methods: {
    preservation(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getUserUpdate();
        } else {
          return false;
        }
      });
    },
    async getUserUpdate() {
      let res = await getUserUpdateApi(this.form);
      if (res.data.status == 1) {
        this.$message({
          type: "success",
          message: "修改成功",
        });
      }
    },
    async getUserInfo() {
      this.province = citydata;
      let res = await getUserInfoApi();
      if (res.data.status == 1) {
        this.form = res.data.data;
        console.log(res.data.data[0]);
        delete this.form.id;
        delete this.form.townNo;
        delete this.form.updatedAt;
        delete this.form.createdAt;
      }
    },
    turnName(code) {
      return this.turn.find((item) => item.code == code).name;
    },
    getProvince() {
      this.city = citydata.find(
        (item) => item.code == this.provinceNo
      ).children;
      this.cityNo = "";
      this.areaNo = "";
    },
    getCity() {
      this.area = this.city.find((item) => item.code == this.cityNo).children;
      this.areaNo = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  height: calc(100vh - 60px);
  background-color: #dfdfdf;
  box-sizing: border-box;
  padding: 20px;
}
.box {
  background-color: #fff;
  border-radius: 25px;
  & .title {
    padding: 20px;
    border-bottom: 1px solid #d2cdcd;
    & h1 {
      margin: 0;
    }
  }
  & ::v-deep .inputRegion {
    margin-left: 20px;
  }
  .subject {
    padding: 20px;
    width: 50%;
    min-width: 788px;
  }
}
</style>