<template>
  <app-template v-if="presentation" :item="presentation" class="presentation">
    <div class="container">
      <md-tabs class="tabs" md-alignment="fixed">
        <md-tab
          id="tab-slides"
          class="tab-content"
          :md-label="`Diapositivas / ${presentation.slides.length}`"
          md-icon="burst_mode"
        >
          <div class="preview-slides">
            <template v-for="(slide, i) in presentation.slides">
              <app-card :key="slide" class="preview-slide" :image="slide" @click="currentSlide = i" />
            </template>
          </div>
        </md-tab>
        <md-tab
          v-if="presentation.videos.length"
          id="tab-videos"
          class="tab-content"
          :md-label="`Vídeos / ${presentation.videos.length}`"
          md-icon="movie"
        >
          Vídeos
        </md-tab>
        <md-tab
          v-if="presentation.audios.length"
          id="tab-audios"
          class="tab-content"
          :md-label="`Audios / ${presentation.audios.length}`"
          md-icon="queue_music"
        >
          Audios
        </md-tab>
      </md-tabs>
      <div ref="mainslide" class="main-slide" @dblclick="toggleFullScreen">
        <app-progress :progress="presentationProgress" />
        <img :src="presentation.slides[currentSlide]" />
        <div class="icon-fullscreen-wrapper">
          <md-icon class="icon-fullscreen md-size-3x">fullscreen</md-icon>
        </div>
        <!-- <vue-displacement-slideshow
          ref="slideshow"
          :images="presentation.slides"
          :displacement="require('@/assets/displacement.png')"
          :intensity="0.1"
          :speed-in="0.7"
          :speed-out="0.7"
          ease="Expo.easeInOut"
        /> -->
      </div>
    </div>
    <md-button v-if="false" class="button md-raised md-primary" @click="playVideo">Show video</md-button>
    <vue-plyr v-if="showVideo" class="video">
      <video :src="video"></video>
    </vue-plyr>
  </app-template>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import VueDisplacementSlideshow from "vue-displacement-slideshow";
import AppTemplate from "@/components/AppTemplate";
import AppCard from "@/components/AppCard";
import AppProgress from "@/components/AppProgress";
export default {
  components: {
    AppTemplate,
    AppCard,
    AppProgress
    // VueDisplacementSlideshow
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data: () => ({
    currentSlide: 0,
    fullScreen: false,
    showVideo: false
  }),
  computed: {
    ...mapState(["data"]),
    presentationProgress() {
      return this.currentSlide / (this.presentation.slides.length - 1);
    },
    presentation() {
      const presentation = this.data.presentations.find(x => x.id === parseInt(this.id));
      this.SET_CURRENT(presentation);
      return presentation;
    },
    video() {
      return this.presentation.videos[0].path;
    }
  },
  mounted() {
    document.addEventListener("keyup", this.onKeyup);
    this.$refs.mainslide.addEventListener("mousewheel", this.onMouseWheel);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.onKeyup);
    this.$refs.mainslide.removeEventListener("mousewheel", this.onMouseWheel);
  },
  methods: {
    ...mapMutations(["SET_CURRENT"]),
    onKeyup(e) {
      const prevKeyCodes = [33, 37, 38];
      const nextKeyCodes = [34, 39, 40];
      if (prevKeyCodes.includes(e.keyCode)) this.prev();
      if (nextKeyCodes.includes(e.keyCode)) this.next();
      if (e.keyCode === 27) document.webkitExitFullscreen();
    },
    onMouseWheel(e) {
      e.deltaY > 0 ? this.next() : this.prev();
    },
    playVideo() {
      this.showVideo = true;
    },
    next() {
      if (this.currentSlide < this.presentation.slides.length - 1) this.currentSlide++;
      // this.$refs.slideshow.next();
    },
    prev() {
      if (this.currentSlide > 0) this.currentSlide--;
      // this.$refs.slideshow.previous();
    },
    toggleFullScreen() {
      this.fullScreen = !this.fullScreen;
      this.fullScreen ? this.$refs.mainslide.webkitRequestFullScreen() : document.webkitExitFullscreen();
    }
  }
};
</script>

<style lang="scss" scoped>
.presentation {
  display: flex;
  flex-direction: column;
}
.video {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.container {
  display: flex;
  flex-grow: 1;
  margin: 2rem 0;
  align-items: stretch;
}
.tabs {
  border-radius: $border-radius;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
  min-width: 350px;
  max-width: 500px;
  flex-basis: 33.3333%;
  ::v-deep {
    .md-tabs-navigation {
      flex-shrink: 0;
    }
    .md-content {
      background-color: transparent !important;
    }
    .md-tabs-content {
      flex-grow: 1;
    }
    .md-tabs-container {
      height: 100%;
    }
  }
}
.tab-content {
  background-color: rgba(255, 255, 255, 0.25);
  padding: 0;
  height: 100%;
  padding: 2rem;
  overflow: auto;
}
.preview-slides {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.preview-slide {
  width: 75%;
}
.main-slide {
  border-radius: $border-radius;
  align-self: center;
  width: 55%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  user-select: none;
  &:hover .icon-fullscreen-wrapper {
    opacity: 1;
    .icon-fullscreen {
      transform: translateY(0);
      opacity: 1;
    }
  }
  &:fullscreen {
    border-radius: 0;
    display: flex;
    justify-content: center;
    .icon-fullscreen-wrapper {
      display: none;
    }
  }
}
.icon-fullscreen-wrapper {
  border-radius: $border-radius;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: opacity 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-fullscreen {
  color: #fff !important;
  transform: translateY(25%);
  opacity: 0;
  transition: all 0.4s 0.1s;
}
</style>
