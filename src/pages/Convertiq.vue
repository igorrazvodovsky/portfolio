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
        <dd>
          Stakeholder interviews, digital ethnography using YouTube
        </dd>
        <dt>Synthesis</dt>
        <dd>
          Sensemaking workshops, conceptual model, scenarios
        </dd>
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
      I worked with ConvertIQ’s product team on the initial design & a prototype of a tool to make, edit and analyze social media campaigns.
      The project became an opportunity to try out a more playful visual approach.
      I wanted the app to be warm and approachable despite the complexity of the subject.
    </p>
    <figure id="hero">
      <img
        src="../assets/images/convertiq/hero.png"
        alt="Account dashboard"
        decoding="async"
      />
      <figcaption>
        Account dashboard
      </figcaption>
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
      <figcaption>
        Campaign overview
      </figcaption>
    </figure>
    <figure>
      <img
        loading="lazy"
        decoding="async"
        src="../assets/images/convertiq/step1.png"
        alt="Step 1"
      />
      <figcaption>1. Choosing the campaign type</figcaption>
    </figure>
    <figure>
      <img
        loading="lazy"
        decoding="async"
        src="../assets/images/convertiq/step2.png"
        alt="Step 2"
      />
      <figcaption>2. Selecting audience</figcaption>
    </figure>
    <figure>
      <img
        loading="lazy"
        decoding="async"
        src="../assets/images/convertiq/step3.png"
        alt="Step 3"
      />
      <figcaption>3. Placement</figcaption>
    </figure>
    <figure>
      <img
        loading="lazy"
        decoding="async"
        src="../assets/images/convertiq/step4.png"
        alt="Step 4"
      />
      <figcaption>4. Ad content and its variations</figcaption>
    </figure>
    <figure>
      <img
        loading="lazy"
        decoding="async"
        src="../assets/images/convertiq/step5.png"
        alt="Step 5"
      />
      <figcaption>5. Budget settings</figcaption>
    </figure>
    <figure>
      <img
        loading="lazy"
        decoding="async"
        src="../assets/images/convertiq/step6.png"
        alt="Step 6"
      />
      <figcaption>6. Last check</figcaption>
    </figure>
    <figure>
      <video class="convertiq-img--10" autoplay loop>
        <source src="../assets/images/convertiq/audience.mp4" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
      <figcaption>2.1. Audience configuration</figcaption>
    </figure>

  </section>

</template>

<script>
export default {
  data() {
    return {
      scrollPosition: null
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
    document.body.classList.add('case', 'convertiq');
  },
  unmounted () {
    document.body.classList.remove('case', 'convertiq');
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY
    }
  }
}
</script>