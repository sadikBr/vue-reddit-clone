<template>
  <div class="post" v-if="subreddit_type !== 'user' && type !== 'non-conform'">
    <MediaRender :post="props.post" />

    <h3 class="post-title">
      {{ title }}
    </h3>

    <p class="post-description" v-if="selftext">
      {{ selftext }}
    </p>

    <div class="author-link">
      Created By <a :href="authorProfile">{{ author }}</a> on r/{{ subreddit }}
    </div>
  </div>
</template>

<script setup>
import MediaRender from './MediaRender.vue';

const { title, url, selftext, author, subreddit, subreddit_type, type, html } =
  props.post;

const props = defineProps({
  post: Object,
});
const authorProfile = `https://www.reddit.com/u/${author}`;
</script>

<style scoped>
.post {
  background: rgb(1, 60, 84);
  height: fit-content;
  overflow: hidden;
  border-radius: 0.25rem;
}

.post-title,
.post-description {
  font-size: 0.9rem;
  padding: 0.5rem;
  margin: 0;
}

.author-link {
  padding: 0.5rem;
  margin: 0;
  font-size: 0.75rem;
}

.author-link a {
  color: pink;
}

.post:has(.post-description) .post-title,
.post:has(.author-link) .post-title {
  margin-bottom: 1rem;
}

.post:has(.author-link) .post-description {
  margin-bottom: 1rem;
}
</style>
