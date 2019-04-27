<template>
  <div class="apptemplate">
    <div class="cover-wrapper">
      <div ref="cover" class="cover" :style="{ backgroundImage: `url(${coverImage})` }" />
    </div>
    <div class="title">{{ item.name }}</div>
    <slot />
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
.apptemplate {
  padding: 2rem;
}
.cover-wrapper {
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
.title {
  font-size: 4rem;
  font-weight: 400;
  text-align: center;
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: #fff !important;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
}
</style>
