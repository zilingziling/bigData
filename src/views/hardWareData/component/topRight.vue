<template>
    <div class="topRight">
        <WarningNum />
        <WarningType />
    </div>
</template>
<script lang="ts">
    import {Vue,Component} from 'vue-property-decorator'
    import WarningNum from './warningNum.vue'
    import WarningType from './warningType.vue'
    @Component({
        components:{
            WarningNum,WarningType
        }
    })
    export default class TopRight extends Vue{

    }
</script>
<style lang="scss" scoped>
    .topRight{
        display: grid;
        grid-template-columns: 58% 40%;
        grid-column-gap: 2%;
        padding: 3rem 2rem 0;
    }
</style>
