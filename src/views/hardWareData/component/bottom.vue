<template>
    <div class="bottom">
        <SingleDevice v-for="item in deviceData"
                      :name="item.name"
                      :status="item.status"
                      :id="item.id"
        ></SingleDevice>
    </div>
</template>
<script lang="ts">
    import { Vue, Component, Prop } from "vue-property-decorator";
    import SingleDevice from '../component/singleDevice.vue'
    @Component({
        components:{
            SingleDevice
        }
    })
    export default class HardWareBottom extends Vue{
        deviceData: Array<any> = [
            {
                name:'计算机',
                status:'使用中95/100台',
                id:1
            },
            {
                name:'计算机',
                status:'使用中95/100台',
                id:2
            },
            {
                name:'计算机',
                status:'使用中95/100台',
                id:3
            },
            {
                name:'计算机',
                status:'使用中95/100台',
                id:4
            },
            {
                name:'计算机',
                status:'使用中95/100台',
                id:5
            },
            {
                name:'计算机',
                status:'使用中95/100台',
                id:6
            }
        ];
    }
</script>
<style lang="scss" scoped>
    .bottom{
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        height: 9rem;
        grid-column-gap: .8rem;

    }
</style>
