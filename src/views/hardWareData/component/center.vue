<template>
    <div class="center">
        <ClassesUse />
        <Circular />
        <Env />
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import ClassesUse from './centerComponent/classesUse.vue'
    import Circular from './centerComponent/circle.vue'
    import Env from './centerComponent/env.vue'
    @Component({
        components:{
            ClassesUse,Circular,Env
        }
    })
    export default class HardWareCenter extends Vue{

    }
</script>
<style lang="scss" scoped>
    .center{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        height: 24rem;
        grid-column-gap: .8rem;
        margin-bottom: 1rem;
        >div{
            background: url("../../../assets/hardwareImg/bg2.png") center/cover no-repeat;
        }
    }
</style>
