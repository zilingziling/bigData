<template>
    <div class="environment">
        <div class="chartTitle">
            <Title title="教室环境质量"/>
            <div class="unit">
                <span class="clicked">日</span>
                <span>|</span>
                <span>周</span>
                <span>|</span>
                <span>月</span>
            </div>
        </div>
        <vue-seamless-scroll :data="listData" :class-option="optionSingleHeight"   class="seamless-warp">
            <ul class="item">
                <li  v-for="item in listData" :key="item.id">
                    <h2 :class="item.id>3?'blue':'yellow'">NO.1</h2>
                    <div class="detail">
                        <span>{{item.value}}</span>
                    </div>
                </li>
            </ul>
        </vue-seamless-scroll>
    </div>
</template>
<script lang="ts">
    import {Vue,Component} from "vue-property-decorator";
    import Title from '../../../../components/Title/index.vue';
    @Component({
        components:{
            Title
        }
    })
    export default class Env extends Vue{
        private listData: Array<any> = [
            {
            id:1,
            value:'C102  温度23.二氧化碳浓度6699m,光照999lux,PM2.5 600'
        },{
            id:2,
            value:'C102  温度23.二氧化碳浓度6699m,光照999lux,PM2.5 600'
        },{
            id:3,
            value:'C102  温度23.二氧化碳浓度6699m,光照999lux,PM2.5 600'
        },{
            id:4,
            value:'C102  温度23.二氧化碳浓度6699m,光照999lux,PM2.5 600'
        },{
            id:5,
            value:'C102  温度23.二氧化碳浓度6699m,光照999lux,PM2.5 600'
        }];
        private minLength: number = 3;
        get optionSingleHeight(){
            return {
                singleHeight:4,
                singleWidth:36.8,
                limitMoveNum:3,
                isSingleRemUnit:true,
                waitTime:2000
            }
        }
    }
</script>
<style lang="scss" scoped>
    .environment{
        box-sizing: border-box;
        padding: 2rem 1rem 0 1rem;
        .chartTitle{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            .unit{
                width: fit-content;
                .clicked{
                    font-size: 1.2rem;
                    color: #8AF5FF;
                }
                span{
                    font-size:1.1rem;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    letter-spacing: .4rem;
                }
            }
        }
        .seamless-warp{
            width: 36.8rem;
            height: 19rem;
            overflow: hidden;
            ul{
                li{
                    display: flex;
                    justify-content: left;
                    align-items: center;
                    height: 3.6rem;
                    h2{
                        font-size:1.3rem;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        margin-right: 1.4rem;
                    }
                    .blue{
                       color:  #2B7BFD
                    }
                    .yellow{
                        color: #E49E00
                    }
                    .detail{
                        border-bottom: .16rem solid ;
                        height: 3.5rem;
                        width: fill-available;
                        line-height: 3.4rem;
                        overflow: hidden;
                        text-align: left;
                        border-image:linear-gradient(to right,#EDC364 36%,#E49E00 69%,#2543AA 70%,#2543AA 100%) 30 30;
                        span{
                            white-space: nowrap;
                            font-size:1.15rem;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            color:rgba(255,255,255,1);
                        }
                    }
                }
            }
        }
    }
</style>
