<template>
  <div class="home">
    <app-video-background @loaded="onVideoLoaded" />
    <app-select-folder :is-active="showFolderSelecter" />
    <app-logo class="logo" white />
    <div v-if="data" class="data-container">
      <app-card
        v-for="node in data.tree"
        :key="node.name"
        class="card"
        :image="getImage(node.image)"
        :disabled="node.disabled"
        :title="node.name"
        :subtitle="node.description"
        :init-delay="true"
        :init-animation="true"
        @click="goTo(node)"
      />
      <!--
      <ul>
        <li v-for="(video, index) in data.videos" :key="video.id">
          <strong>{{ index }}. {{ video.name }}</strong>
          <div style="color: #666">({{ video.path }})</div>
          <video :src="video.path" controls width="300" preload="none">
            Tu navegador no admite el elemento <code>video</code>.
          </video>
        </li>
      </ul> -->
    </div>
    <div class="loading" :class="{ hide: videoLoaded }" @transitionend="onLoadingFinished"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import AppVideoBackground from "@/components/AppVideoBackground";
import AppSelectFolder from "@/components/AppSelectFolder";
import AppLogo from "@/components/AppLogo";
import AppCard from "@/components/AppCard";
export default {
  components: {
    AppVideoBackground,
    AppSelectFolder,
    AppLogo,
    AppCard
  },
  data: () => ({
    message: "",
    newUpdate: false,
    videoLoaded: false,
    isLoading: true
  }),
  computed: {
    ...mapState(["data"]),
    showFolderSelecter() {
      return !this.data && this.videoLoaded && !this.isLoading;
    }
  },
  created() {
    this.SET_CURRENT(null);
    const root = localStorage.getItem("root");
    if (root && !this.data) this.READ_ROOT_DIRECTORY(root);
  },
  methods: {
    ...mapMutations(["SET_CURRENT"]),
    ...mapActions(["READ_ROOT_DIRECTORY"]),
    onVideoLoaded() {
      this.videoLoaded = true;
    },
    onLoadingFinished() {
      this.isLoading = false;
    },
    goTo(node) {
      if (!node.disabled) {
        this.$router.push({
          name: node.type.toLowerCase(),
          params: { id: node.id }
        });
      }
    },
    getImage(url) {
      return require(`@/assets/${url}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
.message {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  color: #fff;
  max-width: 300px;
  padding: 10px 40px;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.data-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
}
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  transition: opacity 1.5s;
  pointer-events: none;
}
.hide {
  opacity: 0;
}
.logo {
  position: absolute;
  top: 100px;
  left: 50%;
  opacity: 0.5;
  max-width: 300px;
  width: 25vmin;
  min-width: 150px;
  transform: translateX(-50%);
}
.card {
  flex-basis: 20vw;
  min-width: 18vw;
}
</style>
