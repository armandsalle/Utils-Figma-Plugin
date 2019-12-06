<template>
  <div class="error">
    ERROR :
    <span class="span-error">{{error}}</span>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String
    }
  }
};
</script>
