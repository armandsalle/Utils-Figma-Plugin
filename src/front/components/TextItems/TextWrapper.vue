<template>
  <div class="wrapper">
    <div class="title_wrap">
      <h2 class="title">Text</h2>
      <div class="line"></div>
    </div>

    <text-item
      v-for="item in items"
      :key="item.key"
      :name="item.name"
      :desc="item.desc"
      :type="item.type"
    ></text-item>
  </div>
</template>

<script>
import TextItem from "./TextItem";

export default {
  components: {
    TextItem
  },
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Mexican Wave",
          desc: "Create a group of text with each letter uppercase",
          type: "create-mexican-waves"
        },
        {
          id: 2,
          name: "Create Hashtag",
          desc: "Create an hashtag",
          type: "create-hashtag"
        }
      ]
    };
  }
};
</script>
