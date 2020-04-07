<template>
    <div class="operation">
        <div class="titleWrapper">
            <Title title="运维统计"/>
        </div>
        <div class="bubble">
            <div class="bubble1">
                <h4>23232</h4>
                <h6>接收报警</h6>
            </div>
            <div class="bubble2">
                <h4>2323</h4>
                <h6>接收报警</h6>
            </div>
            <div class="bubble3">
                <h4>23232</h4>
                <h6>接收报警</h6>
            </div>
            <div class="bubble4">
                <h4>23232</h4>
                <h6>接收报警</h6>
            </div>
            <div class="bubble5">
                <h4>23232</h4>
                <h6>接收报警</h6>
            </div>
            <div class="bubble6"></div>
            <div class="bubble7"></div>
            <div class="bubble8"></div>
            <div class="bubble9"></div>
        </div>
    </div>
</template>
<script>
    import {Vue,Component} from "vue-property-decorator";
    import Title from '../../../../components/Title/index.vue'
    @Component({
        components:{
            Title
        }
    })
    export default class Circular extends Vue{

    }
</script>
<style lang="scss" scoped>
    .operation{
        box-sizing: border-box;
        padding: 2rem 0 0 0;
        .titleWrapper{
            box-sizing: border-box;
            padding-left: 1rem;
            margin-bottom: 1rem;
        }
        .bubble{
            width: 100%;
            height: 88%;
            /*background: rgb(13,34,88);*/
            background-image: linear-gradient(to bottom, rgba(31,61,108,1) 0, rgba(31,61,108,1) .1rem, transparent 0), linear-gradient(to right, rgba(31,61,108,1) .1rem, rgba(31,61,108,1) .1rem, transparent .1rem);
            background-size: 7.8rem 6.7rem;
            background-repeat: repeat;
            position: relative;
            >div{
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                h4,h6{
                    color:rgba(255,255,255,1);
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    white-space: nowrap;
                }
                h4{
                    font-size: 1.3rem;
                    margin-bottom: .5rem;
                }
                h6{
                    font-size: .8rem;

                }
            }
            .bubble1{
                width: 6rem;
                height: 6rem;
                background:rgba(27,155,255,1);
                position: absolute;
                top: 3rem;
                left: 4.9rem;
                animation: balloon1 6s ease-in-out infinite;
                &:before{
                    content: '';
                    width: 7rem;
                    height: 7rem;
                    border-radius: 50%;
                    background: rgba(27,155,255,.3);
                    position: absolute;
                    left: -.5rem;
                    top: -.5rem;
                }
            }
            .bubble2{
                width: 4rem;
                height: 4rem;
                background:#A95FEF;
                position: absolute;
                top: .2rem;
                left: 19rem;
                animation: balloon2 6s ease-in-out infinite;
                &:before{
                    content: '';
                    width: 5rem;
                    height: 5rem;
                    border-radius: 50%;
                    background: rgba(169,95,239,.3);
                    position: absolute;
                    left: -.5rem;
                    top: -.5rem;
                }
            }
            .bubble3{
                width: 5.8rem;
                height: 5.8rem;
                background:#E49E00;
                position: absolute;
                top: 8.8rem;
                left: 12rem;
                animation: balloon4 6s ease-in-out infinite;
                &:before{
                    content: '';
                    width: 6.8rem;
                    height: 6.8rem;
                    border-radius: 50%;
                    background: rgba(228,158,0,.3);
                    position: absolute;
                    left: -.5rem;
                    top: -.5rem;
                }
            }
            .bubble4{
                width: 5.2rem;
                height: 5.2rem;
                background:#F8405C;
                position: absolute;
                top: 11.6rem;
                left: 26rem;
                animation: balloon3 6s ease-in-out infinite;
                &:before{
                    content: '';
                    width: 6.2rem;
                    height: 6.2rem;
                    border-radius: 50%;
                    background: rgba(248,64,92,.3);
                    position: absolute;
                    left: -.5rem;
                    top: -.5rem;
                }
            }
            .bubble5{
                width: 4.8rem;
                height: 4.8rem;
                background:#5A37CC;
                position: absolute;
                top: 4.8rem;
                right: 1.6rem;
                animation: balloon4 6s ease-in-out infinite;
                &:before{
                    content: '';
                    width: 5.8rem;
                    height: 5.8rem;
                    border-radius: 50%;
                    background: rgba(90,55,204,.3);
                    position: absolute;
                    left: -.5rem;
                    top: -.5rem;
                }
            }
            .bubble6{
                width: 2.6rem;
                height: 2.6rem;
                background:#67AE19;
                position: absolute;
                top: -.7rem;
                right: 6.8rem;
                animation: balloon1 6s ease-in-out infinite;
            }
            .bubble7{
                width: 2.6rem;
                height: 2.6rem;
                background:#A95FEF;
                position: absolute;
                top: 6.8rem;
                right: 13.2rem;
                animation: balloon2 6s ease-in-out infinite;
            }
            .bubble8{
                width: 2.8rem;
                height: 2.8rem;
                background:#67AE19;
                position: absolute;
                bottom: 1rem;
                right: 17rem;
                animation: balloon3 6s ease-in-out infinite;
            }
            .bubble9{
                width: 3.4rem;
                height: 3.4rem;
                background:#19A572;
                position: absolute;
                left: 2.4rem;
                bottom:5rem;
                animation: balloon4 6s ease-in-out infinite;
            }
        }
    }
    @-webkit-keyframes balloon1 {
        0%, 100% {
            -webkit-transform: translateY(0) rotate(-6deg);
        }
        50% {
            -webkit-transform: translateY(-20px) rotate(8deg);
        }
    }
    @keyframes balloon2 {
        0%, 100% {
            transform: translateY(0) rotate(6deg);
        }
        50% {
            transform: translateY(-30px) rotate(-8deg);
        }
    }
    @keyframes balloon3 {
        0%, 100% {
            transform: translate(0, -10px) rotate(6eg);
        }
        50% {
            transform: translate(-20px, 30px) rotate(-8deg);
        }
    }
    @keyframes balloon4 {
        0%, 100% {
            transform: translate(10px, -10px) rotate(-8eg);
        }
        50% {
            transform: translate(-15px, 10px) rotate(10deg);
        }
    }
</style>
