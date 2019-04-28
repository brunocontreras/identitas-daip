<template>
  <div class="appcover">
    <div ref="cover" class="cover" :style="{ backgroundImage: `url(${coverImage})` }" />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    coverImage() {
      let item = this.item;
      while (item.parent) item = item.parent;
      return require(`@/assets/${item.image}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.appcover {
  position: fixed;
  top: -30px;
  bottom: -30px;
  left: -30px;
  right: -30px;
  z-index: -1;
  filter: blur(15px) brightness(0.75);
}
.cover {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position-y: 20%;
}
</style>
