<template>
  <div class="container" :class="{ case: page !== 'index' }">
    <header>
      <div>Igor Razvodovsky, User Experience Designer</div>
      <!-- <a href>Email</a> -->
    </header>
    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['page'])
}
</script>
