<template>
  <div class="box">
    <div class="box-left">
      <div class="calendar">
        <el-calendar v-model="value" class="el-calendar">
        </el-calendar>
      </div>
      <div class="task">
        <div class="task-title flex-between">
          <div class="today-task">
            <h1>Today Task</h1>
          </div>
          <div class="task-title-i" @click="taskTitle">
            <i class="el-icon-plus"></i>
          </div>
        </div>
        <div class="task-body">
          <div class="item flex-between mt-20">
            <el-checkbox v-model="checked" class="align-center">Working on Asla Project</el-checkbox>
            <div></div>
            <span>08:00-10:00 AM</span>
          </div>
          <div class="item flex-between mt-20">
            <el-checkbox v-model="checked" class="align-center">Working on Asla Project</el-checkbox>
            <i></i>
            <span>08:00-10:00 AM</span>
          </div>
          <div class="item flex-between mt-20">
            <el-checkbox v-model="checked" class="align-center">Working on Asla Project</el-checkbox>
            <i></i>
            <span>08:00-10:00 AM</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chat">

      <div class="chat-title flex-between">
        <h2>Notification</h2>
        <div>View all</div>
      </div>
      <div class="chat-body">
        <div class="chat-body-img flex-center ">
          <i class="el-icon-edit-outline "></i>
        </div>
        <div class="chat-body-right">
          <div>
            <h2>Emily just sent you task to assign</h2>
          </div>
          <div>
            <span>18 Aug 2020 - 10.00 Am</span>
          </div>
          <div>
            <el-button type="warning" class="el-button">Assign Now</el-button>
          </div>
        </div>
      </div>
      <div class="chat-frame">
        <div class="chat-frame-title flex-between">
          <div>
            Team Chat
          </div>
          <div>
            <el-button type="primary">Invite People</el-button>
          </div>
        </div>
        <div>
          <div class="chat-chat">
            <div class="main">
              <div class="left"></div>
              <div class="middle">
                <div class="middle-header">
                  <div class="m-header-left">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <span>&nbsp;&nbsp;</span>
                    <span>{{obj.name}}</span>
                  </div>
                  <div class="m-header-right">
                    <div class="item">在线人数：{{count}}</div>
                    <div class="item"><i class="el-icon-user-solid"></i></div>
                    <div class="item"><i class="el-icon-phone"></i></div>
                    <div class="item"><i class="el-icon-s-platform"></i></div>
                    <div class="item"><i class="el-icon-message-solid"></i></div>
                  </div>
                </div>
                <div class="middle-content">
                  <!-- <div class="welcome">aaa</div> -->
                  <template v-for="(item, index) in textArr">
                    <div :key="index" v-if="typeof(item)=='object'">
                      <div ref="itemChat" class="middle-content-left" v-if="item.avatarName != obj.avatarName">
                        <span>
                          <el-avatar class="el-avatar" v-if="item.avatarName"> {{item.avatarName.substr(0,1)}}</el-avatar>
                        </span>
                        <div class="middle-content-item">
                          <span class="item-name"> {{ item.avatarName }} </span>
                          <span class="item"> {{ item.msg }} </span>
                          <span class="item-text">{{dateDiffer(item.date)}}</span>
                        </div>
                      </div>
                      <div ref="itemChat" class="middle-content-right" v-else>
                        <div class="middle-content-item">
                          <span class="item-name"> {{ item.avatarName }} </span>
                          <span class="item"> {{ item.msg }} </span>
                          <span class="item-text">{{dateDiffer(item.date)}}</span>
                        </div>
                        <span>
                          <el-avatar class="el-avatar" v-if="item.avatarName">{{item.avatarName.substr(0,1)}} </el-avatar>
                        </span>
                      </div>
                    </div>
                  </template>
                </div>
                <div class="send">
                  <el-input placeholder="请输入内容" v-model="obj.msg" @keyup.enter.native="search">
                    <template slot="append">
                      <span @click="sendSocketMsg">
                        <i class="el-icon-s-promotion">发送</i>
                      </span>
                    </template>
                  </el-input>
                </div>
              </div>
              <div class="right"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfoApi } from "@/assets/api/api";
