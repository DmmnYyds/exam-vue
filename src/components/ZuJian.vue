<template>
  <div>
    <button @click="click()">
      <slot name="aaa"></slot>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    click() {
      this.$emit("greet", "这是通过点击触发的");
    },
  },
};
</script>

<style lang="sass" scoped>
</style>