<template>
  <div class="item">
    <div class="item-text">
      <h3>{{ name }}</h3>
      <p>{{ desc }}</p>
    </div>

    <button class="btn" @click="createText">Create</button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    createText() {
      parent.postMessage({ pluginMessage: { type: this.type } }, "*");
    }
  }
};
</script>
