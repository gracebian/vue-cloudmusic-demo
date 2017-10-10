<template>
<!-- 推荐歌单 -->
    <div id="personalized">
        <!-- {{personalized}} -->
        <mu-sub-header class="fnav">
            <span><i class="fa fa-calendar-check-o fa-lg" aria-hidden="true"></i></span>
            <router-link to='/home/list'>推荐歌单</router-link>
        </mu-sub-header>
        <div class="fsongLists" >
        <!-- @click="detail(item.id)" -->
            <div v-for="item, index in personalized" :key="index" class="fsongList" >
            <!-- v-bind 用""后里面再用模板字符串,不能直接用模板字符串 -->
                <router-link :to="`/playlist/${item.id}`" tag="div">
                    <img :src="item.picUrl"/>
                    <p class="name">{{item.name}}</p>
                    <span class="playCount"><i class="fa fa-headphones ficon" aria-hidden="true"></i>{{item.playCount | format}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
//过滤器
import format from '@/filters/format'
export default {
    name: 'personalized',
    created() {
        //(1)Action 通过 $store.dispatch 方法触发
        this.$store.dispatch('setPersonalized');
    },
    //(5)mapGetters工具函数会将store中的getter映射到局部计算属性中
    //必须通过computed属性使用state数据！否则state属性中的数据发生更改时不会反映在组件上！
    //使用对象扩展操作符把getters混入到computed中,用mapGetters方法映射
    computed:{        
        ...mapGetters([
            'personalized'
        ])
    },
    filters: {
        format
    },
    // methods:{
    //     detail(id){
    //         this.$router.push({name:'Playlist',params:{id:`${id}`}})
    //     }
    // }
}
</script>
<style lang='less'scoped>
@r:7.5rem;
@cl: #fff;
@cl1: #000;
#personalized{
    width: 100%;
    .fnav{
        line-height: 0.1*@r;
        padding-left: 0.02*@r;
        span{
            color: red;
        }
        a{
            color: @cl1;
        }
    }
    .fsongLists{
        display: -webkit-box; /* Safari */ 
        display: box;
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .fsongList{
            width: 33%;
            position: relative;
            img{
                width: 100%;
            }
            .name{
                overflow: hidden;
                text-overflow: ellipsis;//溢出用省略号显示
                display:-webkit-box;    
                -webkit-box-orient:vertical;
                -webkit-line-clamp:2; //2行溢出省略号显示
                margin: 0 0  0.04*@r 6px;
                font-size: 12px;
                line-height: 16px;
                height: 32px;
            }
            span{
                position: absolute;
                top: 3px;
                right: 5px;
                color: @cl;
                font-size: 10px;
            }
        }
        
    }
}
</style>