<template>
  <div>
    <h1 class="title-1">
      <span v-if="icon" class="icon" :class="icon"></span>
      <slot></slot>
    </h1>
  </div>
</template>

<script>
export default {
  props: ["icon"],
  created() {
    console.log(this.icon);
  },
};
</script>

<style scoped>
.title-1 {
  padding: 12px 15px;
}
</style>