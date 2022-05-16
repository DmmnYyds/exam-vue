<template>
  <div class="question">
    <div class="list">
      <div class="item" v-for="item in questionList" :key="item.id">
        <div class="header flex-between">
          <div class="flex-center">
            <span>创建时间:</span>
            <span>{{formatDate(item.createdAt)}}</span>
          </div>
          <div class="types ml-50">
            <span class="type">{{ getTypeName(item.type)}}</span>
            <span class="type type-level">{{ getLevelName(item.level)}}</span>
          </div>
          <div class="operation">
            <span class="el-icon-edit-outline"></span>
            <span class="el-icon-delete"></span>
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
            <el-radio disabled v-model="item.answer" label="A">{{item.questionA}}</el-radio>
            <el-radio disabled v-model="item.answer" label="B">{{item.questionB}}</el-radio>
            <el-radio v-if="item.questionC" disabled v-model="item.answer" label="C">{{item.questionC}}</el-radio>
            <el-radio v-if="item.questionD" disabled v-model="item.answer" label="D">{{item.questionD}}</el-radio>
          </div>
          <div class="answer">
            <span>答案：</span>
            <span>{{item.answer}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQuestionListApi } from "@/assets/api/api";
import formatDate from "@/mixins/formatDate";
export default {
  mixins: [formatDate],
  data() {
    return {
      questionList: [],
    };
  },
  async created() {
    let questionList = await getQuestionListApi({
      type: 1,
    });
    this.questionList = questionList.data.data.rows;
    console.log(this.questionList);
  },
  methods: {
    formatDate(val) {
      return formatDate(val);
    },
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
.list {
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  & .item {
    border: 1px solid #e2e5ea;
    border-radius: 4px;
    padding: 14px 20px;
    & .header {
      & .created-time {
        color: #bababa;
      }
      & .types {
        color: #fff;
        display: flex;
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
      }
      & .answer {
        padding: 12px 22px;
      }
    }
  }
}
</style>