<template>
  <div class="grid home">
    <!-- <figure class="fig fig--me">
      <img src="images/me.png" />
    </figure> -->

    <h1 class="definition">
      Friendly designer creating clear, robust, consistent, elegant systems that
      avoid redundancy. Currently working at&nbsp;<a
        href="https://home.kuehne-nagel.com/"
        >Kuehne&nbsp;+&nbsp;Nagel</a
      >.
      <!-- <a class="text--secondary" href>More&nbsp;→</a> -->
    </h1>
    <img class="recent" src="~/assets/recent.png" alt="Recent work" />
    <!-- AUX -->
    <figure class="fig fig--aux">
      <img src="~/assets/aux.png" />
      <!-- <iframe
        style="border: none;"
        width="100%"
        height="300"
        src=""
        allowfullscreen
      ></iframe> -->
      <img class="inprogress" src="~/assets/inprogress.png" />
    </figure>
    <div class="project-description project-description--aux text--muted">
      <h2 class="mb-1">
        <span class="text--muted">Dreaming up</span> a new way to
        listen&nbsp;a&nbsp;book
      </h2>
    </div>

    <!-- CONVERTIQ -->
    <nuxt-link to="/convertiq" class="fig fig--convertiq">
      <img src="~/assets/convertiq.png" />
    </nuxt-link>
    <div class="project-description project-description--convertiq">
      <h2 class="mb-1">
        <span class="text--muted">Simplifying</span>
        social media campaign&nbsp;management
      </h2>
      <nuxt-link class="d-block" to="/convertiq">
        View project &rarr;
      </nuxt-link>
    </div>

    <!-- JUKEBOX -->
    <div class="project-description project-description--jukebox">
      <h2 class="mb-1">
        <span class="text--muted">Thinking about</span>
        turning Spotify into&nbsp;Jukebox
      </h2>
      <p class="mb-1">
        A concept investigating the possibility of playing music in public
        places using streaming&nbsp;services.
      </p>
      <a href="">Read on Medium &rarr;</a>
    </div>

    <figure class="fig fig--jukebox">
      <jukebox-img />
    </figure>

    <!-- DAL -->
    <div class="project-description project-description--dal">
      <h2 class="mb-1">
        <span class="text--muted d-block">Experimenting with</span>
        medium for a recipe
      </h2>
      <p class="mb-1">
        A side-project with the goal to create a product that does one job
        incredibly well and learn a couple of new things along the&nbsp;way.
      </p>
      <a
        class="d-block mb-1"
        href="https://medium.com/@igorrazvodovsky/searching-for-a-medium-for-a-recipe-c707ccfab23a"
        >Read the case study &rarr;</a
      >
      <a
        class="d-block"
        href="https://assistant.google.com/services/a/uid/0000009f815d8acf"
        >Try with Google Assistant &rarr;</a
      >
    </div>

    <figure class="fig fig--dal">
      <div class="dal__phone">
        <dal-phone />
        <img class="dal__phone__screen" src="~/assets/dal__screen.png" />
      </div>
      <div class="dal__speaker">
        <img class="dal__speaker__speaker" src="~/assets/dal__speaker.png" />
        <img
          class="dal__speaker__sound"
          src="~/assets/dal__speaker__sounds.gif"
        />
        <img
          class="dal__speaker__shadow"
          src="~/assets/dal__speaker__shadow.png"
        />
      </div>
    </figure>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import DalOnion from '~/assets/dal__onion.svg?inline'
// import DalGarlic from '~/assets/dal__garlic.svg?inline'
// import DalGinger from '~/assets/dal__ginger.svg?inline'
// import DalKnife from '~/assets/dal__knife.svg?inline'
// import DalChili from '~/assets/dal__chili.svg?inline'
// import DalPieces from '~/assets/dal__pieces.svg?inline'
import DalPhone from '~/assets/dal__phone.svg?inline'
// import Border from '~/assets/border.svg?inline'
import JukeboxImg from '~/assets/jukebox__img.svg?inline'

export default {
  components: {
    // DalOnion,
    // DalGarlic,
    // DalGinger,
    // DalKnife,
    // DalChili,
    // DalPieces,
    DalPhone,
    // Border,
    JukeboxImg
  },
  computed: mapState(['page']),
  head() {
    return {
      title: 'Igor Razvodovsky',
      bodyAttrs: {
        class: 'home'
      }
    }
  }
}
</script>
