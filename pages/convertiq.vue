<template>
  <div class="grid convertiq">
    <h1 class="convertiq-title">ConvertIQ</h1>
    <p class="convertiq-description">
      In 2018, I joined ConvertIQ’s product team to design a tool to make, edit
      and analyze social media campaigns. The project became an opportunity to
      try out a more playful visual approach, as I wanted the app to be warm and
      approachable despite the complexity of the subject.
    </p>
    <!-- <p class="convertiq-skills">UX & UI, a bit of identity</p> -->
    <figure class="convertiq-img--1">
      <img src="~/assets/convertiq__1.png" alt="Account dashboard" />
      <figcaption>Account dashboard</figcaption>
    </figure>
    <figure class="convertiq-img--2">
      <img src="~/assets/convertiq__2.png" />
      <figcaption>Campaign overview</figcaption>
    </figure>
    <figure class="convertiq-img--3">
      <figcaption>
        Dependencies between campaign properties are not straighforward. By
        shaping campaign creation in a form of a wizard ... structure and
        process.
      </figcaption>
      <img src="~/assets/convertiq__3.png" />
    </figure>
    <img class="convertiq-img--4" src="~/assets/convertiq__4.png" />
    <img class="convertiq-img--5" src="~/assets/convertiq__5.png" />
    <img class="convertiq-img--6" src="~/assets/convertiq__6s.png" />
    <img class="convertiq-img--7" src="~/assets/convertiq__7s.png" />
    <img class="convertiq-img--8" src="~/assets/convertiq__8s.png" />
    <img class="convertiq-img--9" src="~/assets/convertiq__9s.png" />

    <figure class="convertiq-img--10">
      <video class="convertiq-img--10" autoplay loop>
        <!-- <source src="/media/examples/flower.webm" type="video/webm" /> -->
        <source src="~/assets/convertiq__10.mp4" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <figcaption>Audience configuration</figcaption>
    </figure>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['page']),
  head() {
    return {
      title: this.title,
      bodyAttrs: {
        class: 'case convertiq'
      }
    }
  }
}
</script>
