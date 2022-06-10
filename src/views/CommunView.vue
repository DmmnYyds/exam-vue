<template>
  <div class="box">
    <div class="mian">
      <div class="title">
        <h1>创建任务</h1>
      </div>
      <el-task @greet="preservation"></el-task>
    </div>
  </div>
</template>

<script>
import { getTaskCreateApi, getTaskReleaseApi } from "@/assets/api/api";
export default {
  data() {
    return {};
  },

  methods: {
    async preservation(item) {
      this.userId = item.userId;
      const { desc, duration, level } = item;
      let res = await getTaskCreateApi({
        name: item.taskName,
        desc,
        duration,
        level,
      });
      if (res.data.status == 1) {
        this.id = res.data.data[0].id;
        this.getTaskRelease(item);
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
    async getTaskRelease(item) {
      this.id;
      let res = await getTaskReleaseApi({
        userIds: item.userId,
        taskId: this.id,
      });
      if (res.data.status == 1) {
        console.log(res);
      }
    },
  },
};
// import {
//   getTaskCreateApi,
//   getTaskReleaseApi,
//   getUserListApi,
// } from "@/assets/api/api";
// export default {
//   data() {
//     return {};
//   },

//   async created() {
//     let res = await getUserListApi({ pagination: false });
//     if (res.data.status == 1) {
//       this.options = res.data.data.data.rows;
//     }
//   },
//   methods: {
//
//     preservation(formName) {
//       this.$refs[formName].validate((valid) => {
//         if (valid) {
//           this.onSubmit();
//         } else {
//           return false;
//         }
//       });
//     },
//     resetForm(formName) {
//       this.$refs[formName].resetForm();
//     },

//
//   },

// };
//
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