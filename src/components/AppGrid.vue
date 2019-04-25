<template>
  <div class="appgrid">
    <div ref="cover" class="cover" :style="{ backgroundImage: `url(${coverImage})` }" />
    <div class="md-display-1">{{ item.name }}</div>
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
import { plurals } from "@/models/helpers";
import AppCard from "@/components/AppCard";
export default {
  components: {
    AppCard
  },
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
        delay: 0.3,
        ease: Power1.Expo
      },
      0.05
    );
  },
  methods: {
    getSubtitle(presentation) {
      const strings = [
        plurals(presentation.slides, "diapositiva", "diapositivas"),
        plurals(presentation.videos, "video", "videos"),
        plurals(presentation.audios, "audio", "audios")
      ];
      return strings.join(" / ");
    }
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
.md-display-1 {
  text-align: center;
  margin-top: 4rem;
  color: #fff !important;
  text-shadow: 0 0 6px rgba(0, 0, 0, 1);
}
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: stretch;
}
</style>
