<template>
  <div class="box">
    <el-tabs type="border-card">
      <el-tab-pane label="个人习题库">
        <div class="title">
          <div class="QuestionType align-center">
            所属题型：
            <div class="radioButton">全部</div>
            <div class="radioButton">单选题</div>
            <div class="radioButton">多选题</div>
            <div class="radioButton">填空题</div>
            <div class="radioButton">简答题</div>
          </div>
          <div class="QuestionType align-center mt-20">
            难度简易：
            <div class="radioButton">全部</div>
            <div class="radioButton">简单</div>
            <div class="radioButton">中等</div>
            <div class="radioButton">困难</div>
          </div>
          <div class="title-button">
            <el-button type="primary" style="background:#0168e1" @click="showDialog">添加习题</el-button>
            <el-button type="primary" style="background:#0168e1">批量导入</el-button>
            <el-button type="primary" style="background:#0168e1">加入公共习题库</el-button>
          </div>
          <div class="input">
            <el-input v-model="inputValue" placeholder="请输入内容">
              <i class="el-icon-search el-input__icon" slot="suffix" @click="getQuestionList">
              </i>
            </el-input>

          </div>
        </div>
        <el-empty description="抱歉！题库中目前没有题" v-if="empty" class="empty"></el-empty>
        <div class="list" v-if="topic">
          <div class="item" v-for="item in questionList" :key="item.id">
            <div class="header flex-between">
              <div class="math flex-center">
                <span>创建时间:</span>
                <span>{{formatDate(item.createdAt)}}</span>
              </div>
              <div class="types ml-50">
                <span class="type">{{ getTypeName(item.type)}}</span>
                <span class="type type-level">{{ getLevelName(item.level)}}</span>
              </div>
              <div class="operation">
                <span class="el-icon-edit-outline" @click="showDialog(item)"></span>
                <span class="el-icon-delete" @click="open(item)"></span>
              </div>
            </div>
            <div class="container">
              <div class="title flex">
                <el-checkbox></el-checkbox>
                <div class="ml-5">
                  {{item.title}}
                </div>
              </div>
              <div class="options">
                <el-radio class="el-radio" disabled v-model="item.answer" label="A">{{item.questionA}}</el-radio>
                <el-radio class="el-radio" disabled v-model="item.answer" label="B">{{item.questionB}}</el-radio>
                <el-radio class="el-radio" v-if="item.questionC" disabled v-model="item.answer" label="C">{{item.questionC}}</el-radio>
                <el-radio class="el-radio" v-if="item.questionD" disabled v-model="item.answer" label="D">{{item.questionD}}</el-radio>
              </div>
              <div class="answer">
                <span>答案：</span>
                <span>{{item.answer}}</span>
              </div>
            </div>
          </div>
          <div class="pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[2, 5, 10, 15]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="公共习题库">配置管理</el-tab-pane>
      <el-tab-pane label="待审习题库">角色管理</el-tab-pane>
    </el-tabs>
    <el-dialog class="dialog" title="新增题目" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="form">
        <div class="item">
          <label>题目标题:</label>
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </div>
        <div class="item" v-for="(option,index) in questionOptions" :key="option.id">
          <label>{{option.label}}</label>
          <el-input v-model="option.value" :placeholder="option.placeholder"></el-input>
          <div>
            <span @click="addQuestionOption" v-if="index == questionOptions.length - 1 && index < 3" class="btn el-icon-circle-plus-outline"></span>
            <span @click="removeQuestionOption(option.label)" v-if="index > 1 && index == questionOptions.length - 1" class="btn el-icon-remove-outline"></span>
          </div>
        </div>
        <div class="item">
          <label>答案:</label>
          <el-select v-model="answer" placeholder="请选择">
            <el-option v-for="item in questionOptions" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </div>
        <div class="item">
          <label>难易程度:</label>
          <el-select v-model="form.level" placeholder="请选择">
            <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hiddenDialog">取 消</el-button>
        <el-button type="primary" @click="createQuestion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template> 

