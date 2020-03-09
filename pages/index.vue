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
        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FAZ12HuoJbDaiC9wVDzjilD%2FPortfolio-alt-draft%3Fnode-id%3D0%253A1"
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
// import DalPhone from '~/assets/dal__phone.svg?inline'
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
    // DalPhone,
    // Border,
    JukeboxImg
  },
  computed: mapState(['page'])
}
</script>
