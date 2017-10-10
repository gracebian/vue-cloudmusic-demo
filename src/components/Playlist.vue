<template>
    <div id="playlist">
        <img src="/static/img/timg.gif" class="loading" v-show='isShow'>       
        <div class="content">
            <section class="ptop">
                <div class="pheader">
                    <span onclick="window.history.go(-1)"><i class="fa fa-angle-left fa-lg" aria-hidden="true"></i></span>
                    <span>歌单</span>
                </div>
            </section>           
            <!-- :style="{backgroundImage:`url(${playlistDetail.creator.backgroundUrl})`}" -->
            <div class="pcontent" v-if="playlistDetail">
                <div class="pic">
                    <div>
                        <img :src="playlistDetail.coverImgUrl" class="bg">
                        <img :src="playlistDetail.coverImgUrl" class="bg1">
                    </div>    
                </div>
                <div class="img" >
                    <img :src="playlistDetail.coverImgUrl">
                    <span class="playCount"><i class="fa fa-headphones ficon" aria-hidden="true"></i>{{playlistDetail.playCount | format}}</span>
                </div>           
                <div class="rcontent">
                    <p>{{playlistDetail.name}}</p>
                    <div>
                        <img :src="playlistDetail.creator.avatarUrl" class="avatar">
                        <span>{{playlistDetail.creator.nickname}}</span>
                    </div>
                    <!-- <mu-list-item title="" disabled>
                        <mu-avatar slot="left" :src="playlistDetail.creator.avatarUrl" class="nickname"/>{{playlistDetail.creator.nickname}}
                    </mu-list-item> -->
                </div>
            </div>
            <scroller class="scroller" :bouncing="false">
                <!-- 播放列表 -->
                <div class="lists" v-if="playlistDetail">
                    <div class="listsheader">
                        <span><i class="fa fa-play-circle-o fa-lg" aria-hidden="true"></i></span>
                        <span>播放全部</span>
                        <span>(共{{playlistDetail.tracks.length}}首)</span>
                    </div>
                    <ul class="listscontent">
                        <li v-for="item,index in playlistDetail.tracks"  @click="toPlay(item,index)">
                            <span class="num">{{index+1}}</span>
                            <div>
                                <!--当前播放的显示红色 -->
                                <p :style="{color: item.id==newDetails.id ? 'red' : ''}">{{item.name}}</p>
                                <p>{{item.ar[0].name}} - {{item.al.name}}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="padding"></div>      
                </div>
            </scroller>
        </div>                  
    </div>
</template>

<script>
//过滤器
import format from '@/filters/format';

import {mapGetters} from 'vuex'
export default {
    name: 'playlist',
    methods: {
        toPlay(item,index){
            this.$store.state.nowPlayIndex = index;//得到当前播放的index
            // console.log(this.$store.state.nowPlayIndex)
            fetch('/api/music/url?id='+item.id).then(res=>{
                return res.json()
            }).then(data=>{
                // console.log(data)
                var result = {};
                result.id = item.id;
                result.name = item.name;
                result.author = item.ar[0].name;
                result.pic = item.al.picUrl;
                result.url = data.data[0].url;
                // console.log(item)
                // console.log(result)
                this.$store.commit('getResult',result)
            })
        }
    },
    filters: {
        format
    },
    created() {
        let id = this.$route.params.id;
        this.$store.dispatch('setPlaylistDetail',id);
        // this.$store.commit('updateIsShow');//v-show隐藏导航条
        // console.log(this.$route.params.id)
    },
    // beforeRouteLeave() {//路由的钩子函数
    //     this.$store.commit('setIsShow');//v-show显示导航条
    // },
    computed: {
        ...mapGetters([
            'playlistDetail',
            'newDetails',
            'isShow'
        ])
    },
    mounted(){
        //不用返回值时可以直接用commit
        this.$store.commit('setIsShow');
    }
}
</script>

<style lang='less'scoped>
@r:7.5rem;
@cl:#fff;
.padding{
    height: 300px;
}
#playlist{
    height: 100%;
    .loading{
        position: fixed;
        z-index: 9;
        width: 100%;
        height: 100%;
    }
}
.content{
    position: relative;
    height: 100%;//怎么写？
}
.content .scroller{
    position: absolute;
    top: 0.65*@r;
    left: 0;
}
.ptop{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;   
    z-index: 2;
    background: rgba(255,255,255,.2);
}
.pheader{
    color: #fff;
    font-size: 0.06*@r;
    line-height: 0.07*@r;
    padding: 0.04*@r;
}
.pheader span:nth-of-type(1){
    margin-right: 10px;
}
.pcontent{     
    position: relative;
    height: 0.65*@r;
    .pic{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 0.65*@r;
        overflow: hidden;
        div{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 0.65*@r;
            overflow: hidden;
            -webkit-filter: blur(10px); /* Chrome, Safari, Opera */  
            filter: blur(10px); 
        }
        .bg{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 0.65*@r;
            -webkit-filter: blur(25px); /* Chrome, Safari, Opera */  
            filter: blur(25px); 
        }
        .bg1{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            height: 0.65*@r;
            -webkit-filter: blur(10px); /* Chrome, Safari, Opera */  
            filter: blur(10px); 
            transform: scale(4);
        }
    }   
    .img{
        width: 35%;
        position: absolute;
        top: 0.2*@r;
        left: 10px;
        z-index: 3;
        img{
            width: 100%;
        }
        .playCount{
            position: absolute;
            right: 0.02*@r;
            top: 3px;
            color: @cl;
            font-size: 0.04*@r;
        }
    }
    .rcontent{
        position: absolute;
        top: 0.2*@r;
        right: 10px;
        width: 60%;
        color: @cl;
        z-index: 3;
        p{
            font-size: 0.045*@r;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;//溢出用省略号显示
            display:-webkit-box;    
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2; //2行溢出省略号显示
            padding: 0.04*@r 0 0.04*@r 0.06*@r;
        }
        .avatar{
            width: 20%;
            border-radius: 50%;
            position: absolute;
            top: 70px;
            left: 22px;
        }
        span{
            width: 60%;
            display: inline-block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: absolute;
            top: 0.22*@r;
            left: 0.22*@r;
        }
    }
}
.listscontent{
    // padding: 10px 0;
}
.lists{
    background: rgba(186,186,186,.1);
}
.listsheader{
    font-size: 0.05*@r;
    line-height: 0.07*@r;
    padding: 10px;
    border-bottom: 1px solid #bbb;
    span:nth-of-type(1){
        margin-right: 5px;
    }
}
.listscontent li{
    display: -webkit-box; /* Safari */ 
    display: box;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
}
.listscontent span,
.listscontent div{
    display: inline-block;
}
.listscontent .num{
    width: 15%;
    font-size: 0.05*@r;
    padding: 15px 10px;
    text-align: center;
    color: gray;
}
.listscontent div{
    width: 85%;
    padding: 10px 10px 6px 0 ;
    border-bottom: 1px solid #bbb;
}
.listscontent div p{
    width: 85%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.listscontent div p:nth-of-type(1){
    font-size: 16px;
    line-height: 20px;
    span{
        width: 100%;
    }
}
.listscontent div p:nth-of-type(2){
    font-size: 12px;
    line-height: 20px;
    color: gray;
}
</style>