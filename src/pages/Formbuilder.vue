<template>
  <section id="header">
    <h1>Guiding people in making&nbsp;forms</h1>
    <!-- TODO:
      <audio controls src="~/assets/formbuilder/audio.mp3">
        Your browser does not support the
        <code>audio</code> element.
      </audio> -->
    <figure id="hero">
      <img :src="imgHero" width="1260" height="945" decoding="async" />
    </figure>
    <article id="meta">
      <article>
        <h4>Year</h4>
        <time datetime="2020">2020</time>
      </article>
    </article>
    <article id="role">
      <h4>Role</h4>
      <dl>
        <dt>Research</dt>
        <dd>
          Stakeholder interviews, front-line collaboration, information
          architecture study.
        </dd>
        <dt>Synthesis</dt>
        <dd>
          Sensemaking workshops, conceptual model, journey mapping, scenarios
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
        <dt>Evaluation &amp; validation</dt>
        <dd>Product analytics, usability testing.</dd>
        <dt>Follow-through</dt>
        <dd>
          Product &amp; design strategy, product roadmap, development cycle
          coupling.
        </dd>
      </dl>
    </article>
    <p id="description">
      A form builder that helps create well-designed forms and integrate them
      with the issue tracking system of the user’s choice.
    </p>
  </section>

  <section id="problems">
    <h2>Specific problems solved</h2>
    <article>
      <h3>Make sure the resulting forms are good&nbsp;🙄</h3>
      <p>
        Good forms are notoriously tricky to implement. Our goal was to design
        this process in a way that doesn't require the know-how on the user’s
        part.
      </p>
    </article>
    <article>
      <!-- support the admin in creating the mental model of the end-user searching and filling out the form. -->
      <h3>Help people creating forms think in user-centric terms</h3>
      <p>
        In addition to the intricacies of form design, it was crucial to make
        the form creators see their users' perspective. Embedded
        user-centeredness!
      </p>
    </article>
    <article>
      <h3>Ensure discoverability</h3>
      <p>
        Navigation had to support all the variety of things and concepts that
        can be found in a large multinational organisation.
      </p>
    </article>
    <article>
      <h3>Reducing the load on support agents</h3>
      <p>
        Support can be one of the largest budget items, especially when they
        operate on a global scale. Form builder helps to shrink that cost by
        improving agent velocity—and in turn, creating happier employees.
      </p>
    </article>
  </section>

  <section id="users">
    <h2>Who we designed for</h2>
    <figure>
      <img
        loading="lazy"
        decoding="async"
        src="../assets/images/formbuilder/userA.jpeg"
        alt="Woman working"
      />

      <figcaption>
        <small class="author">Photo by Brooke Cagle</small>
        <h3>
          Support agent, form&nbsp;creator<a class="footnote" href="#footnote-3"
            ><sup>1</sup></a
          >
        </h3>
        <p>
          Are responsible for creating, sustaining and improving a particular
          process, as well as, being responsible for the outcomes of the
          process. They need a way to manage incoming requests.
        </p>
      </figcaption>
    </figure>
    <figure>
      <img
        loading="lazy"
        decoding="async"
        src="../assets/images/formbuilder/userB.jpeg"
        alt="People working"
      />
      <figcaption>
        <small class="author">Photo by Amy Hirschi</small>
        <h3>Employee, end-user of the form</h3>
        <p>
          Has a task and needs support in achieving it. Can be a person or a
          group's representative. In order to get support, they need to find the
          right way to get&nbsp;it.
        </p>
      </figcaption>
    </figure>
    <aside id="footnote-3" class="footnote">
      <small>
        <i>Support</i> here is meant in a general sense and with the emphasis on
        the number of incoming requests. In some use cases, we additionally
        differentiated between usage by dedicated support specialists or a more
        general process owner like a manager or administrator that does it in
        addition to something else.
      </small>
    </aside>
  </section>

  <section id="process">
    <!-- <h2>Process highlights</h2> -->
    <h2>Design highlights</h2>
    <!-- TODO: Approach -->
    <article id="process-map">
      <h3>Understanding context</h3>
      <p>
        The application of which the constructor is a part of is only a phase in
        the more general journey people in the company embark on when they need
        support with something. Acknowledgement of this by the team was
        important for a better understanding of where our users come from and
        what happens after they fill out their forms.
      </p>
      <p>
        We built our team's understanding of the territory by mapping out the
        broader context. That helped achieve clarity and alignment around goals
        for the project, expectations, and potential dependencies and concerns.
        <i>Stakeholder interviews</i> further developed &amp; broadened this
        understanding.
      </p>
      <figure>
        <img
          loading="lazy"
          decoding="async"
          src="../assets/images/formbuilder/journey.png"
          alt="Form builder withing the broader context"
        />
        <figcaption>
          Overview of the end-user journey and form builder's place within it.
        </figcaption>
      </figure>
    </article>
    <article id="process-topic">
      <h3>Topic definition</h3>
      <p>
        Finding the right form was one of the biggest pain points for the
        previous reincarnation of the app and our goal was to make it easier to
        do. To achieve this we needed to make sure our users name and organize
        their forms in a way that their respective users can relate to.
      </p>
      <p>
        The job of defining the topic of the form is divided between its
        <i>title</i> and the combination of <i>tags</i>. There are two parts to
        the form's definition: the immediate "topic" at hand and the broader
        "subject" space within which the process takes place. <i>E.g.</i> in
        "new user in HR system" the "new user" will be a topic and the "HR
        system" – its context that distinguishes it from other forms dedicated
        to the creation of users. It was important to build our search to
        understand different combinations between the two.<a
          class="footnote"
          href="#footnote-1"
          ><sup>2</sup></a
        >
      </p>
      <p>
        At the same time by phrasing our questions in a goal-oriented manner
        that reminded the future use we nudged our users to imagine how
        colleagues will look for their form.
      </p>
    </article>
    <figure id="process-topic-fig">
      <img
        loading="lazy"
        decoding="async"
        src="../assets/images/formbuilder/topic.png"
        alt="Question configuration UI"
        width="1440"
        height="856"
      />
    </figure>
    <figure id="process-config-fig">
      <img
        loading="lazy"
        decoding="async"
        src="../assets/images/formbuilder/config.png"
        alt="Question configuration UI"
        width="1440"
        height="600"
      />
    </figure>
    <aside id="footnote-1" class="footnote">
      <small>
        Another thing that influences the topic is <i>composition</i>. When you
        have a topic that is, let us say geographically divided, you can either
        create one bigger form or several smaller ones. The decision can be
        influenced by the subject matter or personal preference.
        <!-- There is little
        one can do about it besides being aware and taking into account. This is
        something user should decide by themselves. -->
        <figure aria-hidden="true">
          <img
            loading="lazy"
            decoding="async"
            :src="imgComposition"
            alt="Different ways of organazing forms"
          />
        </figure>
      </small>
    </aside>
    <article id="process-config">
      <div>
        <h3>Progressive disclosure in question configuration</h3>
        <p>
          Processes our colleagues support vary greatly in complexity and this
          reflected directly in the complexity of their forms. Mostly they are a
          simple combination of two to three simple questions but once in a
          while, you come across something less straightforward.
          <!-- About stakeholder interviews + zoom img -->
        </p>
      </div>
      <!-- Not always your users know what you're talking about and where to look for...  -->
    </article>
    <article id="process-config-details">
      <figure>
        <img
          loading="lazy"
          decoding="async"
          src="../assets/images/formbuilder/config-1.png"
          alt="Question configuration UI"
          width="360"
          height="360"
        />
        <figcaption>Selecting the block type.</figcaption>
      </figure>
      <figure>
        <img
          loading="lazy"
          decoding="async"
          src="../assets/images/formbuilder/config-2.png"
          alt="Question configuration UI"
          width="360"
          height="360"
        />
        <figcaption>
          Form element names are chosen according to expected input, not UI it
          will be rendered with.
          <mark
            >Not what user will see but what you expect from them in
            return</mark
          >. <i>Input field</i> becomes <i>Text</i>;
          <i>Checkbox</i>&mdash;<i>Yes/No</i>; <i>Date picker</i> becomes
          <i>Date</i>. Additionally, <i>choices</i> were rendered either as
          <i>radio buttons, checkboxes</i> or <i>dropdown menu</i> based on the
          number of options.
        </figcaption>
      </figure>
      <figure>
        <img
          loading="lazy"
          decoding="async"
          src="../assets/images/formbuilder/config-3.png"
          alt="Question configuration UI"
          width="360"
          height="360"
        />
        <figcaption>
          When an answer option is known to be the most frequently selected one,
          it is helpful to select it by default.<a
            class="footnote"
            href="#footnote-2"
            ><sup>3</sup></a
          >
        </figcaption>
      </figure>
      <figure>
        <img
          loading="lazy"
          decoding="async"
          src="../assets/images/formbuilder/config-4.png"
          alt="Question configuration UI"
          width="360"
          height="360"
        />
        <figcaption>Adding an explanation.</figcaption>
      </figure>
      <figure>
        <img
          loading="lazy"
          decoding="async"
          src="../assets/images/formbuilder/config-5.png"
          alt="Question configuration UI"
          height="360"
        />
        <figcaption>
          Questions differ in complexity. Some answer themselves. Others benefit
          from examples, descriptions and&nbsp;nudges.
        </figcaption>
      </figure>
    </article>
    <aside id="footnote-2" class="footnote">
      <small>
        Defaults are a powerful yet dangerous thing. People tend to stick to the
        defaults and this can coax them down a particular path. We did our best
        to caution our users about this danger.
      </small>
    </aside>
    <!-- TODO: Front-line collaboration -->
    <article id="process-roadmap">
      <h3>Roadmap planning</h3>
      <p>
        I participated in the product roadmap planning cycle by highlighting
        user needs and the state of the team’s current response to those needs:
        gaps, opportunities, and blindspots. Helped team members frame their
        work around the problems that need to be solved rather than the specific
        features they want to build.
        <!-- I also needed to  -->
        <!-- Set clear expectations about -->
        <!-- design timing and involvement for any part of the process. -->
        <!-- TODO: Alongside <em>feature audit</em> to identify which product features are the most and least engaging... -->
      </p>
      <p>
        <em>Kano modelling </em> was used for prioritisation of new features.
        Being limited in resources, our focus was on serving our users' basic
        expectations, to make sure there’s nothing they’re missing. Still, I was
        always on the lookout for inexpensive ways to add a moment of delight.
      </p>
    </article>
    <figure aria-hidden="true" id="process-roadmap-fig">
      <img
        loading="lazy"
        decoding="async"
        :src="imgRoadmap"
        alt="Product roadmap"
      />
    </figure>
    <!-- TODO: Integration details -->
  </section>

  <section id="results">
    <h2>Outcomes</h2>
    <article>
      <h3><i>for</i> support agents</h3>
      <p>
        The new interface improved the overall experience and user satisfaction.
        User feedback &amp; data we gathered confirmed improved usability.
      </p>
    </article>
    <article>
      <h3><i>for</i> the rest of the employees</h3>
      <p>
        Objective quantitative metrics we collect show that most of our users
        succeed in finding the form from the first attempt. Judging by the
        completion time and a number of errors, form completion also doesn't
        cause them much distress.
      </p>
    </article>
  </section>
