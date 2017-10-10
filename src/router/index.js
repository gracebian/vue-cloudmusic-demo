import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Music from '@/components/Music'
import Video from '@/components/Video'
import Radio from '@/components/Radio'
import Playlist from '@/components/Playlist'
import Menu from '@/components/Menu'
import Search from '@/components/Search'
import Index from '@/components/Index'
import Playdetail from '@/components/Playdetail'

Vue.use(Router)
// 配置路由path和component,实例化路由对象
export default new Router({
	//去掉#,美化地址栏：mode: 'history'
	mode: 'history',
  	routes: [
	   {
		   	path: '/',
		   	name: 'Home',
		   	component: Home,
		   	children: [
		   		{
			   		path: '/menu',
			   		name: 'Menu',
			   		component: Menu
		   		},
		   		{
		   			path: '/',
		   			name: 'Subnav',
		   			component: Index,
		   			children: [
		   				{
				   			path: '/',
				   			name: 'Music',
				   			component: Music
				   		},
				   		{
				   			path: 'video',
				   			name: 'Video',
				   			component: Video
				   		},
				   		{
				   			path: 'radio',
				   			name: 'Radio',
				   			component: Radio
				   		}
		   			]
		   		}
		   	]
	   },
	   {
	   		path: '/playlist/:id',//动态路由
	   		name: 'Playlist',
	   		component: Playlist
	   },	   
	   {
	   		path: '/search',
	   		name: 'Search',
	   		component: Search
	   },	   
	   {
	   		path: '/playdetail',
	   		name: 'Playdetail',
	   		component: Playdetail
	   }

	]
})

