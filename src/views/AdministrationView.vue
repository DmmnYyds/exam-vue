<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="课件管理" name="first">课件管理</el-tab-pane>
      <el-tab-pane label="教学计划" name="second">
        <div>
          教学计划
        </div>
      </el-tab-pane>
      <el-tab-pane label="学生跟踪管理" name="third">学生跟踪管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
</style>