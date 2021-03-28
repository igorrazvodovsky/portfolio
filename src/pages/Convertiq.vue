<template>
  <section id="header">
    <h1>Simplifying social media campaign management</h1>
    <article id="meta">
      <article>
        <h4>Year</h4>
        <time datetime="2020">2018</time>
      </article>
    </article>
    <article id="role">
      <h4>Role</h4>
      <dl>
        <dt>Research</dt>
        <dd>Stakeholder interviews, digital ethnography using YouTube</dd>
        <dt>Synthesis</dt>
        <dd>Sensemaking workshops, conceptual model, scenarios</dd>
        <dt>Prototyping</dt>
        <dd>
          UI design,
          <a
            href="https://www.semanticscholar.org/paper/What-do-Prototypes-Prototype-Houde-Hill/30bc6125fab9d9b2d5854223aeea7900a218f149"
            >integration</a
          >
          prototype.
        </dd>
      </dl>
    </article>
    <p id="description">
      I worked with ConvertIQ’s product team on the initial design & a prototype
      of a tool to make, edit and analyze social media campaigns. The project
      became an opportunity to try out a more playful visual approach. I wanted
      the app to be warm and approachable despite the complexity of the subject.
    </p>
    <figure id="hero">
      <img
        src="../assets/images/convertiq/hero.png"
        alt="Account dashboard"
        decoding="async"
      />
      <figcaption>Account dashboard</figcaption>
    </figure>
  </section>

  <section id="process">
    <!-- <h2>Design highlights</h2> -->
    <figure>
      <img
        loading="lazy"
        decoding="async"
        src="../assets/images/convertiq/campaign.png"
        alt="Campaign"
      />
      <figcaption>Campaign overview</figcaption>
    </figure>
    <figure>
      <img
        class="step"
        id="wizardStep1"
        loading="lazy"
        decoding="async"
        :src="imgStep1"
        alt="Step 1"
      />
      <figcaption>1. Choosing the campaign type</figcaption>
    </figure>
    <figure>
      <img
        class="step"
        id="wizardStep2"
        loading="lazy"
        decoding="async"
        :src="imgStep2"
        alt="Step 2"
      />
      <figcaption>2. Selecting audience</figcaption>
    </figure>
    <figure>
      <img
        class="step"
        id="wizardStep3"
        loading="lazy"
        decoding="async"
        :src="imgStep3"
        alt="Step 3"
      />
      <figcaption>3. Placement</figcaption>
    </figure>
    <figure>
      <img
        class="step"
        id="wizardStep4"
        loading="lazy"
        decoding="async"
        :src="imgStep4"
        alt="Step 4"
      />
      <figcaption>4. Ad content and its variations</figcaption>
    </figure>
    <figure>
      <img
        class="step"
        id="wizardStep5"
        loading="lazy"
        decoding="async"
        :src="imgStep5"
        alt="Step 5"
      />
      <figcaption>5. Budget settings</figcaption>
    </figure>
    <figure>
      <img
        class="step"
        id="wizardStep6"
        loading="lazy"
        decoding="async"
        :src="imgStep6"
        alt="Step 6"
      />
      <figcaption>6. Last check</figcaption>
    </figure>
    <figure>
      <video class="convertiq-img--10" autoplay loop>
        <source
          src="../assets/images/convertiq/audience.mp4"
          type="video/mp4"
        />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <figcaption>2.1. Audience configuration</figcaption>
    </figure>
  </section>
</template>

<script>
import imgUrlStep from '../assets/images/convertiq/step.png'
import imgUrlStep1 from '../assets/images/convertiq/step1.png'
import imgUrlStep2 from '../assets/images/convertiq/step2.png'
import imgUrlStep3 from '../assets/images/convertiq/step3.png'
import imgUrlStep4 from '../assets/images/convertiq/step4.png'
import imgUrlStep5 from '../assets/images/convertiq/step5.png'
import imgUrlStep6 from '../assets/images/convertiq/step6.png'

export default {
  data() {
    return {
      scrollPosition: null,
      wizardStepPosition: [0, 0, 0, 0, 0, 0],
    }
  },
  computed: {
    imgStep1() {
      return this.wizardStepPosition[0] > -window.innerHeight * 0.3
        ? imgUrlStep
        : imgUrlStep1
    },
    imgStep2() {
      return this.wizardStepPosition[0] > -window.innerHeight * 0.4
        ? imgUrlStep
        : imgUrlStep2
    },
    imgStep3() {
      return this.wizardStepPosition[0] > -window.innerHeight * 0.5
        ? imgUrlStep
        : imgUrlStep3
    },
    imgStep4() {
      return this.wizardStepPosition[0] > -window.innerHeight * 0.6
        ? imgUrlStep
        : imgUrlStep4
    },
    imgStep5() {
      return this.wizardStepPosition[0] > -window.innerHeight * 0.7
        ? imgUrlStep
        : imgUrlStep5
    },
    imgStep6() {
      return this.wizardStepPosition[0] > -window.innerHeight * 0.8
        ? imgUrlStep
        : imgUrlStep6
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
    document.body.classList.add('case', 'convertiq')
  },
  unmounted() {
    document.body.classList.remove('case', 'convertiq')
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY

      const steps = document.body.querySelectorAll('.step')
      steps.forEach(function (e, i) {
        const domRect = e.getBoundingClientRect()
        this.wizardStepPosition[i] = domRect.y - window.innerHeight
      }, this)
    },
  },
}
</script>
