<template>
  <div class="container" :class="{ case: page !== 'index' }">
    <header>
      <div class="title">
        <nuxt-link class="d-block" to="/"
          >Igor <span v-if="page == 'index'">Razvodovsky</span></nuxt-link
        ><span v-if="page == 'index'" class="text--secondary"
          >User Experience&nbsp;Designer</span
        >
      </div>
      <small v-if="page !== 'index'" class="subtitle text--muted">
        Worked on
      </small>
    </header>
    <transition name="fade">
      <nuxt />
    </transition>
    <footer role="contentinfo">
      <small>
        <a href="#">&uarr; Back to top</a>
        <nuxt-link to="/">Home</nuxt-link>
        <span class="text--muted">•</span>
        <a href="mailto:igorrazvodovsky@gmail.com">Email</a>
        <a href="https://www.linkedin.com/in/igor-razvodovsky/">LinkedIn</a>
      </small>
      <small class="text--secondary copyright"
        >&copy;&nbsp;{{ new Date().getFullYear() }}<br
      /></small>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['page'])
}
</script>
