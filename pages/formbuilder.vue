<template>
  <!-- TODO: -->
  <!-- Copyrights -->
  <!-- https://unsplash.com/photos/OGKJr1q3MM4 -->
  <!-- https://unsplash.com/photos/h6gCRTCxM7o -->
  <!-- Failed: keeping forms small -->
  <!-- Form creation strategies & personal style: big vs small -->
  <main>
    <h1>Guiding people in making forms</h1>
    <figure class="hero">
      <img
        src="https://images.unsplash.com/photo-1580894732930-0babd100d356?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        alt="People working"
      />
      <figcaption>
        ...
      </figcaption>
    </figure>
    <div class="meta">
      <div>
        <h4>Year</h4>
        <time datetime="2020">2020</time>
      </div>
      <div>
        <h4>Role and deliverables</h4>
        <ul>
          <li>Stakeholder interview</li>
          <li>Information architecture</li>
          <li>Heuristic analysis</li>
          <li>Conceptual model</li>
          <li>
            <a
              href="https://www.semanticscholar.org/paper/What-do-Prototypes-Prototype-Houde-Hill/30bc6125fab9d9b2d5854223aeea7900a218f149"
              >Integration</a
            >
            prototype
          </li>
          <li>Product roadmap</li>
          <li>Product analytics</li>
          <li>Journey Map</li>
          <li>Summative usability testing</li>
          <li>Development cycle coupling</li>
        </ul>
      </div>
    </div>
    <p class="description">
      I designed a form builder that helps create well-designed forms and
      integrate them with the issue tracking system of the user’s choice.
    </p>

    <!-- <h2>Specific problems solved</h2>
    <dl>
      <dt>Ensire that resulting forms are well designed</dt>
      <dd>
        Good forms are notoriously tricky to implement. Our goal was to design
        this process in a way that don’t requiere the know-how on the user’s
        part.
      </dd>
      <dt>Help people creating the form think in user-centric terms</dt>
      <dd>...</dd>
      <dt>Ensure discoverability</dt>
      <dd>
        Product’s navigation was built around tags. To give an end-user chance
        to find the form, our users needed to strike a balance between broad
        company-side subjects and their own specific topic.
      </dd>
      <dt>Reducing load on customer support agents</dt>
      <dd>
        Customer support can be one of a company’s largest budget items,
        especially when they operate on a global scale. Form builder helps to
        shrink that cost by improving agent velocity—an in turn, creating
        happier customers.
      </dd>
    </dl> -->

    <!-- <h2>Who I designed for</h2>
    <figure>
      <img
        src="https://images.unsplash.com/photo-1583037783119-369a40459f28?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        alt="Woman working"
      />

      <figcaption>
        <strong>Process owners</strong>
        <p>
          Are directly immediately accountable for creating, sustaining and
          improving a particular process, as well as, being responsible for the
          outcomes of the process. They need a way to manage incoming requests.
          Can be a support agent, manager or administrator but not limited to
          those.
        </p>
      </figcaption>
    </figure>
    <figure>
      <img
        src="https://images.unsplash.com/photo-1580894732930-0babd100d356?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        alt="People working"
      />

      <figcaption>
        <strong>Employee</strong>
        <p>
          Has a task and needs support in achieving it. Can be a person or a
          group's representative.
        </p>
      </figcaption>
    </figure>

    <h2>The design process</h2>
    <h2>The results</h2> -->
  </main>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['page']),
  head() {
    return {
      title: 'Igor / Form builder',
      bodyAttrs: {
        class: 'case formbuilder'
      }
    }
  }
}
</script>
