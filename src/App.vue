<template>
  <div id="wrap">
    <menu-page></menu-page>
    <router-view></router-view>

    <div id="footer">
      <footer-page></footer-page>
    </div>
  </div>
</template>

<script>
import FooterPage from '@/components/FooterPage.vue';
import MenuPage from '@/components/MenuPage.vue';

export default {
  components: {
    FooterPage,
    MenuPage,
  },
  setup() {

    return {

    };
  }
}
</script>


<style lang="css" scoped>
#footer {
  margin-top: 500px;
}
</style>