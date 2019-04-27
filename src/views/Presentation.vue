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
          id="tab-videos"
          class="tab-content"
          :md-label="`Vídeos / ${presentation.videos.length}`"
          md-icon="movie"
        >
          Vídeos
        </md-tab>
        <md-tab
          id="tab-audios"
          class="tab-content"
          :md-label="`Audios / ${presentation.audios.length}`"
          md-icon="queue_music"
        >
          Audios
        </md-tab>
      </md-tabs>
      <img class="main-slide" :src="presentation.slides[currentSlide]" />
      <vue-displacement-slideshow
        v-if="false"
        ref="slideshow"
        :images="presentation.slides"
        :displacement="require('@/assets/displacement.png')"
        :intensity="0.1"
        :speed-in="0.7"
        :speed-out="0.7"
        ease="Expo.easeInOut"
      />
      <md-button v-if="false" class="button md-raised md-primary" @click="playVideo">Show video</md-button>
      <vue-plyr v-if="showVideo" class="video">
        <video :src="video"></video>
      </vue-plyr>
    </div>
  </app-template>
  <!-- <div class="presentation" @keyup.right="next" @keyup.left="prev"></div> -->
</template>

<script>
import { mapState, mapMutations } from "vuex";
import VueDisplacementSlideshow from "vue-displacement-slideshow";
import AppTemplate from "@/components/AppTemplate";
import AppCard from "@/components/AppCard";
export default {
  components: {
    AppTemplate,
    AppCard,
    VueDisplacementSlideshow
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data: () => ({
    currentSlide: 0,
    showVideo: false
  }),
  computed: {
    ...mapState(["data"]),
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
    this.keyupHandler = this.keyup.bind(this);
    document.addEventListener("keyup", this.keyupHandler);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.keyupHandler);
  },
  methods: {
    ...mapMutations(["SET_CURRENT"]),
    keyup(e) {
      if (e.keyCode === 37) this.prev();
      if (e.keyCode === 39) this.next();
    },
    playVideo() {
      this.showVideo = true;
    },
    next() {
      this.$refs.slideshow.next();
    },
    prev() {
      this.$refs.slideshow.previous();
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
  margin: 4rem 0 2rem;
  align-items: stretch;
}
.tabs {
  border-radius: 8px;
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
  border-radius: 8px;
  align-self: center;
  width: 55%;
  margin: 0 auto;
}
</style>
