<template>
  <section v-if="presentation" class="presentation">
    <app-cover :item="presentation" />
    <md-tabs class="tabs" md-alignment="fixed">
      <md-tab id="tab-slides" class="tab-content" :md-label="tabSlidesName" md-icon="burst_mode">
        <div class="preview-slides">
          <template v-for="(slide, i) in slides">
            <app-card :key="slide" class="preview-slide" :image="slide" @click="currentSlide = i" />
          </template>
        </div>
      </md-tab>
      <md-tab v-if="videos.length" id="tab-videos" class="tab-content" :md-label="tabVideosName" md-icon="movie">
        <md-switch v-model="showAllVideos" class="md-primary">Todos los vídeos</md-switch>
        <md-progress-spinner
          v-show="fetchingAllVideos"
          class="md-primary spinner"
          :md-diameter="30"
          :md-stroke="3"
          md-mode="indeterminate"
        />
        <template v-if="!fetchingAllVideos">
          <app-card
            v-for="video in videos"
            :key="video.path"
            :title="video.name"
            :subtitle="getBreadcrumb(video)"
            @click="currentVideo = video"
          />
        </template>
      </md-tab>
      <md-tab v-if="audios.length" id="tab-audios" class="tab-content" :md-label="tabAudiosName" md-icon="queue_music">
        Audios
      </md-tab>
    </md-tabs>
    <div class="slider-container">
      <h1>{{ presentation.name }}</h1>
      <div class="slider-wrapper">
        <div ref="slider" class="slider" @dblclick="toggleFullScreen">
          <app-progress :progress="presentationProgress" />
          <img :src="slides[currentSlide]" />
          <div class="icon-fullscreen-wrapper">
            <md-icon class="icon-fullscreen md-size-3x">fullscreen</md-icon>
          </div>
        </div>
      </div>
    </div>
    <vue-plyr
      v-if="currentVideo"
      ref="videoplayer"
      class="videoplayer"
      :options="videoPlayerOptions"
      :emit="['exitfullscreen']"
      @exitfullscreen="videoExitFullScreen"
    >
      <video :src="currentVideo.path" autoplay></video>
    </vue-plyr>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AppCover from "@/components/AppCover";
import AppCard from "@/components/AppCard";
import AppProgress from "@/components/AppProgress";
export default {
  components: {
    AppCover,
    AppCard,
    AppProgress
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
    videos: [],
    currentVideo: null,
    showAllVideos: false,
    fetchingAllVideos: false
  }),
  computed: {
    ...mapState(["data"]),
    presentationProgress() {
      return this.currentSlide / (this.slides.length - 1);
    },
    presentation() {
      const presentation = this.data.presentations.find(x => x.id === parseInt(this.id));
      this.SET_CURRENT(presentation);
      return presentation;
    },
    slides() {
      return this.presentation.slides;
    },
    audios() {
      return this.presentation.audios;
    },
    tabSlidesName() {
      return `Diapositivas / ${this.slides.length}`;
    },
    tabVideosName() {
      return `Vídeos / ${this.videos.length}`;
    },
    tabAudiosName() {
      return `Audios / ${this.audios.length}`;
    },
    videoPlayerOptions() {
      return {
        controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip"]
      };
    }
  },
  watch: {
    showAllVideos: {
      immediate: true,
      handler() {
        if (this.showAllVideos) {
          this.fetchingAllVideos = true;
          new Promise(resolve => {
            setTimeout(() => resolve(this.sort(this.data.videos)), 100);
          }).then(videos => {
            this.videos = videos;
            this.fetchingAllVideos = false;
          });
        } else {
          this.videos = this.presentation.videos;
        }
      }
    },
    currentVideo() {
      if (this.currentVideo) {
        this.$nextTick(() => {
          this.$refs.videoplayer.player.fullscreen.enter();
        });
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.onKeydown);
    this.$refs.slider.addEventListener("mousewheel", this.onMouseWheel);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeydown);
    this.$refs.slider.removeEventListener("mousewheel", this.onMouseWheel);
  },
  methods: {
    ...mapMutations(["SET_CURRENT"]),
    onKeydown(e) {
      const prevKeyCodes = [33, 37, 38];
      const nextKeyCodes = [34, 39, 40];
      if (prevKeyCodes.includes(e.keyCode)) this.prev();
      if (nextKeyCodes.includes(e.keyCode)) this.next();
      if (e.keyCode === 27) {
        if (!this.currentVideo) document.webkitExitFullscreen();
      }
    },
    onMouseWheel(e) {
      e.deltaY > 0 ? this.next() : this.prev();
    },
    next() {
      if (this.currentSlide < this.slides.length - 1) this.currentSlide++;
    },
    prev() {
      if (this.currentSlide > 0) this.currentSlide--;
    },
    toggleFullScreen() {
      this.fullScreen = !this.fullScreen;
      this.fullScreen ? this.$refs.slider.webkitRequestFullScreen() : document.webkitExitFullscreen();
    },
    sort(collection) {
      return collection.sort((a, b) => {
        if (a.name > b.name) return 1;
        else if (a.name < b.name) return -1;
        return 0;
      });
    },
    getBreadcrumb(item) {
      const breadcrumb = [];
      let parent = item.parent;
      while (parent) {
        breadcrumb.unshift(parent.name);
        parent = parent.parent;
      }
      return breadcrumb.join(" / ");
    },
    videoExitFullScreen() {
      this.currentVideo = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.presentation {
  padding: 4rem;
  display: flex;
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
.slider-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 4rem;
}
.slider-wrapper {
  margin-top: 4rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slider {
  border-radius: $border-radius;
  align-self: center;
  width: 90%;
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
    img {
      height: 100%;
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
.videoplayer {
  position: absolute !important;
  top: 200%;
}
</style>
