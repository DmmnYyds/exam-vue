<template>
  <div>

    <div>
      <el-form ref="from" :model="from" label-width="80px" :rules="rules">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="from.title"></el-input>
        </el-form-item>
        <el-form-item label="类型：" prop="type">
          <el-radio v-model="from.type" :label="1">左侧栏</el-radio>
          <el-radio v-model="from.type" :label="2">页面</el-radio>
          <el-radio v-model="from.type" :label="3">功能</el-radio>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hiddenDialog">取 消</el-button>
      <el-button type="primary" @click="preservation('from')">确 定</el-button>
    </span>

  </div>
</template>

<script>
export default {
  data() {
    return {
      from: {
        title: "",
        type: 1,
        pid: "",
      },

      rules: {
        title: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    preservation(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createQuestion();
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>