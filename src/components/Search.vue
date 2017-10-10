<template>
    <div id="search">
        <div class="topbar">
            <span onclick="window.history.go(-1)">
                <i class="fa fa-angle-left fa-lg" aria-hidden="true"></i>
            </span>
            <input type="text" placeholder="音乐、视频、歌词、电台" v-model="query">
            <span v-show="query" @click="clear">
                <i class="fa fa-close" aria-hidden="true"></i>
            </span>
        </div>
        <div class="content">
            <div class="name">
                热门搜索
            </div>
            <ul class="hot">
                <li>不用去猜</li>
                <li>薛之谦</li>
                <li>安和桥</li>
                <li>老大</li>
                <li>陈奕迅</li>
                <li>Taylor Swift</li>
            </ul>
            <ul class="searchlist">
                <li>
                    <span class="hicon sicon">
                        <i class="fa fa-history fa-lg" aria-hidden="true"></i>
                    </span>
                    <div class="hlist">
                        <span>不用去猜</span>
                        <span class="sicon">
                            <i class="fa fa-times-circle-o fa-lg" aria-hidden="true"></i>
                        </span>
                    </div>
                </li>
                <li>
                    <span class="hicon">
                        <i class="fa fa-history fa-lg" aria-hidden="true"></i>
                    </span>
                    <div class="hlist">
                        <span>不用去猜</span>
                        <span>
                            <i class="fa fa-times-circle-o fa-lg" aria-hidden="true"></i>
                        </span>
                    </div>
                </li>
            </ul>
        </div>        
    </div>
</template>

<script>
export default {
    name: 'search',
    data(){
        return{
            query:''
        }
    },
    methods:{
        clear(){
            this.query = '';
        }
    },
    created(){
        this.$watch('query', (newQuery)=>{
            this.$emit('query',newQuery)
        });
    }
    
    // mounted(){
    //     var str = window.location.href;
    //     if(str.includes('/search')){
    //          this.$store.commit('updateIsShow')
    //     }
    // }  
    // created() {
    //     this.$store.commit('updateIsShow');//v-show隐藏导航条
    // },
    // beforeRouteLeave() {//路由的钩子函数
    //     this.$store.commit('setIsShow');//v-show显示导航条
    //     this.$router.push({'/home'})
    // },
}
</script>
<style lang='less'scoped>
@r: 7.5rem;
@cl: #fff;
.topbar{
    background: red;
    font-size: 0.06*@r;
    line-height: 0.08*@r;
    padding: 10px;
    color: @cl;
    position: relative;
    span:nth-of-type(1){
        display: inline-block;
        width: 10%;
        text-align: center;
    }
    input{
        width: 87%;
        border: none;
        background: none;
        outline: none;
        font-size: 0.04*@r;
        color: @cl;
        border-bottom: 1px solid rgba(255,255,255,.7);
    }
    span:nth-of-type(2){
        width: 10%;
        position: absolute;
        top: 0.03*@r;
        right: 0;
    }
}
input::-webkit-input-placeholder{
    color: @cl;
    font-size: 0.04*@r;
}
.content{
    .name{
        font-size: 0.03*@r;
        line-height: 0.04*@r;
        padding: 15px 5px 10px 10px;
        color: gray;
    }
    .hot{
        padding: 0 10px;
        li{
            display: inline-block;
            padding: 8px;
            font-size: 0.04*@r;
            line-height: 0.04*@r;
            border: 1px solid gray;
            border-radius: 0.035*@r;
            margin: 0 5px 7px;
        }       
    }
    .searchlist{
        margin-top: 0.05*@r;
        li{
            display: -webkit-box; /* Safari */ 
            display: box;
            display: -webkit-flex; /* Safari */
            display: flex;
            justify-content: space-between;
            .hicon{
                display: inline-block;
                width: 10%;
                text-align: center;
                padding: 6px;
            }
            .sicon{
                color: gray;
            }
            .hlist{
                width: 90%;
                display: inline-block;
                border-bottom: 1px solid gray;
                padding: 6px;
                overflow: hidden;
                span:nth-of-type(1){
                    float: left;
                }
                span:nth-of-type(2){
                    float: right;
                    padding-right: 5px;
                }
            }
        }                
    }
}
</style>

