<template>
  <div class="resource-container">
    <div class="resource-container-top">
      <div class="resource-container-top_left resource-container-borderCls_a">
        <ResourceStatistics />
      </div>
      <div class="resource-container-top_center">
        <ClientProbably />
      </div>
      <div class="resource-container-top_right resource-container-borderCls_a">
        <ResourceLive />
      </div>
    </div>
    <div class="resource-container-bottom">
      <div class="resource-container-bottom_left">
        <div class="resource-container-bottom_item">
          <ResourceIncrease />
        </div>
        <div class="resource-container-bottom_item">
          <ResourceAll />
        </div>
      </div>
      <div class="resource-container-bottom_center">
        <div class="resource-container-bottom_item2">
          <TeacherReputation />
        </div>
        <div class="resource-container-bottom_item2">
          <CoursesScore />
        </div>
      </div>
      <div class="resource-container-bottom_right">
        <div class="resource-container-bottom_item">
          <CoursesCollect />
        </div>
        <div class="resource-container-bottom_item">
          <TeacherGoodCourses />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ResourceStatistics from "./item/resourceStatistics.vue";
import ClientProbably from "./item/clientProbably.vue";
import ResourceIncrease from "./item/resourceIncrease.vue";
import TeacherReputation from "./item/teacherReputation.vue";
import CoursesScore from "./item/coursesScore.vue";
import ResourceLive from "./item/resourceLive.vue";
import ResourceAll from "./item/resourceAll.vue";
import CoursesCollect from "./item/coursesCollect.vue";
import TeacherGoodCourses from "./item/teacherGoodCourses.vue";
import { getResourceList } from "@/request/resource";

@Component({
  components: {
    ResourceStatistics,
    ClientProbably,
    ResourceIncrease,
    TeacherReputation,
    CoursesScore,
    ResourceLive,
    ResourceAll,
    CoursesCollect,
    TeacherGoodCourses
  }
})
export default class Index extends Vue {
  mounted() {
    this.$nextTick(() => {
      this.initData();
    });
  }
  initData() {
    // getResourceList({ limit: 20, page: 1 }).then(res => {
    //   console.log(res);
    // });
  }
}
</script>

<style lang="scss" scoped>
.resource-container {
  background: url("./../../assets/images/resourcebg.png");
  .resource-container-top {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1rem;
  }
  .resource-container-bottom {
    display: flex;
    justify-content: space-evenly;
  }
  .resource-container-top_left,
  .resource-container-top_right {
    width: 32.56rem;
    height: 24.69rem;
  }
  .resource-container-bottom_left,
  .resource-container-bottom_right {
    width: 32.56rem;
    height: 31.88rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .resource-container-top_center {
    width: 50.06rem;
    height: 24.69rem;
    background: url("./../../assets/images/resource-top-center.png");
    background-size: 100% 100%;
  }
  .resource-container-bottom_center {
    width: 50.06rem;
    height: 31.88rem;
    display: flex;
    justify-content: space-between;
  }
  .resource-container-bottom_item {
    background: url("./../../assets/images/resource-bottm-item.png");
    background-size: 100% 100%;
    width: 100%;
    height: 15.38rem;
  }
  .resource-container-bottom_item2 {
    background: url("./../../assets/images/resource-bottm-center.png");
    background-size: 100% 100%;
    width: 48.5%;
    height: 31.88rem;
  }
  .resource-container-borderCls_a {
    background: url("./../../assets/images/resource-top-item.png");
    background-size: 100% 100%;
  }
}
</style>
