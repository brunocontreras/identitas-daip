<template>
  <div class="presentation" @keyup.right="next" @keyup.left="prev">
    <vue-displacement-slideshow
      ref="slideshow"
      :images="images"
      :displacement="require('@/assets/displacement.png')"
      :intensity="0.2"
      :speed-in="1.4"
      :speed-out="1.4"
      ease="Expo.easeInOut"
    />
    <md-button class="button md-raised md-primary" @click="playVideo">Show video</md-button>
    <vue-plyr v-if="showVideo" class="video">
      <video :src="video"></video>
    </vue-plyr>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VueDisplacementSlideshow from "vue-displacement-slideshow";
export default {
  components: {
    VueDisplacementSlideshow
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data: () => ({
    showVideo: false
  }),
  computed: {
    ...mapState(["data"]),
    presentation() {
      return this.data.presentations.find(x => x.id === parseInt(this.id));
    },
    images() {
      return this.presentation.slides;
    },
    video() {
      return this.presentation.videos[0].path;
    }
  },
  mounted() {
    this.keyupHandler = this.keyup.bind(this);
    document.addEventListener("keyup", this.keyupHandler);
    // setInterval(() => {
    //   this.$refs.slideshow.next()
    //   console.log('next')
    // }, 2500)
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.keyupHandler);
  },
  methods: {
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

<style>
.presentation {
  height: 100vh;
}
.button {
  position: absolute;
  top: 50px;
  left: 50px;
}
.video {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
