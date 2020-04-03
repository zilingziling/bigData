<template>
  <div class="teacherReputation">
    <div class="teacherReputation-header">
      <div class="title_cls">老师好评榜</div>
      <div class="teacherReputation-container_header_handle">
        <span
          :class="handleActiveClass = handleActive === 'month' ? 'handleactive':'handleunactive'"
          @click="switchData('month')"
        >月</span>
        <a-divider type="vertical"></a-divider>
        <span
          :class="handleActiveClass = handleActive === 'all' ? 'handleactive':'handleunactive'"
          @click="switchData('all')"
        >全部</span>
      </div>
    </div>
    <div class="teacherReputation-content">
      <transition name="fade">
        <div class="teacherReputation-content-item" ref="teacherReputation" v-if="listshow">
          <div class="teacherReputation-content-item_top3">
            <div class="score_top2 score_topitem">
              <div class="topitem_ranking">NO.2</div>
              <div class="topitem_forshort no2">{{teacherList[1]&&teacherList[1].abbreviation}}</div>
              <div class="topitem_score">{{teacherList[1]&&teacherList[1].score}}分</div>
              <div class="topitem_name">{{teacherList[1]&&teacherList[1].name}}</div>
            </div>
            <div class="score_top1 score_topitem">
              <div class="topitem_ranking">NO.1</div>
              <div class="topitem_forshort no1">{{teacherList[0]&&teacherList[0].abbreviation}}</div>
              <div class="topitem_score">{{teacherList[0]&&teacherList[0].score}}分</div>
              <div class="topitem_name">{{teacherList[0]&&teacherList[0].name}}</div>
            </div>
            <div class="score_top3 score_topitem">
              <div class="topitem_ranking">NO.3</div>
              <div class="topitem_forshort no3">{{teacherList[2]&&teacherList[2].abbreviation}}</div>
              <div class="topitem_score">{{teacherList[2]&&teacherList[2].score}}分</div>
              <div class="topitem_name">{{teacherList[2]&&teacherList[2].name}}</div>
            </div>
          </div>
          <div class="teacherReputation-content-item_bottom">
            <template v-for="(item,index) in teacherList">
              <div class="bottom_list_item" :key="item.id" v-if="index>2">
                <div class="bottomitem_ranking">{{index+1}}</div>
                <div class="bottomitem_forshort">{{item.abbreviation}}</div>
                <div class="bottomitem_name">{{item.name}}</div>
                <div class="bottomitem_score">{{item.score}}分</div>
              </div>
            </template>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { getTeacherReputation } from "@/request/resource";

@Component({})
export default class TeacherReputation extends Vue {
  private handleActive: String = "month";
  private handleActiveClass: String = "handleactive";
  private teacherList: Array<any> = [];
  private listshow: boolean = false;

  public switchData(type: String): void {
    this.listshow = false;
    this.handleActive = type;
    this.getTeacherReputationData(type);
  }
  mounted() {
    this.$nextTick(() => {
      this.getTeacherReputationData();
    });
  }
  public getTeacherReputationData(type: String = "month") {
    getTeacherReputation({ type }).then(res => {
      if (res.code == 0) {
        this.listshow = true;
        this.teacherList = this.formatTeacherList(res.data);
      }
    });
  }
  public formatTeacherList(data: Array<any>): Array<any> {
    let arr = data.map((item, index) => {
      return {
        abbreviation: item.name.split("")[0] || "无",
        name: item.name,
        score: item.value,
        id: item.name + item.value + index
      };
    });
    if (arr.length < 8) {
      const l = arr.length;
      for (let i = 0; i < 8 - l; i++) {
        arr.push({
          abbreviation: "无",
          name: "无",
          score: 0,
          id: "暂无" + i
        });
      }
    }
    return arr;
  }
}
</script>

<style lang="scss" scoped>
/**
    * 定义进入动画和退出动画的过程
    * 代表关注的是height的变化，动画的时间是5
    */
.fade-enter-active,
.fade-leave-active {
  transition: all 1.5s;
}

/* 定义进入动画的初始状态*/
.fade-enter {
  top: 28rem;
}

/* 定义进入动画的结束状态*/
.fade-enter-to {
  top: 0;
}

/* 定义离开动画的初始状态*/
.fade-leave {
  opacity: 1;
}

/* 定义离开动画的结束状态*/
.fade-leave-to {
  opacity: 0;
}

.teacherReputation {
  padding: 0 1rem;
  overflow: hidden;
  .teacherReputation-header {
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
    .teacherReputation-container_header_handle {
      color: #87f0fc;
      font-size: 1rem;
      span.handleactive {
        color: #8af5ff;
        font-size: 1.1rem;
        text-shadow: 0 0 1rem #fff;
      }
      span {
        color: #fff;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .teacherReputation-content {
    .teacherReputation-content-item {
      position: relative;
      height: 28rem;
      width: 100%;
      overflow: hidden;
      .teacherReputation-content-item_top3 {
        height: 11rem;
        display: flex;
        .score_top1 {
          padding-top: 3%;
          .topitem_ranking {
            color: #ff15c5;
          }
        }
        .score_top2,
        .score_top3 {
          padding-top: 9%;
          .topitem_ranking {
            color: #ac54ff;
          }
        }

        .score_topitem {
          flex: 1;

          .no1 {
            width: 4.13rem;
            height: 4.13rem;
            background: linear-gradient(
              135deg,
              rgba(221, 86, 188, 1),
              rgba(111, 72, 236, 1)
            );
            border-radius: 50%;
            line-height: 4.13rem;
          }
          .no2,
          .no3 {
            width: 3.44rem;
            height: 3.44rem;
            background: linear-gradient(
              135deg,
              rgba(45, 202, 255, 1),
              rgba(111, 72, 236, 1)
            );
            line-height: 3.44rem;
          }

          .topitem_ranking {
            font-size: 1.38rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
          }
          .topitem_forshort {
            border-radius: 50%;
            margin: auto;
            margin-bottom: 0.5rem;
            font-size: 1.5rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          .topitem_score {
            font-size: 1rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(17, 210, 251, 1);
          }
          .topitem_name {
            font-size: 0.88rem;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          div {
            margin-bottom: 0.3rem;
          }
        }
      }
      .teacherReputation-content-item_bottom {
        height: calc(100% - 11rem);
        .bottom_list_item {
          display: flex;
          height: 2.88rem;
          font-size: 0.88rem;
          font-family: Microsoft YaHei;
          font-weight: 400;
          align-items: center;
          background: rgba(12, 54, 77, 0.2);
          box-shadow: 0rem 0rem 1rem 0rem rgba(21, 213, 241, 0.2) inset;
          //   opacity: 0.3;
          text-align: center;
          margin-bottom: 0.6rem;
          .bottomitem_ranking {
            text-align: center;
            margin-left: 1rem;
            color: rgba(255, 255, 255, 1);
          }
          .bottomitem_forshort {
            text-align: center;
            color: rgba(255, 255, 255, 1);
            width: 2.5rem;
            height: 2.5rem;
            line-height: 2.5rem;
            background: linear-gradient(
              135deg,
              rgba(1, 192, 204, 1),
              rgba(65, 113, 250, 1)
            );
            border-radius: 50%;
            margin: 0 1rem;
          }
          .bottomitem_name {
            text-align: center;
            color: rgba(255, 255, 255, 1);
            margin-left: 2rem;
          }
          .bottomitem_score {
            text-align: right;
            flex: 1;
            color: rgba(255, 255, 255, 1);
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
}
</style>