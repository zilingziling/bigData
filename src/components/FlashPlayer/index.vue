<template>
  <div class="flashplayer-container">
    <div class="flashplayer-container-video">
      <object
        classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        ref="SinglePlayer1"
        :id="flashid+'IE'"
        style="display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                color:#fff;"
      >
        <param name="movie" :value="swfObj" />
        <param name="quality" value="high" />
        <param name="bgcolor" value="#0f3a69" />
        <param name="allowScriptAccess" value="always" />
        <param name="allowFullScreen" value="true" />
        <param name="wmode" value="window" />
        <object
          type="application/x-shockwave-flash"
          :data="swfObj"
          ref="SinglePlayer2"
          :id="flashid"
          style="display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                color:#fff;"
        >
          <param name="quality" value="high" />
          <param name="bgcolor" value="#0f3a69" />
          <param name="allowScriptAccess" value="always" />
          <param name="allowFullScreen" value="true" />
          <param name="wmode" value="window" />
          <p>需启用flash播放器.</p>
          <a href="http://www.adobe.com/go/getflashplayer">
            <img
              src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"
              alt="Get Adobe Flash Player"
            />
          </a>
        </object>
      </object>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Index extends Vue {
  @Prop({ default: true }) muted: boolean;
  @Prop({ default: "" }) videoUrl: String;
  @Prop({ default: "" }) videoTitle: String;
  @Prop({ default: "" }) flashid: number;

  private swfObj: String =
    window.origin + `/SinglePlayer.swf?id=` + this.flashid;

  @Watch("muted")
  onChangemuted(newVal: string, oldVal: string) {
    if (newVal) {
      setTimeout(() => {
        window.YjFPlayer.onSetVolumn(1);
      }, 0);
    } else {
      setTimeout(() => {
        window.YjFPlayer.onSetVolumn(0);
      }, 0);
    }
  }
  @Watch("videoUrl", { immediate: true, deep: true })
  onChangevideoUrl(newVal: string, oldVal: string) {
    if (this.flashid) {
      window.YJFPlayerUrl[this.flashid] = [
        {
          url: newVal || "",
          title: this.videoTitle || ""
        }
      ];

      window.YjFPlayer.onSetParamsByID && window.YjFPlayer.onPlay(this.flashid);
    }
  }

  get url_json() {
    let d = [
      {
        url: this.videoUrl,
        title: this.videoTitle
      }
    ];
    return JSON.stringify(d);
  }
  OnPlay() {
    window.YjFPlayer.onSetParamsByID && window.YjFPlayer.onPlay(this.flashid);
  }
}
</script>

<style lang="scss" scoped>
.flashplayer-container {
  height: 99.9%;
  width: 100%;
  position: relative;
  .flashplayer-container-video {
    height: inherit;
    width: inherit;
    object {
      width: 100%;
      height: 100%;
    }
  }
  .flashplayer-container-contro {
    position: absolute;
    bottom: 0;
    button {
      width: 60px;
    }
  }
}
</style>