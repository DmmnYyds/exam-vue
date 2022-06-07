<template>
  <div>
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
          <el-button type="primary" @click="preservation(form)">确认创建</el-button>
          <el-button @click="resetForm(form)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getUserListApi } from "@/assets/api/api";
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
    handleChange(value) {
      console.log(value);
    },
    preservation(item) {
      console.log(item);
      this.$emit("greet", item);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.subject {
  padding: 20px;
  width: 50%;
  min-width: 700px;
  .dialog {
    & ::v-deep .el-dialog {
      width: 500px !important;
    }
  }
}
</style>