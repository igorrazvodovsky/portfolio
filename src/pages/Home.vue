<template>
  <h1>
    User experience designer. Currently working on industrial manufacturing sales automation at <a href="https://www.tacton.com/">Tacton</a>.
    <!-- Before that... -->
    <!-- clear; robust; ... -->
  </h1>
  <section id="work">
    <!-- Recent -->
    <!-- <h2>Some work</h2> -->
    <article id="pattern-playground">
      <figure>
        <connected-dots></connected-dots>
      </figure>
      <h3><a href="https://igors-pattern-playground.netlify.app/">Pattern playground</a></h3>
      <p>Experiments in various approaches to organizing and composing design systems.</p>

    </article>
    <article id="aloud">

        <figure>
          <img
            decoding="async"
            width="450"
            height="450"
            :src="imgAloud"
            alt="Aloud project preview"
          />
        </figure>
      <h3><a href="https://github.com/igorrazvodovsky/aloud">Making an audiobook player</a></h3>
      <p>Personal project and playground for learning&nbsp;things.</p>
    </article>
    <article id="formbuilder">
        <figure>
          <img
            decoding="async"
            width="800"
            height="410"
            src="../assets/images/home/formbuilder.png"
            alt="Form builder project preview"
          />
        </figure>
      <h3><router-link to="/formbuilder">Guiding people in making forms</router-link></h3>
    </article>
    <article id="convertiq">
      <router-link to="/convertiq" class="card-link">
        <figure>
          <img
            decoding="async"
            width="1128"
            height="400"
            src="../assets/images/home/convertiq.png"
            alt="ConvertIQ project preview"
          />
        </figure>
      </router-link>
      <h3><router-link to="/convertiq">Simplifying social media campaign management</router-link></h3>
    </article>
    <article>
      <a
        href="https://uxdesign.cc/turning-spotify-into-jukebox-c6f0ae031284"
        class="card-link"
      >
        <figure>
          <img
            decoding="async"
            width="1128"
            height="400"
            src="../assets/images/home/jukebox.svg"
            alt="ConvertIQ project preview"
          />
        </figure>
      </a>
      <h3><a href="https://uxdesign.cc/turning-spotify-into-jukebox-c6f0ae031284">Thinking about turning Spotify into Jukebox</a></h3>
      <p>
        A concept investigating the possibility of playing music in public
        places using streaming services.
      </p>
    </article>
    <!-- <article id="dal">
      <a
        href="https://medium.com/@igorrazvodovsky/searching-for-a-medium-for-a-recipe-c707ccfab23a"
        class="card-link"
      >
        <figure>
          <img
            decoding="async"
            id="dal-fig-speaker"
            src="../assets/images/home/dal__speaker.png"
            height="143"
            width="200"
          />
          <img
            decoding="async"
            id="dal-fig-sound"
            src="../assets/images/home/dal__speaker__sounds.gif"
            height="100"
            width="250"
          />
          <img
            decoding="async"
            id="dal-fig-shadow"
            src="../assets/images/home/dal__speaker__shadow.png"
            height="106"
            width="202"
          />
        </figure>
      </a>
      <h3>Experimenting with medium for a recipe</h3>
      <p>
        A side-project with the goal to create a product that does one job
        incredibly well and learn a couple of new things along the&nbsp;way.
      </p>
      <a
        href="https://medium.com/@igorrazvodovsky/searching-for-a-medium-for-a-recipe-c707ccfab23a"
        >Read case study</a
      >
      <a href="https://assistant.google.com/services/a/uid/0000009f815d8acf"
        >Try with Google Assistant</a
      >
    </article> -->
  </section>
</template>
<script>
import imgUrlAloudLight from '../assets/images/home/aloud.png'
import imgUrlAloudDark from '../assets/images/home/aloud-d.png'
export default {
  computed: {
    userPrefersDark() {
      return (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
    },
    imgAloud() {
      return this.userPrefersDark ? imgUrlAloudDark : imgUrlAloudLight
    },
  },
}
</script>
