<template>
  <img class="appimage" :class="{ 'appimage--loaded': loaded }" :src="src" @load="loaded = true" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loaded: false
  })
};
</script>

<style lang="scss" scoped>
.appimage {
  opacity: 0;
  transition: opacity 0.25s;
  &.appimage--loaded {
    opacity: 1;
  }
}
</style>
