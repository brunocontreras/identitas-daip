<template>
  <div class="home">
    <div v-if="message || newUpdate" class="message">
      <p>{{ message }}</p>
      <button v-if="newUpdate" @click="update">Actualizar</button>
    </div>
    <app-video-background @loaded="onVideoLoaded" />
    <app-select-folder :is-active="showFolderSelecter" />
    <div v-if="data" class="data-container">
      <app-card
        image-url="@/assets/experts.jpg"
        :disabled="data.experts.disabled"
        :section="data.experts.name"
        @click="goTo('/section/experts', data.experts.disabled)"
      ></app-card>
      <app-card
        image-url="~@/assets/family.jpg"
        :disabled="data.family.disabled"
        :section="data.family.name"
        @click="goTo('/section/family', data.family.disabled)"
      ></app-card>
      <app-card
        image-url="~@/assets/training.jpg"
        :disabled="data.training.disabled"
        :section="data.training.name"
        @click="goTo('/section/training', data.training.disabled)"
      ></app-card>
      <app-card
        image-url="~@/assets/conferences.jpg"
        :disabled="data.conferences.disabled"
        :section="data.conferences.name"
        @click="goTo('/section/conferences', data.conferences.disabled)"
      ></app-card>
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
    <div
      class="loading"
      :class="{ hide: videoLoaded }"
      @transitionend="onLoadingFinished"
    ></div>
  </div>
</template>

<script>
/* Logic */
import { ipcRenderer } from "electron";
import { mapState, mapActions } from "vuex";
/* Components */
import AppVideoBackground from "@/components/AppVideoBackground";
import AppSelectFolder from "@/components/AppSelectFolder";
import AppCard from "@/components/AppCard";
export default {
  name: "Home",
  components: {
    AppVideoBackground,
    AppSelectFolder,
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
    ipcRenderer.on("message", (event, text) => {
      this.message = text;
    });
    ipcRenderer.on("downloaded", () => {
      this.newUpdate = true;
    });
    const root = localStorage.getItem("root");
    if (root && !this.data) this.READ_ROOT_DIRECTORY(root);
  },
  methods: {
    ...mapActions(["READ_ROOT_DIRECTORY"]),
    onVideoLoaded() {
      this.videoLoaded = true;
    },
    onLoadingFinished() {
      this.isLoading = false;
    },
    goTo(path, isDisabled) {
      if (!isDisabled) {
        this.$router.push(path);
      }
    },
    update() {
      ipcRenderer.send("update");
    }
  }
};
</script>

<style>
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
  align-items: flex-end;
  justify-content: space-around;
  height: 100vh;
  padding-bottom: 15vh;
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
</style>
