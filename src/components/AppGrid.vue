<template>
  <div class="appgrid">
    <app-cover :item="item" />
    <h1>{{ item.name }}</h1>
    <div v-if="item.children" class="grid">
      <app-card
        v-for="child in item.children"
        :key="child.name"
        ref="appcard"
        class="card"
        :title="getTitle(child)"
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
import AppCover from "@/components/AppCover";
import AppCard from "@/components/AppCard";
export default {
  components: {
    AppCover,
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
    getTitle: {
      type: Function,
      required: true
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
  padding: 4rem;
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
