<template>
  <div class="box">
    <div class="box-title">
      <div class="flex-between">
        <el-title>
          权限配置
        </el-title>
        <el-button type="text" size="mini" @click="() => append(0)">添加最高权限</el-button>
      </div>
    </div>
    <div class="wrap">
      <div class="block">
        <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ data.title }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => remove(node, data)" v-if="!data.children.length">删除</el-button>
              <el-button type="text" size="mini" @click="() => append(data)">添加</el-button>
              <el-button type="text" size="mini" @click="() => modify(data)">修改</el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
    <el-dialog class="dialog" :title="state=='found'?'创建':'修改'" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
          <el-form-item label="插入：" v-if="state=='change'">
            <el-select v-model="from.pid" filterable placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.title" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hiddenDialog">取 消</el-button>
        <el-button type="primary" @click="preservation('from')" v-if="state=='found'">创 建</el-button>
        <el-button type="primary" @click="getPermissionUpdate(from)" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPermissionListApi,
  getPermissionCreateApi,
  getPermissionDeleteApi,
  getPermissionUpdateApi,
} from "@/assets/api/api";
export default {
  data() {
    return {
      from: {
        title: "",
        type: 1,
        pid: "",
        id: null,
      },
      arr: [],
      data: [],
      options: [],
      dialogVisible: false,
      state: "",
      rules: {
        title: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getPermissionList();
  },
  methods: {
    modify(data) {
      this.state = "change";
      this.dialogVisible = true;
      this.from = data;
    },

    async getPermissionUpdate(data) {
      const { title, id, pid, type } = data;
      let res = await getPermissionUpdateApi({
        title,
        id,
        pid,
        type,
      });
      if (res.data.status == 1) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.getPermissionList();
        this.dialogVisible = false;
      }
    },
    preservation(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createQuestion();
        } else {
          return false;
        }
      });
    },
    async createQuestion() {
      let res = await getPermissionCreateApi(this.from);
      if (res.data.status == 1) {
        this.$message({
          message: "创建成功",
          type: "success",
        });
        this.getPermissionList();
        this.dialogVisible = false;
      } else {
        this.$message({
          message: "创建失败",
          type: "warning",
        });
      }
    },
    async getPermissionList() {
      let res = await getPermissionListApi();
      if (res.data.status == 1) {
        this.options = res.data.data.rows;
        let list = res.data.data.rows;
        // list.forEach((item) => {
        //   let parent = list.find((parentItem) => parentItem.id == item.pid);
        //   if (!item.pid) return;
        //   parent.children = parent.children || [];
        //   parent.children.push(item);
        // });
        list.forEach(
          (item) =>
            (item.children = list.filter((chilItem) => chilItem.pid == item.id))
        );
        this.data = list.filter((item) => !item.pid);
      }
    },

    append(data) {
      this.from.title = "";
      this.state = "found";
      this.dialogVisible = true;
      this.from.pid = data.id;
    },
    getSelectedIds(data) {
      let res = [data.id];
      data.children.forEach((item) => {
        if (item.children.length) {
          let ids = this.getSelectedIds(item);
          if (ids.length) res.push(...ids);
        }
        res.push(item.id);
      });
      return res;
    },
    async getPermissionDelete(id) {
      let res = await getPermissionDeleteApi({
        id,
      });
      if (res.data.status == 1) {
        this.getPermissionList();
      }
    },
    remove(node, data) {
      console.log(node);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let ids = this.getSelectedIds(data);
          this.getPermissionDelete(ids);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    hiddenDialog() {
      this.dialogVisible = false;
    },

    // 点击关闭后提示，防止用户误触
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
          // this.$refs.task.clear();
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 60px);
  padding: 20px;
  box-sizing: border-box;
  & .wrap {
    width: 30%;
    padding: 20px 0;
  }
  & .box-title {
    width: 30%;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>