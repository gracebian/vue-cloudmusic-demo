<template>
	<div id="home">
        <v-header></v-header>
        <router-view></router-view>        
 	</div>
</template>

<script>
import Header from '@/pages/Header'

export default {
    name: 'home',
  	components:{
        'v-header': Header
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'scoped>

</style>
