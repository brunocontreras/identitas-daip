<template>
  <md-card
    ref="appcard"
    class="appcard"
    :class="{ disabled }"
    md-with-hover
    @click.native="$emit('click')"
    @mousemove.native="!disabled ? onMouseMove($event) : null"
    @mouseleave.native="!disabled ? onMouseOut() : null"
  >
    <md-card-media>
      <app-image :src="image" @loaded="onImageLoaded" />
    </md-card-media>
    <md-card-header>
      <div class="md-title">{{ title }}</div>
      <div class="md-subhead">{{ subtitle }}</div>
    </md-card-header>
  </md-card>
</template>

<script>
import { TweenMax, Power1 } from "gsap";
import AppImage from "@/components/AppImage";
export default {
  components: {
    AppImage
  },
  props: {
    image: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showDelay: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    el() {
      return this.$refs.appcard.$el;
    }
  },
  mounted() {
    TweenMax.set(this.el, {
      rotationY: 0,
      rotationX: 0,
      rotationZ: 0,
      y: 100,
      transformPerspective: 1000,
      autoAlpha: 0
    });
  },
  methods: {
    onMouseMove(e) {
      const { left, top, width, height } = this.el.getBoundingClientRect();
      const x = e.pageX - left;
      const y = e.pageY - top;
      const px = x / width;
      const py = y / height;
      const xx = -15 + 30 * px;
      const yy = 15 - 30 * py;
      TweenMax.to(this.el, 0.5, {
        rotationY: xx,
        rotationX: yy,
        rotationZ: 0,
        transformPerspective: 1000,
        ease: Power1.easeOut
      });
    },
    onMouseOut() {
      TweenMax.to(this.el, 0.5, {
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        transformPerspective: 1000,
        ease: Power1.easeOut
      });
    },
    onImageLoaded() {
      TweenMax.to(this.el, 0.75, {
        y: 0,
        autoAlpha: 1,
        delay: this.showDelay ? Math.random() * 0.5 + 1 : 0,
        ease: Power1.Expo
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.appcard {
  flex-basis: 20vw;
  min-width: 18vw;
  margin: 2.5% 0;
  overflow: hidden;
}
.disabled {
  cursor: default !important;
  filter: grayscale(100%);
}
.md-subhead {
  margin-top: 1rem;
}
</style>
