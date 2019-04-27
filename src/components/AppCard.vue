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
    <md-card-media v-if="image">
      <app-image :src="image" @loaded="show" />
    </md-card-media>
    <md-card-content v-else class="md-card-content">
      <slot />
    </md-card-content>
    <md-card-header v-if="title || subtitle">
      <div v-if="title" class="md-title">{{ title }}</div>
      <div v-if="subtitle" class="md-subhead">{{ subtitle }}</div>
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
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    initDelay: {
      type: Boolean,
      default: false
    },
    initAnimation: {
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
    this.init();
    this.$slots.default ? this.show() : this.hide();
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
    init() {
      TweenMax.set(this.el, {
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        transformPerspective: 1000
      });
    },
    hide() {
      if (this.initAnimation) {
        TweenMax.set(this.el, { autoAlpha: 0 });
      }
    },
    show() {
      if (this.initAnimation) {
        TweenMax.fromTo(
          this.el,
          0.75,
          {
            rotationX: -20,
            rotationY: 20,
            y: 150
          },
          {
            y: 0,
            autoAlpha: 1,
            delay: this.initDelay ? Math.random() * 0.5 + 1 : 0,
            rotationX: 0,
            rotationY: 0,
            ease: Power1.Expo
          }
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.appcard {
  border-radius: $border-radius;
  margin: 2.5% 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.disabled {
  cursor: default !important;
  filter: grayscale(100%);
}
.md-card-content {
  padding-bottom: 0;
}
.md-subhead {
  margin-top: 0.5em !important;
  margin-bottom: -0.5em !important;
}
</style>
