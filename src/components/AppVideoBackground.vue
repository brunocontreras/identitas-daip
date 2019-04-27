<template>
  <div>
    <video ref="video" src="@/assets/bg_video.mp4" autoplay muted class="video" loop @canplay="$emit('loaded')"></video>
    <div class="video-mask"></div>
  </div>
</template>

<style lang="scss" scoped>
.video {
  height: 100%;
  width: 100%;
  position: fixed;
  object-fit: cover;
}
.video-mask {
  background-image: $bg-radial;
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>
