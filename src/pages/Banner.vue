<template>
    <div id="banner">
        <!-- 用vue-awesome-swiper组件做的轮播图 -->
        <swiper :options="swiperOption">
            <swiper-slide class='slide' v-for='item,index in banner'>
                <img :src="item.pic">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    // 引用的都是关于vue-awesome-swiper组件
import 'swiper/dist/css/swiper.css'
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import {mapGetters} from 'vuex'
export default {
    name: 'banner',
    data () {
        return {
            swiperOption: {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                autoplay: 3000,
                loop: true
            }
        }
    },
    created() {
        //(1)Action 通过 $store.dispatch 方法触发
        this.$store.dispatch('setBanner');
    },
    //(5)mapGetters工具函数会将store中的getter映射到局部计算属性中
    //必须通过computed属性使用state数据！否则state属性中的数据发生更改时不会反映在组件上！
    //使用对象扩展操作符把getters混入到computed中,用mapGetters方法映射
    computed:{        
        ...mapGetters([
            'banner'
        ])
    }
}
</script>
<style lang='less'scoped>
#banner{
    width: 100%;
    img{
        width: 100%;
    }
}
</style>