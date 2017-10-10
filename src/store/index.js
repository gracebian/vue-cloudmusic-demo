import Vue from 'vue'
import Vuex from 'Vuex'
//需要显式的use一下vuex
Vue.use(Vuex)

//导出store
export default new Vuex.Store({
	state: {
		//存储数据
		//最上面的导航条,loading图
		isShow : false,
		banner: [],
		//推荐歌单
		personalized: [],
		//歌单详情
		playlistDetail: {
			name:'',
			creator:{
				
					coverImgUrl: '',
					avatarUrl: '',
					nickname:''
			},
			tracks:[]
		},				
		newDetails:{
			id: '',
			name:'',
			author:'',
			pic:'',
			url: ''
		},//当前数组播放的是第几个
		nowPlayIndex:-1
	},
	getters: {
		//(4)得到最新的数据再返回		
		banner:(state) => state.banner,
		personalized:(state) => state.personalized,
		playlistDetail: (state) => state.playlistDetail,
		isShow: (state) => state.isShow,
		newDetails: (state)  => state.newDetails
	},
	mutations: {
		//(3)把请求返回的数据赋值给state
		setBanner(state,data){
			state.banner = data;
		},
		setPersonalized(state,data){
			state.personalized = data;
		},
		setPlaylistDetail(state,data){
			state.playlistDetail = data;
		},
		getResult(state,data){
			// console.log(data)
			state.newDetails = data;
		},
		setIsShow(state) {
			state.isShow = true;
		},
		updateIsShow(state){
			state.isShow = false;
		}
		
	},
	actions:{
		//(2)发出请求,commit提交给mutations
		setBanner({commit}){
			//请求之前加loading
			commit('setIsShow');
			fetch('/api/banner')
            .then( response => {
                return response.json();
            })
            .then( data => {
                commit('setBanner',data.banners);
                commit('updateIsShow');
            })
		},
		setPersonalized({commit}){
			fetch('/api/personalized')
            .then( response => {
                return response.json();
            })
            .then( data => {
                commit('setPersonalized',data.result);
            })
		},
		setPlaylistDetail({commit},id){
			commit('setIsShow');
			fetch(`/api/playlist/detail?id=${id}`)
			.then( response => {
				return response.json();
			})
			.then( data =>{
				// console.log(data)
				commit('setPlaylistDetail',data.playlist);
				commit('updateIsShow');
			})
		},
		setNextSong({commit,state}) {
			let nextsong = {};
			// console.log(state.playlistDetail)
			state.playlistDetail.tracks.forEach((item, index) => {
				if (item.id == state.newDetails.id) {
					//console.log(state.playlistDetail.tracks[index+1])
					nextsong = state.playlistDetail.tracks[index+1];
				}
			});
			// console.log(nextsong)	
			// console.log(state.newDetails)
			// 点击下一首的时候,要先发送请求，得到歌曲的src,再通过audio自动播放
			if (nextsong) {
				fetch('/api/music/url?id='+nextsong.id)
				.then(response => {
	                return response.json();
	            }).then(data=>{	            	
	            	// console.log(state)
	                state.newDetails.id =  data.data[0].id;
					state.newDetails.name =  nextsong.name;
					state.newDetails.author =  nextsong.ar[0].name;
					state.newDetails.pic =  nextsong.al.picUrl;
					state.newDetails.url =  data.data[0].url;
					commit('getResult',state.newDetails);
					// console.log(this.$store)	                
	            })
			}			
		}			
	}
});

