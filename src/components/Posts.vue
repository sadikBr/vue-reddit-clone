<template>
  <div class="posts">
    <Post v-for="item in props.posts" :key="item.id" :post="item" />
  </div>
</template>

<script setup>
import Post from './Post.vue';

const props = defineProps({
  posts: Array,
});
</script>

<style scoped>
.posts {
  max-width: 100%;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  margin-bottom: 1rem;
}

.posts .post {
  max-width: 100%;
}
</style>
