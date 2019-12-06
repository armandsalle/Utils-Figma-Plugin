<template>
  <main class="container">
    <h1>Utils functions</h1>
    <p class="emoji">
      🙌
      <span>Select a text and then click one of this two buttons</span>
      🙌
    </p>

    <text-wrapper></text-wrapper>
    <app-footer></app-footer>
    <error v-if="error" @click.native="error = false" :error="errorMessage"></error>
  </main>
</template>

<script>
import TextWrapper from "./components/TextItems/TextWrapper";
import Footer from "./components/Footer";
import Error from "./components/Error";

export default {
  components: {
    TextWrapper,
    appFooter: Footer,
    Error
  },
  data() {
    return {
      error: false,
      errorMessage: "Something goes wrong"
    };
  },
  mounted() {
    onmessage = msg => {
      if (msg.data.pluginMessage.type === "error") {
        this.error = true;
        this.errorMessage = msg.data.pluginMessage.data;
      }
    };
  }
};
</script>
