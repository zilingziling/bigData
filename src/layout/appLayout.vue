<template>
  <div class="applayout-container">
    <a-layout-header class="applayout-container-header">
      <GlobalHeader />
    </a-layout-header>
    <a-layout-content class="applayout-container-content">
      <router-view />
    </a-layout-content>
  </div>
</template>
<script lang="ts">
import GlobalHeader from "@/components/GlobalHeader/index.vue";
import { Vue, Component } from "vue-property-decorator";
@Component({
  components: {
    GlobalHeader
  }
})
export default class index extends Vue {}
</script>
<style lang="scss" scoped>
.applayout-container {
  background: url("./../assets/images/homebg.png");
  background-size: 100% 100%;
  width: 100%;
  height: 67.5rem;
  .applayout-container-header {
    padding: 0;
    height: 8rem;
    background: none;
  }
  .applayout-container-content {
    padding: 0;
    background: none;
  }
}
</style>
