<template>
  <div>
    <video ref="video" src="@/assets/bg_video.mp4" autoplay muted class="video" loop @canplay="$emit('loaded')"></video>
    <div class="video-mask"></div>
  </div>
</template>

<style lang="scss" scoped>
.video {
  height: 100%;
  position: fixed;
  object-fit: cover;
}
.video-mask {
  background-image: radial-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 1));
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>
