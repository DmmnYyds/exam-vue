<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="个人习题库">
        <div class="title">
          <div class="QuestionType align-center">
            适用考试：
            <div class="radioButton">全部</div>
            <div class="radioButton">期中考试</div>
            <div class="radioButton">期末考试</div>
            <div class="radioButton">替他考试</div>
          </div>
          <div class="QuestionType align-center mt-20">
            试卷形式：
            <div class="radioButton">全部</div>
            <div class="radioButton">考生同卷</div>
            <div class="radioButton">随机顺序</div>
            <div class="radioButton">考生异卷</div>
          </div>
          <div class="title-button">
            <el-button type="primary" style="background:#0168e1">则略组卷</el-button>
            <el-button type="primary" style="background:#0168e1">手动组卷</el-button>
            <el-button type="primary" style="background:#0168e1">导入试卷</el-button>
          </div>
          <div class="input">
            <el-autocomplete popper-class="my-autocomplete" placeholder="请输入内容">
              <i class="el-icon-edit el-input__icon" slot="suffix">
              </i>
              <!-- <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <span class="addr">{{ item.address }}</span>
              </template> -->
            </el-autocomplete>
          </div>
        </div>
        <div class="topic">
          <div class="align-center topic-title">
            <div class="mr-30">创建时间：2022-5-9 14：43</div>
            <div class="mr-30 align-center">
              <div class="bute">期中考试</div>
              <div class="space"></div>
              <div class="degree-of-difficulty">考生同卷</div>
            </div>
            <div class="mr-30">使用次数：18次</div>
            <div class="topic-img"><img src="../assets/imgs/垃圾箱.png" alt="" class="img"></div>
          </div>
          <div class="mt-20 noumenon" @click="query">
            1,Java程序设计期中考试
          </div>

        </div>

      </el-tab-pane>
      <el-tab-pane label="公共习题库">配置管理</el-tab-pane>
      <el-tab-pane label="待审习题库">角色管理</el-tab-pane>
    </el-tabs>
    <el-pagination layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    query() {
      if (this.$route.name == "affairs") return;
      this.$router.push({ name: "affairs" });
    },
  },
};
</script>

<style lang="scss" scoped>
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
.topic {
  margin-top: 30px;
  border: 1px solid #e2e5ea;
  padding: 20px;
  & .topic-title {
    color: #c2c2c2;
  }
  & .noumenon {
    cursor: pointer;
  }
  .bute {
    line-height: 17px;
    color: #fff;
    background-image: linear-gradient(#f3503d, #f5907c);
    border-radius: 3px;
    padding: 4px;
  }
  .degree-of-difficulty {
    line-height: 17px;
    color: #fff;
    background-image: linear-gradient(#72d98d, #a9f3eb);
    border-radius: 3px;
    padding: 4px 10px;
  }
  & .topic-img {
    float: right;
  }
  & .img {
    width: 19px;
  }
}
</style>