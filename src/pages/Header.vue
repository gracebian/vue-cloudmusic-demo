<template>
    <div id="header">
	    <div class="topbar">
	    	<span @click="tabRoute({name:'Menu'})">
	       		<i class="fa fa-bars fa-lg" aria-hidden="true"></i>
	       	</span>
	       	<span @click="tabRoute({name:'Music'})">
	       		<i class="fa fa-cloud fa-lg" aria-hidden="true"></i>
	       	</span>
	       	<span @click="tabRoute({name:'Search'})">
	       		<i class="fa fa-search fa-lg" aria-hidden="true"></i>
	       	</span>
	    </div>      	
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'app',
    // created(){
    //     //不用返回值时可以直接用commit
    //     this.$store.commit('setIsShow');
    // },
    // computed: {
    //     ...mapGetters([
    //         'isShow'
    //     ])
    // },
    methods: {
        tabRoute(path) {
            this.$router.push(path);
        }
    }
    // watch:{
    //     $route(to){
    //         console.log(to)
    //     }
    // }
}
</script>

<style lang='less'scoped>
@r: 7.5rem;
@cl: #fff;
.topbar {
	display: -webkit-box; /* Safari */ 
    display: box;
    display: -webkit-flex; /* Safari */
    display: flex;
    justify-content: space-between;
    background: red;
    span{
    	width: 30%;
		display: inline-block;
		padding: 0.04*@r;
		text-align: center;
		color: @cl;
    }
}

</style>