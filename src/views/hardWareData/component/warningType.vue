<template>
    <div class="type">
        <div class="chartTitle">
            <Title title="报警类型统计"/>
            <div class="unit">
                <span class="clicked">周</span>
                <span>|</span>
                <span>月</span>
            </div>
        </div>
        <div ref="warnType" class="warnType"></div>
    </div>
</template>
<script lang="ts">
    import {Vue,Component} from 'vue-property-decorator'
    import Title from "@/components/Title/index.vue";
    @Component({
        components:{
            Title
        }
    })
    export default class WarningType extends Vue{
        public onClassChart: any;
        mounted() {
            this.initEcharts();
        }
        public initEcharts(): void {
            this.onClassChart = this.$echarts.init(this.$refs["warnType"]);
            this.onClassChart.setOption(this.initEchartsOption());
        }
        public initEchartsOption(): void {
           const option:any = {

                tooltip: {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 500,
                    max: 600,
                    inRange: {
                        //colorLightness: [0, 1]
                    }
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '50%'],
                    color: ['#0162FF', '#E49E00',  '#00D2FF','#01BB42','#0162FF'], //'#FBFE27','rgb(11,228,96)','#FE5050'
                    data: [{
                        value: 285,
                        name: '黑名单查询'
                    },
                        {
                            value: 410,
                            name: '红名单查询'
                        },
                        {
                            value: 274,
                            name: '法人行政处罚'
                        },
                        {
                            value: 235,
                            name: '其它查询'
                        },
                        {
                            value: 140,
                            name: '网络断开'
                        }
                    ].sort(function(a, b) {
                        return a.value - b.value
                    }),
                    roseType: 'radius',

                    label: {
                        normal: {
                            // formatter: ['{c|{c}次}', '{b|{b}}'].join('\n'),
                            color: '#FFFFFF',
                            fontSize: 14,
                            fontWeight:400,
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: '#2543AA',
                            },
                            smooth: 0,
                            length: 10,
                            length2: 20,

                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowColor: 'rgba(18,25,47,0.54)',
                            shadowBlur: 50,
                        }
                    }
                }]
            };
            return option;
        }
    }
</script>
<style lang="scss" scoped>
    .type{
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
        .warnType{
            width: 21rem;
            height: 17rem;
            margin-top: 1.5rem;
        }
    }
</style>
