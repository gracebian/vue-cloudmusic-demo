<template>
    <div id="app">       
        <router-view></router-view>
        <v-playbar></v-playbar>
        <!-- <img src="/static/img/loading.gif" class="loading" v-show='isShow'> -->
    </div>
</template>

<script>
import Playbar from '@/pages/Playbar'
import {mapGetters} from 'vuex'
export default {
    name: 'app',
    data(){
        return {
            showPlay: true
        }
    },
    components:{
        'v-playbar': Playbar
    },
    mounted(){
        //不用返回值时可以直接用commit
        this.$store.commit('setIsShow');
    },
    computed: {
        ...mapGetters([
            'isShow'
        ])
    }
    //监听路由:切换最上面(红色)的导航条是否隐藏(重点问题已解决)
    // watch:{
    //     $route(to){
    //         // console.log(to)
    //         if(to.path.includes('/search')||to.path.includes('/playlist')){
    //             this.$store.commit('updateIsShow');//v-show隐藏导航条
    //         }
    //         if(to.path.includes('/home/music')){
    //             this.$store.commit('setIsShow');//显示导航条
    //         }
    //     }
    // }
    // created() {
    //     this.$store.commit('setIsShow');//显示导航条
    // }
}
</script>
<style lang='less' scpoed>
#app {
    position: relative;
    height: 100%;
}
.loading{
    position: fixed;
    z-index: 9;
    width: 100%;
    height: 100%;
}
</style>

