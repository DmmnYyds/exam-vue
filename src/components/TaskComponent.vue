<template>
  <div>
    <div class="subject">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="form.taskName"></el-input>
        </el-form-item>
        <el-form-item label="任务时长" prop="duration">
          <el-input-number v-model="form.duration" controls-position="right" @change="handleChange" :min="0" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="任务说明" prop="desc">
          <el-input type="textarea" v-model="form.desc" placeholder="请输入任务描述"></el-input>
        </el-form-item>
        <el-form-item label="执行人">
          <el-select v-model="form.userId" multiple placeholder="请选择">
            <template v-for="item in users">
              <el-option v-if="item.screen == 0" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="是否紧急" prop="level">
          <el-switch v-model="form.level"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="preservation('form')">确认创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getUserListApi, getTaskDetailApi } from "@/assets/api/api";
export default {
  props: ["grtp"], //命名不对
  data() {
    return {
      form: {
        taskName: "",
        duration: "",
        desc: "",
        level: 1,
        userId: [], //form表单中的v-model 要和服务端的字段保证统一
        id: "",
        taskId: "",
      },
      users: [],

      rules: {
        name: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
        desc: [{ required: true, message: "请填写任务说明", trigger: "blur" }],
      },
    };
  },
  watch: {
    grtp: function () {
      console.log(999);
      //form下面有4   userId: [],   //form表单中的v-model 要和服务端的字段保证统一
      this.form = JSON.parse(JSON.stringify(this.grtp));
      console.log(666);
    },
  },
  created() {
    if (this.grtp) {
      this.form = this.grtp;
      this.GetUnchecked(this.form);
    } else {
      this.getUserList();
    }
  },
  methods: {
    preservation(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("greet", this.form);
          this.$emit("edit", this.form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // clear() {
    //   this.form = {
    //     taskName: "",
    //     duration: "",
    //     desc: "",
    //     level: 1,
    //     userId: [],
    //     id: "",
    //   };
    // },
    async getUserList() {
      let res = await getUserListApi({ pagination: false });
      if (res.data.status == 1) {
        this.users = res.data.data.data.rows;
        this.users.forEach((item) => {
          item.screen = 0;
          return item;
        });
      }
    },
    async GetUnchecked(data) {
      let [userList, taskDetail] = await Promise.all([
        getUserListApi({ pagination: false }),
        getTaskDetailApi({ taskId: data.taskId }),
      ]);
      let users = userList.data.data.data.rows;
      let choiceUser = taskDetail.data.data.receivedData;

      this.users = users.map((item) => {
        let user = JSON.parse(JSON.stringify(item));
        user.screen = choiceUser.find((data) => data.userId == item.id) ? 1 : 0;
        return user;
      });
    },
    handleChange(value) {
      console.log(value);
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