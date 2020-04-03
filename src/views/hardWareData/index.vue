<template>
  <div class="content">
    <HardWareTop />
    <HardWareCenter />
    <HardWareBottom />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import HardWareTop from "./component/top.vue";
import HardWareCenter from "./component/center.vue";
import HardWareBottom from "./component/bottom.vue";
@Component({
    components: {
    HardWareTop,
    HardWareCenter,
    HardWareBottom,
  }
})
export default class Hardware extends Vue {}
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  box-sizing: border-box;
  padding: 0 1.2rem;
}
</style>