</template>
<script>
import imgUrlHero1 from '../assets/images/formbuilder/hero-1.png'
import imgUrlHero2 from '../assets/images/formbuilder/hero-2.png'
import imgUrlCompositionD from '../assets/images/formbuilder/composition-d.png'
import imgUrlCompositionL from '../assets/images/formbuilder/composition-l.png'
import imgUrlRoadmapD from '../assets/images/formbuilder/composition-d.png'
import imgUrlRoadmapL from '../assets/images/formbuilder/composition-l.png'

export default {
  data() {
    return {
      scrollPosition: null,
    }
  },
  computed: {
    userPrefersDark() {
      return (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
    },
    imgHero() {
      return this.scrollPosition < 100 ? imgUrlHero1 : imgUrlHero2
    },
    imgComposition() {
      return this.userPrefersDark ? imgUrlCompositionD : imgUrlCompositionL
    },
    imgRoadmap() {
      return this.userPrefersDark ? imgUrlRoadmapD : imgUrlRoadmapL
    },
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll)
    document.body.classList.add('case', 'formbuilder')
  },
  unmounted() {
    document.body.classList.remove('case', 'formbuilder')
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY
    },
  },
}
</script>
<style>
.formbuilder figure#hero img {
  background-image: url(../assets/images/formbuilder/hero-1.png);
}
</style>
