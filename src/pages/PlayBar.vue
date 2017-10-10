<template>
<!-- 父级添加v-show,判断有歌名的时候去显示playbar -->
<div id="playbar" v-show="newDetails.name" >
	<div class="imglist">
	<!-- toTab()转到音乐详情页 -->
		<div @click="toTab()">
			<img :src="newDetails.pic">
			<div class="aboutSong">
				<p>{{newDetails.name}}</p>
				<p>{{newDetails.author}}</p>
			</div>
		</div>				
		<div class="control">
			<!-- 音频 -->
			<audio autoplay="true" :src="newDetails.url" ref="audio"></audio>			
			<span @click="toPlay()" class="playicon">
      			<i class="fa fa-play fa-lg" aria-hidden="true" v-if="isOff"></i>
      			<i class="fa fa-pause fa-lg" aria-hidden="true" v-else></i>
    		</span>
    		<span @click="toNextSong()" class="playicon">
      			<i class="fa fa-step-forward fa-lg" aria-hidden="true"></i>
    		</span>
    		<span @click="openBottomSheet()" class="playicon">
      			<i class="fa fa-bars fa-lg" aria-hidden="true"></i>
    		</span>
    		<mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet" class="fsheet">
   	 			<mu-list @itemClick="closeBottomSheet">
			    <mu-sub-header>
			        <span>播放列表({{playlistDetail && playlistDetail.tracks.length}})</span>
			        <span>收藏</span>
			        <span>清空</span>
			    </mu-sub-header>
			    <div class="fscroller">
			    	<scroller class="flist" :bouncing="false">
					    <ul class="playlist" v-if="playlistDetail">
					    	<li @click="chooseItem(item)" v-for="item,index in playlistDetail.tracks">
					    		<div>
					    			<span :style="{color: item.id == newDetails.id ? 'red' : ''}">{{item.name}}</span> - <span>{{item.ar[0].name}}</span>
					    		</div>		
					    		<span>
					    			<i class="fa fa-times fa-lg" aria-hidden="true"></i>
					    		</span>
					    	</li>
					    </ul>
					</scroller>
			    </div>			    
			    </mu-list>
		  	</mu-bottom-sheet>
		</div>
	</div>	
	<mu-linear-progress mode="determinate" :value="value" color="red"/>
</div>
</template>
<script>
import {mapGetters} from 'vuex'
import Playdetail from '@/components/Playdetail'
export default {
	name: 'playbar',
  	data () {
	    return {
	      	value: 0,
	      	bottomSheet: false,
	      	isOff:true
	    }
  	},
  	mounted() { 
  		//要在mounted时才获取到dom元素		
		// $refs获取DOM元素audio
		var audio = this.$refs.audio;
		var _this = this;
		//用播放器的事件自身去控制播放&暂停图标(重点)
		audio.onplaying = function() {//正在播放
			_this.isOff = false;
		}
		audio.onpause = function() {//暂停
			_this.isOff = true;
		}
		//进度条
		this.timer = setInterval(() => {  				
			var target = audio.duration; 		
			var now = audio.currentTime;
			var num = now/target*100;	
	      	this.value = num;
	      	// console.log(this.value)
	      	if (this.value > 100) {//实例的定时器
	      		clearInterval(_this.timer);
	      		this.$store.dispatch('setNextSong');
	      	}
	    },1000);
  	},
  	beforeDestroy () {
    	clearInterval(this.timer)
  	},
  	methods:{
  		//根据id去请求歌曲的src
  		chooseItem(item) {
  			// console.log(item)  			
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
                // console.log(result)
                this.$store.commit('getResult',result)
            })
  		},
  		closeBottomSheet () {
		    this.bottomSheet = false;
		},
		openBottomSheet () {
		    this.bottomSheet = true;
		},
		toPlay(){
			var audio = this.$refs.audio;
			if(audio.paused){
	    		audio.play();
	    		// console.log(audio.currentTime)
	    	}else{
	    		audio.pause();
	    	}
		},
		toNextSong(){
			//点击播放下一首的思路:点击下一首按钮，先加载到播放列表里面，再从播放列表里面找当前播放的下一首
			this.$store.dispatch('setNextSong');
			//怎么标记当前播放的index
			// console.log(this.$store.state.playlistDetail.tracks)
			// let nowIndex = this.$store.state.nowPlayIndex; 
			// nowIndex++;
			// // if(nowIndex >= this.$store.state.playlistDetail.tracks.length){
			// // 	nowIndex = 0;
			// // }
		},
		toTab(){
			this.$router.push({name:'Playdetail'});
		}
  	},
    created() {
      	let id = this.$route.params.id;
        this.$store.dispatch('setPlaylistDetail',id);
        // console.log(this.$route.params.id)
    },
    computed:{
    	...mapGetters([
            'playlistDetail',
            'newDetails'
        ])
    }
    
}
</script>
<style lang='less'scoped>
@r:7.5rem;
#playbar{
	width: 100%;
	height: 0.2*@r;
	position: fixed;
	bottom: 0;
	left: 0;
	background: rgba(255,255,255,1);
	.imglist{
		overflow: hidden;
		padding: 5px;
		img{
			width: 0.15*@r;
			height: 0.15*@r;
			float: left;
			margin-right: 0.03*@r;
		}
		.aboutSong{
			float: left;
			width: 0.3*@r;//不同屏幕大小的字体一样(布局会有问题),怎么变成不一样？？？
			
		}
		.control{
			float: right;
			.playicon{
				padding: 10px;
				line-height: 0.15*@r;
			}
		}
	}	
}
.aboutSong p:nth-of-type(1){
	font-size: 0.04*@r;
	line-height: 0.085*@r;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.aboutSong p:nth-of-type(2){
	font-size: 0.035*@r;
	color: gray;
}
.mu-sub-header{
	border-bottom: 1px solid #bbb;
	display: -webkit-box; /* Safari */ 
    display: box;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
}
.mu-sub-header span{
	display: inline-block;
	width: 40%;
}
.mu-sub-header span:nth-of-type(2),
.mu-sub-header span:nth-of-type(3){
	width: 30%;
}
.playlist li{
	padding: 0.03*@r 0.03*@r;
	border-bottom: 1px solid #bbb;
	overflow: hidden;
	display: -webkit-box; /* Safari */ 
    display: box;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
}
.fscroller{
	position: relative;
	height: 0.8*@r;
}
.fscroller .flist{
	position: absolute;
	top: 0;
}
.playlist li div{
	float: left;
	width: 80%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow:ellipsis;
}
.playlist li span:nth-of-type(1){
	font-size: 0.04*@r;
	// line-height: 0.04*@r;
}
.playlist li span:nth-of-type(2){
	font-size: 0.03*@r;
	color: gray;
}
.playlist li span:nth-of-type(3){
	width: 8%;
	float: right;
	color: gray;
}
</style>