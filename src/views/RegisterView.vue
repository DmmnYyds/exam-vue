<template>
  <div class="box">
    <div class="title">
      <img src="../assets/imgs/tribe.png" class="tribe">
      <div>北企互联账号注册</div>
    </div>
    <div class="align-center subject-top">
      <div class="subject">
        <div class="state ">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="校验身份"></el-step>
            <el-step title="设置密码"></el-step>
          </el-steps>
        </div>
        <div class="input" v-show="input1">
          <div class="align-center">
            <div class="star">*</div>
            <el-input v-model="email" placeholder="请输入邮箱"></el-input>
          </div>
          <div class="hi-20"></div>
          <div class="align-center">
            <div class="star">*</div>
            <el-input v-model="phone" placeholder="请输入手机号" maxlength="11"></el-input>
          </div>
          <div class="hi-20"></div>
          <div class="align-center">
            <div class="star">*</div>
            <el-input v-model="name" placeholder="请输入真实姓名"></el-input>
          </div>
          <div class="hi-20"></div>
          <div class="align-center">
            <div class="star">*</div>
            <el-input v-model="captcha" placeholder="请输入验证码" class="input-b"></el-input>
            <el-captcha ref="captcha"></el-captcha>
          </div>
          <el-button @click="next" class="button">下一步</el-button>
        </div>
        <div class="input" v-show="input2">
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
          <div class="hi-20"></div>
          <el-input v-model="password" placeholder="请输入密码"></el-input>
          <div class="hi-20"></div>
          <el-input v-model="confirm" placeholder="请输入密码"></el-input>
          <el-button @click="complete" class="button">完成注册</el-button>
          <el-button @click="bureturn" class="bureturn" circle>返</el-button>
        </div>
        <el-col :sm="12" :lg="6" v-show="input3" style="width:100%">
          <div class="success">
            <div class="el-icon-circle-check success-w"></div>
            <div>恭喜您注册成功</div>
            <div>{{count}}秒后跳转登录</div>
            <el-button type="success" @click="jump()">不等待！直接跳转</el-button>
          </div>
        </el-col>
      </div>
    </div>
  </div>

</template>


// 用户点击
<script>
import { encrypt } from "@/assets/utils/index";
import { registerApi, loginApi } from "@/assets/api/api";
import democomponent from "@/components/DemoComponent.vue";
export default {
  data() {
    return {
      active: 0,
      input1: true,
      input2: false,
      input3: false,
      email: "",
      phone: "",
      name: "",
      username: "",
      password: "",
      confirm: "",
      captcha: "",
      count: 3, //倒计时
      timer: null,
    };
  },
  components: {
    "el-captcha": democomponent,
  },
  methods: {
    // 点击下一步进行判断
    next() {
      
      var res = {
        result: true,
      };
      if (this.captcha.length == "") {
        res.result = false;
        res.message = { message: "邮箱不能为空", type: "warning" };
      } else if (this.phone.length !== 11) {
        res.result = false;
        res.message = { message: "手机号应为11位", type: "warning" };
      } else if (this.captcha.length !== 4) {
        res.result = false;
        res.message = { message: "验证码不正确", type: "warning" };
      } else if (this.name.length == "") {
        res.result = false;
        res.message = { message: "请输入真实姓名", type: "warning" };
      } else {
        this.input1 = false;
        this.input2 = true;
        this.input3 = false;
        if (this.active++ > 2) this.active = 0;
      }
    },
    // 点击注册进行判断
    getValdateRseult() {
      var res = {
        result: true,
      };
      if (
        this.username == "" ||
        this.password == "" ||
        this.confirm == "" ||
        this.email == "" ||
        this.phone == "" ||
        this.name == "" ||
        this.captcha == ""
      ) {
        res.result = false;
        res.message = { message: "注册信息不能为空", type: "warning" };
      } else if (this.username.length < 6 || this.username.length > 15) {
        res.result = false;
        res.message = { message: "账号长度应该在6——15位之间", type: "warning" };
      } else if (/\W/.test(this.username)) {
        res.result = false;
        res.message = {
          message: "账号只能包含字母,数字,下划线",
          type: "warning",
        };
      } else if (this.password.length < 6 || this.password.length > 15) {
        res.result = false;
        res.message = { message: "密码长度应该在6——15位之间", type: "warning" };
      } else if (this.confirm !== this.password) {
        res.result = false;
        res.message = { message: "两次密码不一致", type: "warning" };
      }
      if (!res.result) this.$message(res.message);
      return res.result;
    },

    // 用户点击注册
    async complete() {
      // 校验 input 框里的值是否符合要求
      var isValidate = this.getValdateRseult();
      if (!isValidate) return;
      let res = await registerApi({
        email: this.email,
        phone: this.phone,
        captcha: this.captcha,
        username: this.username,
        password: this.password,
        name: this.name,
      });
      if (res.data.status == 1) {
        this.input2 = false;
        this.input3 = true;
        this.Time();
        this.$message({
          message: "注册成功",
          type: "success",
        });
      } else {
        console.log(res.data.mag);
        this.$message({
          message: res.data.mag,
          type: "warning",
        });
        this.$refs.captcha.getCaptcha();
      }
    },
    // 直接登录接口
    async tohome() {
      let res = await loginApi({
        username: this.username,
        password: encrypt(this.password),
        captcha: this.captcha,
      });
      sessionStorage.setItem("token", res.data.data);
    },
    // 点击跳转至home界面
    jump() {
      this.tohome();
      this.$router.push({ name: "home" });
    },
    // 定时器外加跳转
    Time() {
      this.timer = setInterval(() => {
        this.count--;
        if (this.count == 0) {
          this.tohome();
          this.$router.push({ name: "home" });
        }
      }, 1000);
    },
    // 关闭页面时，关闭计时器
    destroyed() {
      // 这个钩子函数是在页面关闭时，关闭页面中的定时器；
      clearInterval(this.timer);
    },
    // 用户点击返回上一级
    bureturn() {
      this.input1 = true;
      this.input2 = false;
      if (this.active-- < 2) this.active = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  height: 100vh;
  background-color: #f9f9f9;
}
.title {
  height: 90px;
  padding: 0 10%;
  display: flex;
  font-size: 30px;
  align-items: center;
}
.tribe {
  width: 100px;
}
.subject {
  margin: 0 auto;
  width: calc(100vw - 200px);
  min-width: 40%;
  height: calc(100vh - 200px);
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
  & .state {
    width: 500px;
    margin: 0 auto;
    margin-top: 25vh;
  }
  & .input {
    width: 300px;
    margin: 0 auto;
    margin-top: 50px;
    & .input-a {
      margin-bottom: 20px;
    }
    & .input-b {
      width: 180px;
    }
    & .button {
      width: 300px;
      margin: 20px 0;
      background: #0563bb;
      color: #fff;
    }
    & .bureturn {
      width: 50px;
      height: 50px;
      margin: 10px 0;
      background: rgb(84, 233, 71);
      color: #fff;
      font-size: 20px;
    }
  }
}
.but {
  margin-left: 8px;
}
.align-center {
  display: flex;
  align-items: center;
}
.star {
  color: #ff4400;
  margin-right: 5px;
}

.success {
  width: 200px;
  height: 200px;
  text-align: center;
  margin: auto;
  margin-top: 50px;
  & .success-w {
    font-size: 80px;
    color: rgb(88, 223, 30);
  }
}
</style>