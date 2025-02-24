<template>
  <header>
    <div>
      <router-link to="/">Igors {{ $route.name }}<span v-if="this.$route.path == '/'">Razvodovskis</span></router-link><br>
      <!-- <span v-if="this.$route.path == '/'">User Experience Designer</span> -->
    </div>
    <span v-if="this.$route.path !== '/'">
      worked on
    </span>
  </header>
  <main>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
  </main>
    <footer role="contentinfo">
      <small>
        <!-- TODO: &uarr;  -->
        <a href="#">Back to top</a>
        <router-link to="/">Home</router-link>
        <span class="text--muted">•</span>
        <a href="mailto:igorrazvodovsky@gmail.com" rel="external">Email</a>
        <a href="https://www.linkedin.com/in/igor-razvodovsky/" rel="external"
          >LinkedIn</a
        >
        <a href="https://dribbble.com/igorraz" rel="external">Dribbble</a>
      </small>
      <small>&copy;&nbsp;{{ new Date().getFullYear() }}<br
      /></small>
    </footer>
</template>

<script>

export default {
  computed: {
    currentPage() {
      return this.$route.name;
    }
  },
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title || 'Igor Razvodovsky'
    }
  }
}
</script>