<template>
    <div class="hardWareTop">
        <div class="realTime">
            <div class="title">
                <span>实时统计</span>
                <span>2020-03-15</span>
                <span>星期四</span>
                <span>14:00:00</span>
            </div>
            <div class="circleWrapper">
                <div class="single" >
                    <Title title="上课教室"/>
                    <div ref="onClass" class="onClass">
                    </div>
                </div>
                <div class="single">
                    <Title title="在线设备"/>
                </div>
                <div class="single">
                    <Title title='报警设备'/>
                </div>
            </div>
        </div>
        <RightTop />
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import Title from '../../../components/Title/index.vue'
    import RightTop from '../component/topRight.vue'
    @Component({
        components:{
            Title,RightTop
        }
    })

    export default class HardWareTop extends Vue{
        public onClassChart:any;
        mounted(){
            this.initEcharts()
        }
        public initEcharts(): void {
            this.onClassChart = this.$echarts.init(this.$refs["onClass"]);
            this.onClassChart.setOption(this.initEchartsOption());
        }
        public initEchartsOption() {
           const option:any = {
                series: [
                    {
                        center: [
                            "50%",
                            "30%",
                        ],
                        radius: [
                            "30%",
                            "31%"
                        ],
                        clockWise: false,
                        hoverAnimation: false,
                        type: "pie",
                        avoidLabelOverlap: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 20,
                                        color:'#ffffff',
                                    },
                                    position: "center"
                                },
                                labelLine: {
                                    show: false
                                },
                                color: "#13b5b1",
                                borderColor: "#13b5b1",
                                borderWidth: 15
                            },
                        },
                        data: [
                            {
                                value: 52.7,
                                name: "52.7% 男"
                            },
                            {
                                name: " ",
                                value: 47.3,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            "show": false
                                        },
                                        labelLine: {
                                            "show": false
                                        },
                                        color: "#13b5b1",
                                        borderColor: "#13b5b1",
                                        borderWidth: 0
                                    },
                                }
                            }
                        ]
                    },
                    {
                        center: [
                            "50%",
                            "72%"

                        ],
                        radius: [
                            "30%",
                            "31%"
                        ],
                        clockWise: false,
                        hoverAnimation: false,
                        type: "pie",
                        avoidLabelOverlap: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    textStyle: {
                                        fontSize: 20,
                                        color:'#ffffff',
                                    },
                                    position: "center"
                                },
                                labelLine: {
                                    show: false
                                },
                                color: "#00a0e9",
                                borderColor: "#00a0e9",
                                borderWidth: 15
                            },
                        },

                    }
                ]
            };
            return option;
        }
    }
</script>
<style lang="scss" scoped>
    .hardWareTop{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        height: 23.4rem;
        grid-column-gap: 1.4rem;
        margin-bottom: 1rem;
        >div{
            background: url("../../../assets/hardwareImg/bg5.png") center/cover no-repeat;
        }
        .realTime{
            box-sizing: border-box;
            padding:2rem 7rem 0 ;
            .title{
                width: 37rem;
                height: 3rem;
                background: url("../../../assets/hardwareImg/bg4.png") center/cover no-repeat;
                margin:0 auto 2rem;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                font-size:1.3rem;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(135,240,252,1);
                box-sizing: border-box;
                padding: 0 1.5rem;
            }
            .circleWrapper{
                display: flex;
                justify-content: space-between;
                .onClass{
                    width: 10rem;
                    height: 12rem;
                }
            }

        }
    }

</style>
