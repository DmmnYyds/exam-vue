<template>
  <div>
    <div class="popup">
      <div class="label">
        <label for="">题目标题：</label>
        <el-input v-model="form.title"></el-input>
      </div>
      <div class="label" v-for="(option,index) in form.options" :key="option.label">
        <label for="">{{option.label}}</label>
        <el-input v-model="option.value"></el-input>
        <div class="flex-center">
          <span v-if="index == form.options.length - 1" @click="deleteSelect" class="el-icon-circle-plus-outline"></span>
          <span v-if="index == form.options.length - 1" @click="createSelect" class="el-icon-remove-outline"></span>
        </div>
      </div>
      <div class="label">
        <label for="">困难等级：</label>
        <el-radio-group v-model="form.level">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">中等</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </div>
      <el-button size="small" @click="close">取消</el-button>
      <el-button size="small" @click="createQuestion">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sex: 1,
      questions: [],
      popStatus: false,
      form: {
        radio: 1,
        level: 0,
        options: [
          {
            label: "选项A",
            value: "",
          },
          {
            label: "选项B",
            value: "",
          },
        ],
      },
    };
  },
  methods: {
    createQuestion() {
      console.log(this.form);
    },
    deleteSelect() {
      this.form.options.pop();
    },
    createSelect() {
      let arr = ["a", "b", "c", "d"];
      this.form.options.push({
        label: `选项${arr[this.form.options.length]}`,
      });
    },
    close() {
      this.popStatus = false;
    },
    open() {
      this.popStatus = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  width: 600px;
  padding: 20px;
  & .label {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 100px auto 100px;
    align-items: center;
    label {
      width: 100px;
    }
  }
}
</style>