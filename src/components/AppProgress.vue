<template>
  <div class="appprogress" :style="{ transform: `scaleX(${progress})` }"></div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.appprogress {
  background-color: $color-main;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  transition: transform 0.5s $ease-quart-out;
  transform-origin: 0 50%;
  z-index: 1;
}
</style>
