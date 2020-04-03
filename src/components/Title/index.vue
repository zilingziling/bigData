<template>
  <div class="commonTitle">
    <div class="divide"></div>
    <h3>{{ title }}</h3>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({})
export default class Title extends Vue {
  @Prop({ default: "" }) title: String;
}
</script>
<style lang="scss" scoped>
.commonTitle {
  display: flex;
  width: fit-content;
  justify-content: space-around;
  align-items: center;
    h3{
        font-size:1.3rem;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(135,240,252,1);
    }
  .divide {
    width: 0.28rem;
    height: 1.3rem;
    background: linear-gradient(
      0deg,
      rgba(138, 245, 255, 1),
      rgba(82, 157, 252, 1)
    );
      margin-right: .5rem;
  }
}
</style>
