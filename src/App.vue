<template>
  <div id="wrap">
    <div id="menu">
      <menu-page></menu-page>
    </div>
    <div id="view">
      <router-view></router-view>
    </div>
    <div id="footer">
      <footer-page></footer-page>
    </div>
  </div>
</template>

<script>
import FooterPage from '@/components/FooterPage.vue';
import MenuPage from '@/components/MenuPage.vue';

export default {
  components:{
    FooterPage, //<footer-page>
      MenuPage,
    },
  setup () {

    return {
    };
  }
}
</script>


<style lang="css" scoped>

*{
  margin:0;
  padding:0;
}

#wrap{
  /* position:relative; */
  /* height:auto; */
}

#menu{
  position:fixed;
  /* left:50%;
  margin-left:-782px;
  z-index:2; */
}

#view{
  position:absolute;
  top:50px;
  /* left:50%;
  margin-left:-782px; */
}

#footer{

}
</style>