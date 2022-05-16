<template>
  <div class="about align-center">
    <div class="subject align-center">
      <div class="enterprise">
        <div class="logo">m</div>
        <div class="text">
          <h1>mobideo</h1>
          <span>DIGITZING INDUSTRIAL SERVICES</span>
        </div>
      </div>
      <div class="sign">
        <div class="username">
          <p>USERNAME</p>
          <el-input class="input-user" placeholder="请输入账号" v-model="username" clearable>
          </el-input>
        </div>
        <div class="password">
          <p>PASSWORD</p>
          <el-input class="input-user" placeholder="请输入密码" v-model="password" show-password></el-input>
        </div>
        <div class="captcha">
          <el-input class="flex-between" placeholder="请输入验证码" v-model="captcha" maxlength="4"></el-input>
          <el-captcha ref="captcha"></el-captcha>
        </div>
        <div class="user flex-between">
          <a href="">忘记密码</a>
          <a href="">注册</a>
        </div>
        <button class="button" @click="submit">LOG IN</button>
      </div>
    </div>
  </div>
</template>
// 登录:
// 用户点击登录按钮
// 校验 input 框里的值是否符合要求
// 如果符合 就调用服务端接口
// 服务端如果校验成功
// 就会返回一个token

// 如果前端校验不成功,就提示用户一个对应的信息
// 比如:用户名输入不符合规范;  密码长多必须是6-15位;
<script>
import { loginApi } from "@/assets/api/api";
import { encrypt } from "@/assets/utils/index";
import democomponent from "@/components/DemoComponent.vue";
export default {
  data() {
    return {
      username: "xiaoming",
      password: "999999",
      captcha: "",
    };
  },
  components: {
    "el-captcha": democomponent,
  },
  methods: {
    // 点击登录进行判断
    getValdateRseult() {
      var res = { result: true };
      if (this.username == "") {
        // this.$message();
        res.result = false;
        res.message = { message: "账号不能为空", type: "warning" };
      } else if (this.password == "") {
        res.result = false;
        res.message = { message: "密码不能为空", type: "warning" };
      } else if (this.captcha == "") {
        res.result = false;
        res.message = { message: "验证码有误", type: "warning" };
      }
      if (!res.result) this.$message(res.message);
      return res.result;
    },
    // 校验及登录接口
    async submit() {
      // 校验 input 框里的值是否符合要求
      var isValidate = this.getValdateRseult();
      if (!isValidate) return;
      let res = await loginApi({
        username: this.username,
        password: encrypt(this.password), // rsa加密
        captcha: this.captcha,
      });
      if (res.data.status == 1) {
        // 登陆成功
        sessionStorage.setItem("token", res.data.data);
        this.$router.push({ name: "home" });
        this.$message({
          message: "登陆成功",
          type: "success",
        });
      } else {
        // 登录失败
        this.$message({
          message: res.data.msg,
          type: "warning",
        });
        this.$refs.captcha.getCaptcha();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.about {
  height: 100vh;
  background-color: #f5f8fd;
}
a {
  text-decoration: none;
}
.subject {
  width: 774px;
  height: 575px;
  border: 13px solid #1e80e1;
  margin: 0 auto;
}
.enterprise {
  width: 300px;
  height: 480px;
  background-color: #1e80e1;
  transform-origin: right bottom;
  transform: skew(-10deg);
  margin-left: 35px;
  & .logo {
    width: 77px;
    height: 77px;
    font-size: 49px;
    color: #fff;
    display: inline-block;
    transform: skew(10deg);
    transform: translatey(20deg);
    text-align: center;
    background: #1e80e1;
    box-shadow: 1px 1px 10px #726060;
    margin-left: 110px;
    margin-top: 110px;
  }
  & .text {
    margin-top: 35px;
    text-align: center;
    color: #fff;
    & h1 {
      font-size: 40px;
      padding-bottom: 0;
      margin: 0;
    }
    & span {
      font-size: 11px;
    }
  }
}
.sign {
  width: 320px;
  height: 220px;
  background-color: #fff;
  padding: 40px;
  & p {
    margin-bottom: 5px;
    font-size: 8px;
    color: #4e8ae0;
    font-weight: bold;
  }

  & .username {
    margin-left: 50px;
    margin-top: -20px;
  }
  & .password {
    margin-left: 50px;
  }
  & .button {
    margin-left: 50px;
    width: 272px;
    height: 30px;
    background-color: #61c6d0;
    border: 0;
    margin-top: 20px;
    color: #fff;
    font-weight: bold;
  }
}
.captcha {
  margin-left: 50px;
  margin-top: 20px;
}
.flex-between {
  width: 170px;
  float: left;
}

.user {
  margin-top: 20px;
  margin-left: 50px;
  width: 270px;
  & a {
    color: black;
  }
}
</style>