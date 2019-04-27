<template>
  <div class="appgrid">
    <div class="cover-wrapper">
      <div ref="cover" class="cover" :style="{ backgroundImage: `url(${coverImage})` }" />
    </div>
    <div class="title">{{ item.name }}</div>
    <div v-if="item.children" class="grid">
      <app-card
        v-for="child in item.children"
        :key="child.name"
        ref="appcard"
        class="card"
        :title="child.name"
        :image="getImage(child)"
        :subtitle="getSubtitle(child)"
        @click="$emit('click', child)"
      >
        <slot :item="child" />
      </app-card>
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
    getImage: {
      type: Function,
      default: () => ""
    },
    getSubtitle: {
      type: Function,
      required: true
    },
    animation: {
      type: Boolean,
      default: false
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
    if (this.animation) {
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
  }
};
</script>

<style lang="scss" scoped>
.appgrid {
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
.card {
  flex-basis: 20vw;
  min-width: 18vw;
}
</style>
