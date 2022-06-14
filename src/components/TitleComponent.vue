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
  created() {},
};
</script>

<style scoped>
.title-1 {
  padding: 0;
  margin: 0;
}
</style>