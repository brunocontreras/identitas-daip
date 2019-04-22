<template>
  <img class="appimage" :class="{ 'appimage--loaded': loaded }" :src="src" @load="onLoad" />
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
    loaded: true
  }),
  methods: {
    onLoad() {
      this.loaded = true;
      this.$emit("loaded");
    }
  }
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
