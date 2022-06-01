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
            <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#0c1c35" text-color="#fff" active-text-color="#ffd04b" unique-opened>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>教务中心</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item class="el-meun-item" index="1-1" @click="navigator('affairs')">题库管理</el-menu-item>
                  <el-menu-item class="el-meun-item" index="1-2">HTML题库</el-menu-item>
                  <el-menu-item class="el-meun-item" index="1-3">CSS题库</el-menu-item>
                  <el-menu-item class="el-meun-item" index="1-4">JS题库</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="2" @click="navigator('learning')">
                <i class="el-icon-menu"></i>
                <span slot="title">发布任务</span>
              </el-menu-item>
              <el-menu-item index="3" @click="navigator('commun')">
                <i class="el-icon-document"></i>
                <span slot="title">创建任务</span>
              </el-menu-item>
              <el-menu-item index="4" @click="navigator('management')">
                <i class="el-icon-setting"></i>
                <span slot="title">用户中心</span>
              </el-menu-item>
              <el-menu-item index="5" @click="navigator('information')">
                <i class="el-icon-setting"></i>
                <span slot="title">学习探讨</span>
              </el-menu-item>
              <el-menu-item index="6" @click="navigator('jurisdiction')">
                <i class="el-icon-setting"></i>
                <span slot="title">权限管理</span>
              </el-menu-item>
              <el-menu-item index="7">
                <i class="el-icon-setting"></i>
                <span slot="title">任务详情</span>
              </el-menu-item>
              <el-submenu index="8">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>账号设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item class="el-meun-item" index="6-1" @click="navigator('setup')">修改资料</el-menu-item>
                  <el-menu-item class="el-meun-item" index="6-2" @click="navigator('permissions')">角色与权限</el-menu-item>
                  <el-menu-item class="el-meun-item" index="6-3">修改密码</el-menu-item>
                  <el-menu-item class="el-meun-item" index="6-4">认证信息</el-menu-item>
                </el-menu-item-group>
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
import { logoutApi, getUserInfoApi } from "@/assets/api/api";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      username: "",
    };
  },
  // 实例生成前调用信息
  created() {
    getUserInfoApi().then((res) => {
      if (res.data.status == 401) {
        this.$router.push({ name: "login" });
      }
      this.username = res.data.data[0].phone;
      localStorage.setItem("wbl", res.data.data[0].id);
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