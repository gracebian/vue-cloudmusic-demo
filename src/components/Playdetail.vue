<template>
<!--   v-model="showPlay"-->
    <div id="playdetail">
	       <div class="header">
                <span onclick="window.history.go(-1)"><i class="fa fa-angle-left fa-lg" aria-hidden="true"></i></span>
                <span>思美人</span>                  
          </div>
          详情页
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'playdetail',
   	props: ['value'],
    methods: {
       
    },
    mounted(){
    	this.$emit('input',false); 
    }
    
}
</script>

<style lang='less'scoped>
@r: 7.5rem;
@cl: #fff;
#playdetail{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
}
</style>