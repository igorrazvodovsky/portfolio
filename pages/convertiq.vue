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

    <img class="convertiq-img--1" src="~/assets/convertiq__1.png" />
    <img class="convertiq-img--2" src="~/assets/convertiq__2.png" />
    <img class="convertiq-img--3" src="~/assets/convertiq__3.png" />
    <img class="convertiq-img--4" src="~/assets/convertiq__4.png" />
    <img class="convertiq-img--5" src="~/assets/convertiq__5.png" />
    <img class="convertiq-img--6" src="~/assets/convertiq__6s.png" />
    <img class="convertiq-img--7" src="~/assets/convertiq__7s.png" />
    <img class="convertiq-img--8" src="~/assets/convertiq__8s.png" />
    <img class="convertiq-img--9" src="~/assets/convertiq__9s.png" />
    <img class="convertiq-img--10" src="~/assets/convertiq__10.png" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['page'])
}
</script>
