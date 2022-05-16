<template>
  <div>
    <img class="captchaSrc" @click="getCaptcha" :src="captchaSrc" alt="">
  </div>
</template>

<script>
import { getCaptchaApi } from "@/assets/api/api";
export default {
  data() {
    return {
      captchaSrc: "/api/captcha",
    };
  },
  created() {
    // 实例生成前生成验证码
    this.captchaSrc = getCaptchaApi();
    // 按下回车键触发submit
    // window.addEventListener(
    //   "keydown",
    //   (event) => {
    //     if (event.code == "Enter") {
    //       this.submit();
    //       //使用KeyboardEvent.keyCode处理事件并将handled设置为true。
    //       event.preventDefault();
    //     }
    //   },
    //   true
    // );
  },
  methods: {
    // 点击验证码切换
    getCaptcha() {
      this.captchaSrc = getCaptchaApi();
    },
  },
};
</script>

<style lang="scss" scoped>
.captchaSrc {
  width: 100px;
}
</style>