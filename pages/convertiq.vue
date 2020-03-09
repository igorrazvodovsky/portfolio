<template>
  <div class="grid" :class="{ case: page !== 'index' }">
    <template v-for="index in 27">
      <span :key="index" class="grid__item grid__spacer"></span>
    </template>

    <h1 class="grid__item title">ConvertIQ</h1>
    <p class="grid__item description">
      In 2018, I joined ConvertIQ’s product team to design a tool to make, edit
      and analyze social media campaigns. The project became an opportunity to
      try out a more playful visual approach, as I wanted the app to be warm and
      approachable despite the complexity of the subject.
    </p>
    <p class="grid__item skills">UX & UI, a bit of identity</p>

    <span class="grid__item grid__spacer"></span>
    <span class="grid__item grid__spacer"></span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['page'])
}
</script>
