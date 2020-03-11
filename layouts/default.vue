<template>
  <div class="container" :class="{ case: page !== 'index' }">
    <header>
      <div class="title text--secondary">
        <nuxt-link to="/">Igor Razvodovsky</nuxt-link>
        <span v-if="page == 'index'">, User Experience&nbsp;Designer</span>
      </div>
      <div v-if="page !== 'index'" class="subtitle text--secondary">Work</div>
      <!-- <a href>Email</a> -->
    </header>
    <transition name="fade">
      <nuxt />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['page'])
}
</script>
