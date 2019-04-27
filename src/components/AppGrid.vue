<template>
  <div class="appgrid">
    <div ref="cover" class="cover" :style="{ backgroundImage: `url(${coverImage})` }" />
    <div class="title">{{ item.name }}</div>
    <div v-if="item.children" class="grid">
      <app-card
        v-for="child in item.children"
        ref="appcard"
        :key="child.name"
        :image="child.slides[0]"
        :title="child.name"
        :subtitle="getSubtitle(child)"
        @click="$emit('click', child)"
      />
    </div>
  </div>
</template>

<script>
import { TimelineMax, Power1 } from "gsap";
import AppCard from "@/components/AppCard";
export default {
  components: {
    AppCard
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    getSubtitle: {
      type: Function,
      required: true
    }
  },
  computed: {
    coverImage() {
      let item = this.item;
      while (item.parent) item = item.parent;
      return require(`@/assets/${item.image}`);
    }
  },
  mounted() {
    const items = this.$refs.appcard.map(x => x.$el);
    const timeline = new TimelineMax();
    timeline.staggerFromTo(
      items,
      0.75,
      {
        autoAlpha: 0,
        rotationX: -20,
        rotationY: 20,
        rotationZ: 0,
        transformPerspective: 1000,
        y: 150
      },
      {
        y: 0,
        autoAlpha: 1,
        rotationX: 0,
        rotationY: 0,
        ease: Power1.Expo
      },
      0.05
    );
  }
};
</script>

<style lang="scss" scoped>
.appgrid {
  padding: 2rem;
}
.cover {
  position: fixed;
  top: -15px;
  bottom: -15px;
  left: -15px;
  right: -15px;
  background-size: cover;
  background-position-y: 20%;
  z-index: -1;
  filter: blur(15px) brightness(0.75);
}
.title {
  font-size: 4rem;
  font-size: 400;
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
