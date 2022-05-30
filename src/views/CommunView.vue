<template>
  <div class="box">
    <div class="mian">
      <div class="title">
        <h1>创建任务</h1>
      </div>
      <div class="subject">
        <el-form :rules="rules" ref="form" :model="form" label-width="80px">
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="任务时长" prop="duration">
            <el-input-number v-model="form.duration" controls-position="right" @change="handleChange" :min="0" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="任务说明" prop="desc">
            <el-input type="textarea" v-model="form.desc" placeholder="请输入任务描述"></el-input>
          </el-form-item>

          <el-form-item label="执行人">
            <el-select v-model="form.userId" multiple placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否紧急" prop="level">
            <el-switch v-model="form.level"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="preservation('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getTaskCreateApi,
  getTaskReleaseApi,
  getUserListApi,
} from "@/assets/api/api";
export default {
  data() {
    return {
      form: {
        name: "",
        duration: "",
        desc: "",
        level: 1,
        userId: [],
        id: "",
      },
      options: "",
      rules: {
        name: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
        desc: [{ required: true, message: "请填写任务说明", trigger: "blur" }],
      },
    };
  },
  async created() {
    let res = await getUserListApi({ pagination: false });
    if (res.data.status == 1) {
      this.options = res.data.data.data.rows;
    }
  },
  methods: {
    preservation(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSubmit();
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async onSubmit() {
      const { name, desc, duration, level } = this.form;
      let res = await getTaskCreateApi({
        name,
        desc,
        duration,
        level,
      });
      if (res.data.status == 1) {
        this.form.id = res.data.data[0].id;
        this.getTaskRelease();
        this.$confirm("将跳转任务发布界面, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$router.push({ name: "learning" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消跳转",
            });
          });
      }
    },
    async getTaskRelease() {
      let res = await getTaskReleaseApi({
        userId: this.form.userId,
        taskId: this.form.id,
      });
      if (res.data.status == 1) {
        console.log(res);
      }
    },

    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 60px);
  background-color: #dfdfdf;
  box-sizing: border-box;
  padding: 20px;
  & .mian {
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
}

.el-tag + .el-tag {
  margin-right: 10px;
}
.button-new-tag {
  margin-right: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-right: 10px;
  vertical-align: bottom;
}
</style>