// import dateDiffer from "@/mixins/newDate";
export default {
  // mixins: [dateDiffer],
  data() {
    return {
      value: new Date(),
      checked: false,
      textArr: [],
      obj: {
        avatarName: "",
        msg: "",
        userId: "",
        type: 1,
      },
      count: "",
      personNum: 0,
      timer: null,
    };
  },
  sockets: {
    connect: function () {
      //建立连接后调用的函数
      console.log("socket connected...");
    },
    userCount: function (message) {
      this.count = message;
    },

    receiveMsg: function (message) {
      console.log("服务的返回的信息", message);
      this.textArr.push(message);
      this.$nextTick(() => {
        var childNodes = this.$refs.itemChat;
        childNodes[childNodes.length - 1].scrollIntoView(true);
      });
    },
    disconnect: function () {
      // 断开时调用的函数
      console.log("disconnect!");
    },
  },

  async created() {
    this.timer = setInterval(() => {
      this.personNum++;
      console.log(this.personNum);
    }, 1000);
    this.addSocketUser();
    let res = await getUserInfoApi();
    if (res.data.status == 1) {
      this.obj.userId = res.data.data[0].id;
      this.obj.avatarName = res.data.data[0].avatarName;
    }
  },
  methods: {
    search(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        this.sendSocketMsg();
      }
    },
    taskTitle() {
      this.$router.push({ name: "commun" });
    },
    sendSocketMsg() {
      //向服务端发送消息
      if (this.setSendOut()) {
        this.$socket.emit("sendMsg", this.obj);
        //接收服务端相对应的webdata数据
        this.obj.msg = null;
      }
    },
    addSocketUser() {
      this.$socket.emit("addUser", {
        userId: this.obj.userId,
        avatarName: this.obj.avatarName,
      });
    },
    setSendOut() {
      if (!this.obj.msg || !this.obj.msg.trim()) {
        this.$message({
          type: "success",
          message: "发送内容不能为空",
        });
        return false;
      } else {
        return true;
      }
    },
    removeSockeUser() {
      this.$socket.emit("removeUser", {
        userId: this.obj.userId,
        avatarName: this.obj.avatarName,
      });
    },
    dateDiffer(value) {
      var date1 = new Date(value);
      var date2 = new Date();
      var date3 = date2.getTime() - date1.getTime();
      var subMintutes = Math.floor(date3 / (60 * 1000));
      var subHours = Math.floor(date3 / (60 * 60 * 1000));
      var days = Math.floor(date3 / (24 * 3600 * 1000));
      if (days >= 1) {
        return days + "天前";
      } else if (subHours >= 1) {
        return subHours + "小时前";
      } else if (subMintutes >= 1) {
        return subMintutes + "分钟前";
      } else {
        return "刚刚";
      }
      // var afterMin = total - day*24*60*60 - hour*60*60 - min*60;//取得算出分后剩余的秒
    },
  },
  destroyed() {
    this.removeSockeUser();
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: grid;
  box-sizing: border-box;
  height: calc(100vh - 60px);
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  overflow: hidden;
  & .box-left {
    display: grid;
    grid-template-rows: auto 1fr;
    overflow-y: scroll;
    & .calendar {
      box-sizing: border-box;
      min-width: 300px;
      padding: 20px;
      & ::v-deep .el-calendar-day {
        height: 78px;
      }
    }
  }
  & .task {
    padding: 40px;
    & .task-title {
      & .today-task {
        font-size: 20px;
      }
      & .task-title-i {
        font-size: 30px;
        color: #5c4a9c;
      }
    }
    & .task-body {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr;
      & .item {
        & ::v-deep .el-checkbox__label {
          font-size: 20px;
        }
        & ::v-deep .el-checkbox__inner {
          width: 30px;
          height: 30px;
          border: 3px solid #695ca4;
          border-radius: 8px;
        }
        & ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
          background-color: #695ca4;
        }
        & ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner::after {
          display: none;
        }
        & span {
          color: #7c79c8;
        }
      }
    }
  }
  & .chat {
    padding: 25px 40px;
    display: grid;
    grid-template-rows: 30px 190px auto;
    & .chat-title {
      & h2 {
        margin: 0;
        font-size: 30px;
      }
      & div {
        color: #f7d694;
      }
    }
    & .chat-body {
      padding: 20px;
      background-color: #58419c;
      border-radius: 25px;
      margin-top: 40px;
      background-image: url("@/assets/imgs/login.jpg");
      background-repeat: no-repeat;
      background-position: right bottom;
      background-size: 130px;
      & .chat-body-img {
        float: left;
        width: 60px;
        height: 60px;
        background-color: #7764b6;
        border-radius: 8px;
        & i {
          font-size: 40px;
          color: #fff;
        }
      }
      & .chat-body-right {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        color: #fff;
        & h2 {
          margin: 0;
        }
        & span {
          color: #d3c4ff;
        }
        & ::v-deep .el-button--warning {
          background-color: #fccc7a;
          border-radius: 10px;
        }
      }
    }
    & .chat-frame {
      margin: 30px 0;
      & .chat-frame-title {
        font-size: 30px;
      }
    }
    & .chat-chat {
      & .main {
        display: flex;
        justify-content: space-between;
        height: 80%;
        width: 100%;
        background: rgb(255, 255, 255);
        border: 1px solid rgb(210, 210, 208);
        margin-top: 10px;
        & .middle {
          height: 100%;
          width: 100%;
          & .middle-header {
            display: flex;
            justify-content: space-between;
            height: 60px;
            border-bottom: 2px solid rgb(226, 224, 221);
            align-items: center;
            padding: 0 20px;
            & .m-header-left {
              display: flex;
              align-items: center;
            }
            & .m-header-right {
              display: flex;
              & .item {
                padding-left: 15px;
              }
              & .el-icon-message-solid {
                color: rgb(129, 9, 241);
              }
            }
          }
          & img {
            width: 45px;
            height: 45px;
          }
          & .middle-content {
            padding: 10px;
            box-sizing: border-box;
            height: 45vh;
            // width: 833.52px;
            border-bottom: 2px solid rgb(226, 224, 221);
            overflow-y: scroll;
            & ::v-deep .el-avatar {
              margin-bottom: 30px;
            }
            & .welcome {
              text-align: center;
            }
            & .middle-content-left {
              margin-bottom: 20px;
              display: flex;
              align-items: center;
              word-break: break-all;
            }
            & .middle-content-right {
              margin-bottom: 20px;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              word-break: break-all;
            }
            & .middle-content-item {
              display: grid;
              grid-template-rows: 20px auto 20px;
              & .item {
                max-width: 300px;
                padding: 10px;
                background-color: #d3c4ff;
                min-width: 20px;
                border-radius: 10px;
              }
              & .item-text {
                font-size: 10px;
                color: #7e7e7e;
              }
              & .item-name {
                font-size: 15px;
              }
            }
          }
          & .send {
            height: 10%;
          }
        }
      }
    }
  }
}
::v-deep .el-input__inner {
  height: 55.5px;
}
@media screen and (max-width: 1400px) {
  .chat {
    height: calc(100vh - 200px);
  }
  .chat-body {
    display: none;
  }
  .box-left {
    height: calc(100vh - 115px);
  }
  .chat-title {
    display: none;
  }
}
</style>