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
      <md-tab id="tab-videos" class="tab-content" :md-label="tabVideosName" md-icon="movie">
        <md-switch v-model="showAllVideos" class="md-primary">Mostrar todos los vídeos / {{ data.videos.length }}</md-switch>
        <md-progress-spinner v-if="fetchingAllVideos" class="md-primary spinner" :md-diameter="30" :md-stroke="3" md-mode="indeterminate" />
        <template v-else-if="videos.length">
          <app-card
            v-for="video in videos"
            :key="video.path"
            :title="video.name"
            :subtitle="getBreadcrumb(video)"
            @click="currentVideo = video"
          />
        </template>
        <md-empty-state v-else class="empty-state" md-icon="movie" md-label="No hay ningún vídeo" />
      </md-tab>
      <md-tab id="tab-audios" class="tab-content" :md-label="tabAudiosName" md-icon="queue_music">
        <md-switch v-model="showAllAudios" class="md-primary">Mostrar todos los audios / {{ data.audios.length }}</md-switch>
        <md-progress-spinner v-if="fetchingAllAudios" class="md-primary spinner" :md-diameter="30" :md-stroke="3" md-mode="indeterminate" />
        <template v-else-if="audios.length">
          <app-card
            v-for="audio in audios"
            :key="audio.path"
            :title="audio.name"
            :subtitle="getBreadcrumb(audio)"
            @click="currentAudio = audio"
          />
        </template>
        <md-empty-state v-else class="empty-state" md-icon="queue_music" md-label="No hay ningún audio" />
      </md-tab>
    </md-tabs>
    <div class="slider-container">
      <h1>{{ presentation.name }}</h1>
      <div class="slider-wrapper">
        <div ref="slider" class="slider" @dblclick="toggleFullScreen">
          <app-progress :progress="presentationProgress" />
          <transition name="fadeslide">
            <template v-for="(slide, i) in slides">
              <img v-if="i === currentSlide" :key="i" :src="slide" />
            </template>
          </transition>
          <div class="icon-fullscreen-wrapper" @click.stop="toggleFullScreen">
            <md-icon class="icon-fullscreen md-size-2x">fullscreen</md-icon>
            <md-tooltip md-direction="top">Pantalla completa</md-tooltip>
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
      <video :src="currentVideo.path" autoplay />
    </vue-plyr>
    <div v-if="currentAudio" ref="audio" class="lyrics-wrapper" @click="toggleAudio">
      <app-cover :item="presentation" />
      <h1>{{ currentAudio.name }}</h1>
      <div class="lyrics">
        <pre v-if="currentAudio.lyrics" class="lyrics-text">{{ currentAudio.lyrics }}</pre>
        <md-icon v-else class="icon-music">queue_music</md-icon>
      </div>
      <vue-plyr ref="audioplayer">
        <audio :src="currentAudio.path" autoplay />
      </vue-plyr>
    </div>
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
    fetchingAllVideos: false,

    audios: [],
    currentAudio: null,
    showAllAudios: false,
    fetchingAllAudios: false
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
        controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings"]
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
    },
    showAllAudios: {
      immediate: true,
      handler() {
        if (this.showAllAudios) {
          this.fetchingAllAudios = true;
          new Promise(resolve => {
            setTimeout(() => resolve(this.sort(this.data.audios)), 100);
          }).then(audios => {
            this.audios = audios;
            this.fetchingAllAudios = false;
          });
        } else {
          this.audios = this.presentation.audios;
        }
      }
    },
    currentAudio() {
      if (this.currentAudio) {
        this.$nextTick(() => {
          this.$refs.audio.webkitRequestFullScreen();
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
        if (this.currentAudio) this.currentAudio = null;
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
    },
    toggleAudio() {
      this.$refs.audioplayer.player.togglePlay();
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
  cursor: pointer;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  position: absolute;
  width: 100px;
  height: 100px;
  right: 1rem;
  bottom: 1rem;
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
.empty-state ::v-deep .md-empty-state-label {
  color: rgba(0, 0, 0, 0.26);
}
.lyrics-wrapper {
  display: none;
  &:fullscreen {
    padding-top: 4rem;
    display: flex;
    flex-direction: column;
  }
}
.lyrics {
  position: relative;
  border-radius: $border-radius;
  flex-grow: 1;
  width: 75%;
  margin: 4rem auto;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  overflow: auto;
  text-align: center;
  padding: 15rem 5rem;
  white-space: pre-wrap;
}
.lyrics-text {
  font-family: inherit;
  font-size: 5rem;
  line-height: 1.5;
}
.icon-music {
  position: absolute;
  color: #fff !important;
  width: 300px;
  height: 300px;
  font-size: 300px !important;
  opacity: 0.25;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -150px;
}
.fadeslide-enter-active,
.fadeslide-leave-active {
  transition: opacity 0.25s;
}
.fadeslide-enter,
.fadeslide-leave-to {
  opacity: 0.5;
  position: absolute;
}
</style>