<script>
import {
  getQuestionListApi,
  getQuestionDeleteApi,
  getQuestionCreateApi,
  getQuestionUpdateApi,
} from "@/assets/api/api";
import formatDate from "@/mixins/formatDate";
export default {
  mixins: [formatDate],
  data() {
    return {
      topic: true,
      empty: false,
      selected: {},
      title: "",
      questionList: [],
      dialogVisible: false,
      form: {},
      questionOptions: [],
      levelOptions: [
        {
          value: 1,
          label: "简单",
        },
        {
          value: 2,
          label: "中等",
        },
        {
          value: 3,
          label: "困难",
        },
      ],
      answer: "",
      pageNum: 1,
      pageSize: 5,
      totalCount: 0,
      questuonOptionsTemp: [
        {
          id: 1,
          key: "A",
          label: "选项A",
          value: "",
          placeholder: "请输入A选项",
        },
        {
          id: 2,
          key: "B",
          label: "选项B",
          value: "",
          placeholder: "请输入B选项",
        },
        {
          id: 3,
          key: "C",
          label: "选项C",
          value: "",
          placeholder: "请输入C选项(非必填项)",
        },
        {
          id: 4,
          key: "D",
          label: "选项D",
          value: "",
          placeholder: "请输入D选项(非必填项)",
        },
      ],
      isCreateEvent: true,
      inputValue: "",
    };
  },
  // 监听
  watch: {
    questionOptions(newValue) {
      let res = newValue.find((item) => item.key == this.answer);
      this.answer = !res ? "" : res.key;
    },
  },
  // 实例生成前调用
  created() {
    this.initFormPrams();
    this.getQuestionList();
  },
  methods: {
    // 点击减号删除最后一个
    removeQuestionOption() {
      this.questionOptions.pop();
    },
    // 点击加号增加并清空
    addQuestionOption() {
      let option = JSON.parse(JSON.stringify(this.questuonOptionsTemp));
      this.questionOptions.push(option[this.questionOptions.length]);
    },
    // 分页：每页多少条
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getQuestionList();
    },
    // 分页：当前第几页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getQuestionList();
    },
    // 服务端要的那个创建/修改题目的入参;
    formatFormPrams() {
      let res = {};
      res.type = this.form.type;
      res.title = this.form.title;
      this.questionOptions.forEach((item) => {
        res["question" + item.key] = item.value;
      });
      res.answer = this.answer;
      res.level = this.form.level;
      if (!this.isCreateEvent) res.id = this.selectedData.id;
      return res;
    },
    // 创建/编辑参数格式化
    initFormPrams() {
      this.form = {
        type: 1,
        title: "",
        answer: "",
        level: "",
      };
      this.questionOptions = JSON.parse(
        JSON.stringify(this.questuonOptionsTemp)
      ).slice(0, 2);
      this.answer = "";
    },
    // 创建/编辑调用接口
    async createQuestion() {
      const params = this.formatFormPrams();
      var validate = this.validateFormParams(params);
      if (!validate) return;
      let successMsg = "";
      let res;
      if (this.isCreateEvent) {
        successMsg = "创建成功";
        res = await getQuestionCreateApi(params);
      } else {
        successMsg = "编辑成功";
        res = await getQuestionUpdateApi(params);
      }
      if (res.data.status == 1) {
        this.getQuestionList();
        this.$message({
          type: "success",
          message: successMsg,
        });
        this.hiddenDialog();
      }
    },
    // 校验
    validateFormParams(params) {
      let res = true;
      let rule = {
        title: "题目标题",
        questionA: "选项A",
        questionB: "选项B",
        questionC: "选项C",
        questionD: "选项D",
        answer: "答案",
        level: "难易程度",
      };
      for (let key in params) {
        if (!params[key]) {
          this.$message({
            type: "warning",
            message: rule[key] + "不能为空",
          });
          res = false;
          break;
        }
      }
      return res;
    },
    // 隐藏弹窗
    hiddenDialog() {
      this.dialogVisible = false;
    },
    // 显示弹窗，如果是编辑则渲染数据
    showDialog(data) {
      console.log(data);
      this.dialogVisible = true;
      this.initFormPrams();
      let isCreateEvent = data instanceof PointerEvent;
      if (isCreateEvent) {
        console.log("创建");
        this.isCreateEvent = true;
      } else {
        console.log("编辑");
        this.selectedData = data;
        this.isCreateEvent = false;
        this.form.title = data.title;
        let questionOptions = JSON.parse(
          JSON.stringify(this.questuonOptionsTemp)
        );
        questionOptions[0].value = data.questionA;
        questionOptions[1].value = data.questionB;
        questionOptions[2].value = data.questionC;
        questionOptions[3].value = data.questionD;
        this.questionOptions = questionOptions.filter((item) => item.value);
        this.answer = data.answer;
        this.form.level = data.level;
      }
    },
    // 点击关闭后提示，防止用户误触
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 查询接口
    async getQuestionList() {
      let title = this.inputValue.trim();
      if (title) {
        this.pageNum = 1;
      }
      const { pageSize, pageNum } = this;
      let res = await getQuestionListApi({
        type: 1,
        pageSize,
        pageNum,
        title,
      });
      if (res.data.data.rows.length == 0) {
        this.topic = false;
        this.empty = true;
      }
      this.questionList = res.data.data.rows;
      this.totalCount = res.data.data.count;
    },
    // 删除接口
    async deleteQuestion({ id, type }) {
      let res = await getQuestionDeleteApi({ id, type });
      if (res.data.status == 1) {
        this.getQuestionList();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } else {
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },
    // 删除
    open(data) {
      this.$confirm("此操作将永久删除该题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.deleteQuestion(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 过滤题型
    getTypeName(type) {
      switch (type) {
        case 1:
          return "单";
        case 2:
          return "多";
        case 3:
          return "填";
        case 4:
          return "问";
      }
    },
    // 过滤难易度
    getLevelName(level) {
      switch (level) {
        case 1:
          return "简单";
        case 2:
          return "中等";
        case 3:
          return "困难";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 100px);
}
.title {
  & .QuestionType {
    font-size: 16px;
    color: #4a4a4a;
    & .radioButton {
      padding: 0px 20px;
      font-size: 14px;
      margin-right: 20px;
      border-radius: 50px;
      color: #c2c2c2;
      border: 1px solid #c2c2c2;
      cursor: pointer;
    }
  }
  & .title-button {
    margin-top: 20px;
  }
  & .input {
    float: right;
    position: relative;
    bottom: 41px;
  }
}
.empty {
  width: 100%;
}
.list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  width: 100%;
  & .item {
    border: 1px solid #e2e5ea;
    border-radius: 4px;
    padding: 14px 20px;
    & .header {
      & .created-time {
        color: #bababa;
      }
      & .math {
        gap: 10 10px;
        padding: 12px 20px;
      }
      & .types {
        color: #fff;
        display: flex;
        flex: 10;
        gap: 0 10px;
        padding: 4px 0;
        & .type {
          padding: 4px;
          border-radius: 4px;
          background-image: linear-gradient(#f24a38, #fa7d65);
        }
        & .type-level {
          padding: 4px 7px;
          background-image: linear-gradient(#72d98f, #72d9cb);
        }
      }
      & .operation {
        display: flex;
        gap: 0 14px;
      }
    }
    & .container {
      & .title {
        padding: 12px 0;
      }
      & .options {
        padding: 12px 22px;
        & ::v-deep .el-radio {
          padding: 0px 50px;
        }
      }
      & .answer {
        padding: 12px 22px;
      }
    }
  }
  & .pagination {
    padding: 15px 0;
  }
}

.dialog {
  & ::v-deep .el-dialog {
    width: 500px !important;
  }
  & .form {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    padding: 20px;
    & .item {
      display: grid;
      grid-template-columns: 70px 300px 50px;
      gap: 0 10px;
      align-items: center;
      & .btn {
        padding: 4px;
      }
    }
  }
}
</style>