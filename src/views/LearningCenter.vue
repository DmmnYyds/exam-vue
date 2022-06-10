<template>
  <div class="box">
    <div class="mian">
      <div class="title">
        <el-input v-model="input" placeholder="请输入内容">
          <i class="el-icon-edit el-input__icon" slot="prefix">
          </i>
        </el-input>
      </div>
      <div class="subject">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="id" label="任务ID" width="150" align="center">
          </el-table-column>
          <el-table-column prop="userName" label="发布人姓名" width="200" align="center">
          </el-table-column>
          <el-table-column prop="taskName" label="任务名称" width="200" align="center">
          </el-table-column>
          <el-table-column prop="level" label="紧急程度" width="250" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.level==1?'danger':'primary'" round>{{scope.row.level==1?'十万火急':'丝毫不慌'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="duration" label="任务时长" width="100" align="center">
          </el-table-column>
          <el-table-column prop="isReceived" label="任务领取状态" width="150" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.isReceived==1?'danger':'primary'" round>{{scope.row.isReceived==1?'已领取':'未领取'}}</el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="desc" label="简介" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column align="right" width="400">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDelete(scope.row)" type="danger" v-if="scope.row.isReceived!=1">领取任务</el-button>
              <el-button size="mini" @click="taskUpdate(scope.row)" type="primary" plain>编辑任务</el-button>
              <el-button size="mini" @click="handleEdit(scope.row)" type="primary" plain>发布任务</el-button>
              <el-button size="mini" @click="TaskDetails(scope.row)" type="primary" plain>任务详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
    <el-dialog class="dialog" title="发布任务" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <el-select v-model="value" multiple placeholder="请选择">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hiddenDialog">取 消</el-button>
        <el-button type="primary" @click="createQuestion">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑任务" :before-close="handleClose" :visible.sync="editTask">
      <el-task @edit="getTaskUpdate" ref="task" :grtp="from"></el-task>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTaskListApi,
  getTaskReleaseApi,
  getTaskDetailApi,
  getUserListApi,
  getTaskUpdateApi,
} from "@/assets/api/api";
export default {
  data() {
    return {
      from: {},
      tableData: [],
      search: "",
      totalCount: 0,
      pageSize: 10,
      pageNum: 1,
      input: "",
      userId: [],
      dialogVisible: false,
      editTask: false,
      options: [],
      options1: [],
      allUser: [],
      value: [],
      taskId: "",
    };
  },
  created() {
    this.getUserList();
    this.getTaskList();
  },
  methods: {
    taskUpdate(data) {
      let row = JSON.parse(JSON.stringify(data));
      const { taskName, desc, userId, duration, level } = row;
      this.from = {
        taskId: row.id,
        taskName,
        desc,
        userId,
        duration,
        level: level == 1 ? true : false,
      };
      this.editTask = true;
      console.log(888);
    },
    async getTaskUpdate(item) {
      let res = await getTaskUpdateApi({
        id: item.taskId,
        name: item.taskName,
        desc: item.desc,
        duration: item.duration,
        level: item.level,
      });
      if (res.data.status == 1) {
        this.getTaskList();
        this.editTask = false;
      }
    },
    async getUserList() {
      let res = await getUserListApi({ pagination: false });
      this.allUser = res.data.data.data.rows;
    },
    async getTaskList() {
      const { pageSize, pageNum } = this;
      let res = await getTaskListApi({
        pageSize,
        pageNum,
      });
      if (res.data.status == 1) {
        this.tableData = res.data.data.rows;
        this.totalCount = res.data.data.count;
      }
    },
    async handleEdit(row) {
      console.log(row);
      this.dialogVisible = true;
      this.taskId = row.id;
      const { taskId } = this;
      let res = await getTaskDetailApi({
        taskId,
      });
      if (res.data.status == 1) {
        this.options1 = res.data.data.receivedData;
        this.ergodicId();
      }
    },
    ergodicId() {
      var arr = [];
      this.allUser.forEach((item) => {
        if (!this.options1.find((e) => e.userId == item.id)) {
          arr.push(item);
        }
      });
      this.options = arr;
    },
    hiddenDialog() {
      this.dialogVisible = false;
    },
    async createQuestion() {
      console.log(this.value);
      console.log(this.taskId);
      let res = await getTaskReleaseApi({
        userIds: this.value,
        taskId: this.taskId,
      });
      if (res.data.status == 1) {
        this.dialogVisible = false;
        this.getTaskList();
      }
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
    async handleDelete(row) {
      this.userId.push(localStorage.getItem("wbl"));
      var taskId = row.id;
      let res = await getTaskReleaseApi({
        userIds: this.userId,
        taskId,
      });
      if (res.data.status == 1) {
        this.getTaskList();
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTaskList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTaskList();
    },
    TaskDetails(taskId) {
      this.$router.push({
        name: "details",
        params: {
          taskId: taskId.id,
        },
      });
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
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
    overflow: scroll;
    & .title {
      border-bottom: 1px solid #d2cdcd;
      padding-bottom: 20px;
      & ::v-deep .el-input__inner {
        width: 300px;
      }
    }
    & .subject {
      overflow-y: scroll;
    }
  }
}
</style>