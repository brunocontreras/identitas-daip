<template>
  <div class="home">
    <div v-if="message || newUpdate" class="message">
      <p>{{ message }}</p>
      <button v-if="newUpdate" @click="click">Actualizar</button>
    </div>
    <video
      ref="video"
      src="@/assets/bg_video.mp4"
      autoplay
      muted
      class="video"
      loop
      @canplay="$emit('loaded')"
    ></video>
    <div class="video-mask"></div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";
export default {
  name: "Home",
  data: () => ({
    message: "",
    newUpdate: false
  }),
  created() {
    ipcRenderer.on("message", (event, text) => {
      this.message = text;
    });
    ipcRenderer.on("downloaded", () => {
      this.newUpdate = true;
    });
  },
  methods: {
    click() {
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
.video {
  height: 100vh;
  position: fixed;
  z-index: -1;
  object-fit: cover;
}
.video-mask {
  background-image: radial-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 1));
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: -1;
}
</style>
