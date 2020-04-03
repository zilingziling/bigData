<template>
  <div class="resourceLive">
    <div class="resourceLive-header">
      <div class="title_cls">直播课程</div>
    </div>
    <div class="resourceLive-content">
      <div class="resourceLive-content-item" ref="resourceLive">
        <div class="resourceLive-content-item_left">
          <div class="item_left_top">{{liveData.title}}</div>
          <div class="item_left_center">
            <FlashPlayer
              v-show="liveList.length>0"
              :videoUrl="liveData.url"
              :videoTitle="liveData.title"
              :flashid="8005"
            />
            <video v-show="liveList.length==0" src poster="./../../../assets/images/videobg.jpg"></video>
          </div>
          <div class="item_left_bottom">
            <div class="swtich_btn item_left_bottom_previous" @click="switchLive('previous')"></div>
            <div class="item_left_bottom_text">{{liveList.length}}个课程直播中</div>
            <div class="swtich_btn item_left_bottom_next" @click="switchLive('next')"></div>
          </div>
        </div>
        <div class="resourceLive-content-item_center"></div>
        <div class="resourceLive-content-item_right">
          <div class="item_right_top">
            <div class="item-icon"></div>
            <div class="item-num">{{liveTotal}}</div>
            <div class="item-label">累计直播数</div>
          </div>
          <div class="item_right_bottom">
            <div class="item-icon"></div>
            <div class="item-num">{{watchTotal}}</div>
            <div class="item-label">累计观看人次</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FlashPlayer from "@/components/FlashPlayer/index.vue";
import FlashMultiscreen from "@/components/FlashMultiscreen/index.vue";
import { getLive } from "@/request/resource";
interface liveObj {
  title: String;
  url: String;
}

@Component({
  components: { FlashPlayer, FlashMultiscreen }
})
export default class ResourceLive extends Vue {
  private watchTotal: number = 0;
  private liveTotal: number = 0;
  private liveList: Array<liveObj> = [];
  private liveData: liveObj = {
    title: "直播中",
    url: ""
  };
  private timerNum: number = 0;

  private mounted() {
    this.$nextTick(() => {
      this.getLiveData();
      // this.initTimer();
    });
  }
  public getLiveData() {
    getLive().then(res => {
      if (res.code == 0) {
        this.watchTotal = res.data.watchTotal.value;
        this.liveTotal = res.data.liveTotal.value;
        this.liveList = this.formateList(res.data.live);
        if (res.data.live.length > 0) {
          this.liveData = this.liveList[0];
        }
      }
    });
  }
  private formateList(data: Array<any>) {
    return data.map(item => {
      return {
        title: item.name,
        url: item.value
      };
    });
  }
  private switchLive(type: String) {
    // window.YjFPlayer.onSlidePlay(8005, type);
    if (this.liveList.length < 2) return;
    let start = 0;
    let end = this.liveList.length - 1;
    let tmp;
    if (type === "previous") {
      tmp = this.liveList[end];
      while (start < end) {
        this.liveList[end] = this.liveList[end - 1];
        end--;
      }
      this.liveList[start] = tmp;
    } else {
      tmp = this.liveList[0];
      while (start < end) {
        this.liveList[start] = this.liveList[start + 1];
        start++;
      }
      this.liveList[end] = tmp;
    }
    this.liveData = this.liveList[0];
  }
  private initTimer() {
    clearInterval(this.timerNum);
    this.timerNum = 0;
    this.timerNum = setInterval(() => {
      window.YjFPlayer.onSlidePlay(8005);
    }, 10000);
  }
}
</script>

<style lang="scss">
.resourceLive {
  padding: 0 1rem;
  .resourceLive-header {
    height: 3rem;
    line-height: 4rem;
    font-size: 1.38rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(135, 240, 252, 1);
    display: flex;
    justify-content: space-between;
    .title_cls {
      &::before {
        content: ".";
        color: transparent;
        font-family: "SimSun";
        margin-right: 0.3rem;
        background: linear-gradient(
          0deg,
          rgba(138, 245, 255, 1),
          rgba(82, 157, 252, 1)
        );
        display: inline-block;
        line-height: 1;
        width: 0.25rem;
      }
    }
  }
  .resourceLive-content {
    .resourceLive-content-item {
      height: 21rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .resourceLive-content-item_left {
        width: 22rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .item_left_top {
          height: 2rem;
          background: url("./../../../assets/images/resource-top-title.png")
            no-repeat;
          background-size: 50% 100%;
          background-position: center;
          width: 100%;
          line-height: 2rem;
          margin-bottom: 0.8rem;
          font-size: 0.99rem;
          font-family: Adobe Heiti Std;
          font-weight: normal;
          color: rgba(160, 210, 227, 1);
        }
        .item_left_center {
          width: 21.75rem;
          height: 11.94rem;
          border: 1px solid #1b9bff;
          margin-bottom: 1rem;
          video {
            height: 100%;
          }
          // background: url("./../../../assets/images/videobg.jpg");
          // background-size: 100% 100%;
        }
        .item_left_bottom {
          width: 21.69rem;
          height: 3.13rem;
          background: url("./../../../assets/images/live-swtich-border.png");
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 15%;
          background-size: 100% 100%;
          font-size: 1rem;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(0, 224, 255, 1);
          .swtich_btn {
            width: 1.81rem;
            height: 1.81rem;
            background-size: 100% 100%;
            cursor: pointer;
            &:hover {
              transform: scale(1.1, 1.1);
            }
          }
          .item_left_bottom_previous {
            background: url("./../../../assets/images/left.png");
          }
          .item_left_bottom_next {
            background: url("./../../../assets/images/right.png");
          }
        }
      }
      .resourceLive-content-item_center {
        width: 0.13rem;
        height: 10rem;
        background: linear-gradient(to top, transparent, #1b9bff, transparent);
      }
      .resourceLive-content-item_right {
        height: 19rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item_right_top,
        .item_right_bottom {
          width: 6.06rem;
          height: 9rem;
          background: url("./../../../assets/images/resource-live-tongji.png");
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 2rem;
          .item-num {
            font-size: 1.75rem;
            font-family: TsangerJinKai05;
            font-weight: normal;
            margin-bottom: 0.5rem;
            color: rgba(1, 212, 249, 1);
          }
          .item-label {
            font-size: 0.75rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }
        .item_right_bottom .item-icon {
          width: 2.25rem;
          height: 1.56rem;
          background: url("./../../../assets/images/eye.png");
          background-size: 100% 100%;
          margin-bottom: 0.8rem;
        }
        .item_right_top .item-icon {
          width: 1.88rem;
          height: 2rem;
          margin-bottom: 0.8rem;
          background: url("./../../../assets/images/live-icon.png");
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>