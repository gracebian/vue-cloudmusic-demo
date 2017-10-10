<template>
    <div id="music">       
        <scroller class="fscroller" :bouncing="false">
            <v-banner></v-banner>
            <v-personalized></v-personalized>
            <div class="padding"></div>
        </scroller>
    </div>
</template>

<script>
import Banner from '@/pages/Banner'
import Personalized from '@/pages/Personalized'


export default {
    name: 'music',
    components:{
        'v-banner': Banner,
        'v-personalized': Personalized
    }
}
</script>
<style lang='less'scoped>
@r:7.5rem;
.fscroller{
    margin-top: 0.26*@r;
}
.padding{
    height: 200px;
}

</style>