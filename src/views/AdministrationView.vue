<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <zu-jian>
      <template slot="aaa">
        <span @greet="fatherClick"></span>
      </template>
    </zu-jian>
    <el-dialog title="编辑任务" :visible.sync="dialogVisible">
      <el-task></el-task>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    resetForm(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    fatherClick(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>