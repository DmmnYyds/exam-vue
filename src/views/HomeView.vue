<template>
  <div class="home">
    <el-header class="title align-center">
      <div class="align-center">
        <img src="../assets/imgs/list.png" alt="" class="list mr-10" />
        <span>现代学徒云平台</span>
      </div>

      <div class="run">
        <div class="text align-center pr-25">
          <span>武汉市</span>
          <span>2017-07-05</span>
          <span>15:00</span>
          <span>星期三</span>
          <span>21~22°C</span>
          <span>晴</span>
          <span>风力:112级</span>
          <span>风向：无持续风</span>
        </div>
        <div class="user align-center pr-25">
          <img src="../assets/imgs/HeadPortrait.png" alt="" class="img mr-10" />
          <span>hi,{{username}}</span>
        </div>
        <div class="button align-center" @click="out">
          <img src="../assets/imgs/switch.png" alt="" />
          退出
        </div>
      </div>
    </el-header>

    <el-container>
      <div class="Navigation">
        <el-aside>
          <el-col :span="16">
            <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#0c1c35" text-color="#fff" @select="handleSelect" active-text-color="#ffd04b" unique-opened>
              <el-submenu :index="item.id" v-for="item in menudata" :key="item.index">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{item.label}}</span>
                </template>
                <el-menu-item class="el-meun-item" :index="sub.index" v-for="sub in item.children" :key="sub.index" @click="navigator(sub.index)">
                  {{sub.label}}</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
      </div>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import menudata from "@/assets/josn/menudata.json";
import { logoutApi, getUserInfoApi } from "@/assets/api/api";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      defaultActive: "",
      username: "",
      menudata: [],
    };
  },
  // 实例生成前调用信息
  created() {
    this.menudata = menudata;
    this.defaultActive = menudata[0].children[0].index;
    getUserInfoApi().then((res) => {
      this.username = res.data.data.phone;
      localStorage.setItem("wbl", res.data.data.id);
    });
  },
  methods: {
    // 打开子窗口

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    // 关闭父窗口
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect() {},
    // 跳转子路由
    navigator(name) {
      if (this.$router.name == name) return;
      this.$router.push({
        name,
      });
    },
    // 退出登录接口
    async out() {
      let res = await logoutApi();
      if (res.data.status == 1) {
        sessionStorage.setItem("token", "");
        this.$router.push({ name: "login" });
      } else {
        this.$message({
          type: "warning",
          message: res.data.msg,
        });
      }
    },
  },
};
</script>


<style scoped lang="scss">
.main {
  padding: 0;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3a82ee;
  color: #fff;
  & .img {
    width: 40px;
  }
  & .img2 {
    width: 20px;
  }

  & .text {
    font-size: 10px;
    & span {
      margin-right: 5px;
    }
  }
  & .run {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & .user {
      font-size: 15px;
    }
    & .button {
      font-size: 15px;
      & img {
        width: 25px;
        height: 25px;
      }
    }
  }
}
.Navigation {
  width: 199px;
}
.list {
  width: 28px;
  height: 20px;
}
.el-menu {
  height: calc(100vh - 60px);
}
::v-deep .el-meun-item {
  min-width: 199px !important;
}
</style>