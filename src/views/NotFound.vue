<template>
  <div class="homepage-hero-module">
    <div class="video-container">
      <div :style="fixStyle" class="filter">
        <!--内容-->
        <Header></Header>
        <div
          style="background: rgba(0, 0, 0, 0.4);margin-left: auto;width: 100%;margin-right: auto;color:whitesmoke;position:fixed; bottom:0px;">
          <H1 style="text-align: center">Not Found</H1>
          <div style="text-align:center;width: 100%;margin-bottom:5px;">你想要的东西不在这，到别处看看吧。
            <router-link :to="{name:'Home'}">返回首页</router-link>
          </div>

        </div>
      </div>
      <video :style="fixStyle" autoplay class="fillWidth" loop muted>
        <source src="../assets/404.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
  import Header from "../components/Header";

  export default {
    components: {
      Header
    },
    mounted: function () { //屏幕自适应
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    },
  }
</script>
<style scoped>
  .homepage-hero-module,
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }

  .video-container .poster img {
    z-index: 0;
    position: absolute;
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;

    width: 100%;
  }

  .fillWidth {
    width: 100%;
  }
</style>
