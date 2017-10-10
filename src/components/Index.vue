<template>
    <div id="index">
        <mu-tabs :value="activeTab" @change="handleTabChange" class="topbar">
            <mu-tab value="tab1" title="音乐" @click="tabRoute({name:'Music'})"/>
            <mu-tab value="tab2" title="视频" @click="tabRoute({name:'Video'})"/>
            <mu-tab value="tab3" title="电台" @click="tabRoute({name:'Radio'})"/>
        </mu-tabs>         
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
            activeTab: 'tab1'
        }
      },
      methods: {
        handleTabChange (val) {
            this.activeTab = val
        },
        tabRoute(path) {
            this.$router.push(path);
        }
  }
}
</script>
<style lang='less'scoped>
@bg: #000;
.topbar{
    background: @bg;
}
</style>