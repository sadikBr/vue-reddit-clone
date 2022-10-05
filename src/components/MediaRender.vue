<script setup>
import handleRender from '../utils/renderingHandler';

const { title, url, selftext, author, subreddit, subreddit_type, type, html } =
  props.post;

function renderFrame(html) {
  const txtArea = document.createElement('textarea');
  let htmlString = html.replace('style="position:absolute;"', '');
  htmlString = htmlString.replace('width', 'width="100%" ignore');
  htmlString = htmlString.replace('height', 'height="100%" ignore');
  txtArea.innerHTML = htmlString;

  return txtArea.value;
}

const props = defineProps({
  post: Object,
});
</script>

<template>
  <img v-if="type === 'image'" :src="url" :alt="title" />

  <video :src="url" v-if="type === 'video'" controls></video>

  <div class="iframe" v-if="type === 'iframe'" v-html="renderFrame(html)"></div>
</template>

<style scoped>
img,
video {
  width: 100%;
  display: block;
  object-fit: contain;
}
</style>
