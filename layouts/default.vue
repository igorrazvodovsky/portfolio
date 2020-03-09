<template>
  <div class="paralax">
    <div class="grid" :class="{ case: page !== 'index' }">
      <!--FILLING-->
      <!--1-->
      <span class="grid__item grid__spacer"></span>
      <span class="grid__item grid__spacer"></span>
      <span class="grid__item grid__spacer"></span>
      <span class="grid__item grid__spacer"></span>
      <span class="grid__item grid__spacer"></span>
      <span class="grid__item grid__spacer"></span>

      <!-- HEADER -->
      <div class="grid__item header header__name">
        <div><span>Igor Razvodovsky</span>, User Experience Designer</div>
      </div>
      <ul class="grid__item header header__links">
        <li v-if="page == 'index'">
          <a href="https://www.linkedin.com/in/igor-razvodovsky-231909/"
            >LinkedIn</a
          >
        </li>
      </ul>
      <ul class="grid__item header header__contacts">
        <li v-if="page == 'index'">
          <a href="mailto:igorrazvodovsky@gmail.com">Email</a>
        </li>
      </ul>
    </div>
    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['page'])
}
</script>
