<template>
  <div class="box">
    <div class="mian">
      <div class="title">
        <h3>任务详情</h3>
      </div>
      <div class="subject-title">
        <el-button plain size="mini"><i class="el-icon-edit"></i>编辑描述</el-button>
        <el-button plain size="mini"><i class="el-icon-upload2"></i>上传附件</el-button>
        <el-button plain size="mini"><i class="el-icon-finished"></i>关联代码仓库</el-button>
        <el-button plain size="mini"><i class="el-icon-umbrella"></i>阻塞关系</el-button>
        <el-button plain size="mini"><i class="el-icon-collection"></i>引用资源</el-button>
      </div>
      <div class="subject">
        <div class="subject-mian">
          123
        </div>
        <div class="subject-subject">
          <div>
            <h3>活动日志</h3>
          </div>
          <div class="block">
            <div>
              <el-tag type="info">全部</el-tag>
              <el-radio-group v-model="reverse">
                <el-radio :label="true">只看日志</el-radio>
                <el-radio :label="false">只看评论</el-radio>
              </el-radio-group>
            </div>

            <el-timeline :reverse="reverse">
              <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
                {{activity.content}}
              </el-timeline-item>
            </el-timeline>
          </div>

        </div>
      </div>
    </div>
    <div class="sidebar">
      <div class="item">
        <h3>项目</h3>
        <span> <i class="el-icon-female"></i> test123</span>
      </div>
      <div class="item">
        <h3>状态</h3>
        <el-tag>未开始</el-tag>
      </div>
      <div class="item">
        <h3>处理人</h3>
        <div class="align-center">
          <el-avatar size="small">王</el-avatar>
          <span>盒子组</span>
        </div>
      </div>
      <div class="item">
        <h3>所属需求</h3>
        <span>未关联需求</span>
      </div>
      <div class="item">
        <h3>优先级</h3>
        <span>中</span>
      </div>
      <div class="item">
        <h3>截止日期</h3>
        <span>未指定</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reverse: true,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15",
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13",
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: calc(100vh - 60px);
  display: grid;
  grid-template-columns: 4fr 1fr;
  & .mian {
    & .title {
      padding-left: 20px;
    }
    & .subject-title {
      padding: 0 20px 20px 20px;
      border-bottom: 1px solid #c7c7c7;
    }
  }
  & .subject {
    padding-left: 20px;
    & .subject-mian {
      padding: 20px 0;
    }
    & .block {
      & .el-tag {
        margin-right: 20px;
      }
      & .el-timeline {
        padding-left: 20px;
        padding-top: 20px;
      }
    }
  }
  & .sidebar {
    padding: 20px;
    border-left: 1px solid #c7c7c7;
    & .item {
      // display: grid;
      padding: 10px;
      box-sizing: border-box;
      // gap: 10px 0px;
    }
  }
}
</style>