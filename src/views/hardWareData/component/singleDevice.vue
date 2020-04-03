<template>
    <div class="bg3">
        <div class="deviceName">
            <h3>{{name}}</h3>
            <span>{{status}}</span>
        </div>
<!--        <div :id="'circle'+id" class="canvas"></div>-->
        <VueCircle
                :ref="id"
                :progress="70"
                :size="110"
                :reverse="false"
                line-cap="round"
                :fill="this.fill"
                empty-fill="#004970"
                :animation-start-value="0.0"
                :start-angle="-90"
                insert-mode="append"
                :thickness="12"
                :show-percent="true"

        >
        </VueCircle>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Prop} from "vue-property-decorator";
    import VueCircle from 'vue2-circle-progress'

    @Component({
        components:{
            VueCircle
        }
    })
    export default class SingleDevice extends Vue{
        @Prop({ default: "" }) name: String;
        @Prop({ default: "" }) status: String;
        @Prop({ default: "" }) id: number;
        private fill:object  = { gradient: ["#F0FF00", "#00D2FF"] }
        mounted(){
        }

    }
</script>
<style lang="scss" scoped>
    .bg3{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 2rem 0 1rem;
        align-items: center;
        background: url("../../../assets/hardwareImg/bg1.png") center/cover no-repeat;
        .deviceName{
            display: flex;
            text-align: left;
            flex-direction: column;
            color:rgba(255,255,255,1);
            font-family:Microsoft YaHei;
            font-weight:400;
            h3{
                font-size:1.3rem;
                color:rgba(255,255,255,1);
                margin-bottom: 1rem;
            }
            span{
                font-size:.9rem;
            }
        }
        .canvas{
            width: 7rem;
            height: 7rem;
        }
       /deep/ .percent-text{
           font-size:1.3rem;
           font-family:Adobe Heiti Std;
           font-weight:normal;
           color:rgba(43,250,255,1);
        }

    }
</style>
