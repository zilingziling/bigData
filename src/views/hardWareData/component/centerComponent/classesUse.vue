<template>
    <div class="resource">
        <div class="chartTitle">
            <Title title="教室使用率"/>
            <div class="unit">
               <span class="clicked">周</span>
                <span>|</span>
                <span>月</span>
            </div>
        </div>
        <div ref="classesUse" class="chart"></div>
    </div>
</template>
<script lang="ts">
    import {Vue,Component} from "vue-property-decorator";
    import Title from '../../../../components/Title/index.vue'
    @Component({
        components:{
            Title
        }
    })
    export default class ClassesUse extends Vue{
        public onClassChart:any;
        mounted(){
            this.initEcharts()
        }
        public initEcharts(): void {
            this.onClassChart = this.$echarts.init(this.$refs["classesUse"]);
            this.onClassChart.setOption(this.initEchartsOption());
        }
        public initEchartsOption() {
            const option: any = {
                tooltip: {
                    trigger: 'axis'
                },
                grid:{
                    top: '16%',   // 等价于 y: '16%'
                    left: '3%',
                    right: '8%',
                    bottom: '3%',
                    containLabel: true

                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    splitLine: {
                        show: false,
                    },
                    axisLine: {

                        lineStyle: {
                            color: 'rgb(26,43,80)', // 颜色
                            width: 2 // 粗细
                        }
                    },
                    axisLabel : {
                        textStyle: { //改变刻度字体样式
                            color: '#50A2C1',
                            fontSize: 14
                        }
                    },
                    axisTick: { // X轴线 刻度线
                        show: true,
                        length: 5,
                        alignWithLabel: true,
                        lineStyle: {
                            color: 'rgb(113,147,172,.7)',
                            type: 'solid',
                            width: 2
                        }
                    },

                },
                yAxis: {
                    type: 'value',
                    data: ["10", "100", "10000", "2000", "3000", "4000", "5000", "6000"],
                    axisLine: {
                        show:false
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: ['rgb(26,43,80)'],
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel : {
                        textStyle: {
                            color: 'rgba(88,173,245,.7)',
                            fontSize:14,
                            fontFamily:'Microsoft YaHei',
                            fontWeight:600,
                        }
                    }
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    symbol:'circle',
                    symbolSize: 10,
                    areaStyle: {
                        normal: {
                            color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: "rgb(27,114,171)" // 0% 处的颜色
                                }, {
                                    offset: .6,
                                    color: "rgb(15,38,80)" // 100% 处的颜色
                                }],
                                globalCoord: false // 缺省为 false
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(42,123,250)', //改变折线点的颜色
                            lineStyle: {
                                color: 'rgb(42,123,250)' //改变折线颜色
                            }
                        }
                    },
                }]
            };
            return option;
        }
    }
</script>
<style lang="scss" scoped>
.resource{
    box-sizing: border-box;
    padding: 2rem 1rem 0 1rem;
    .chartTitle{
        display: flex;
        justify-content: space-between;
        align-items: center;
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
    .chart{
            width: 34rem;
            height: 20rem;
    }
}
</style>
