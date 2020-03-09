<template>
  <div class="grid home">
    <!-- <figure class="fig fig--me">
      <img src="images/me.png" />
    </figure> -->

    <div class="definition">
      <h1>
        Friendly designer creating clear, robust, consistent, elegant systems
        that avoid redundancy. Currently working at
        <a href="https://home.kuehne-nagel.com/">Kuehne + Nagel</a>.
        <!-- <a class="text--secondary" href>More&nbsp;→</a> -->
      </h1>
      <img class="prev" src="~/assets/recent.png" alt="Recent work" />
    </div>

    <!-- AUX -->
    <figure class="fig fig--aux">
      <img src="~/assets/aux.png" />
      <img class="inprogress" src="~/assets/inprogress.png" />
    </figure>
    <div class="project-description project-description--aux text--muted">
      <h3>
        <span class="text--muted">Dreaming up</span> a new way to
        listen&nbsp;a&nbsp;book
      </h3>
    </div>

    <!-- CONVERTIQ -->
    <nuxt-link to="/convertiq" class="fig fig--convertiq">
      <img src="~/assets/convertiq.png" />
    </nuxt-link>
    <div class="project-description project-description--convertiq">
      <h3>
        <nuxt-link to="/convertiq">
          <span class="text--muted">Simplifying</span>
          social media campaign&nbsp;management
        </nuxt-link>
      </h3>
    </div>

    <!-- JUKEBOX -->
    <div class="project-description project-description--jukebox">
      <h3>
        <span class="text--muted">Thinking about</span>
        turning Spotify into&nbsp;Jukebox
      </h3>
      <p>
        A concept investigating the possibility of playing music in public
        places using streaming&nbsp;services.
      </p>
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
