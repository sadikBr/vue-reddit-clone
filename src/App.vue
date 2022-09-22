<script setup>
import { ref, computed } from 'vue';

import NavBar from './components/NavBar.vue';
import Posts from './components/Posts.vue';
import Post from './components/Post.vue';
import Error from './components/Error.vue';
import Loading from './components/Loading.vue';
import SubredditInfo from './components/SubredditInfo.vue';

import axios from 'axios';
import purifyPosts from './utils/renderingHandler';

const searchTerm = ref('');
const loading = ref(false);
const error = ref('');
const data = ref(undefined);
const subredditInfo = ref(undefined);

const baseUrl = computed(() =>
  searchTerm.value.length > 0
    ? `https://www.reddit.com/r/${searchTerm.value.replace(/\s+/g, '')}`
    : ''
);

function fetchData() {
  loading.value = true;
  error.value = '';
  data.value = undefined;
  subredditInfo.value = undefined;

  Promise.all([
    axios.get(`${baseUrl.value}.json?limit=100`),
    axios.get(`${baseUrl.value}/about.json`),
  ])
    .then(([postsData, subredditInfoData]) => {
      const { children } = postsData.data.data;
      const subredditAbout = subredditInfoData.data.data;

      data.value = purifyPosts(children);
      subredditInfo.value = subredditAbout;
      searchTerm.value = '';
      loading.value = false;
    })
    .catch(() => {
      axios
        .get(
          `https://www.reddit.com/search.json?q=${searchTerm.value}&limit=100`
        )
        .then((response) => {
          const { children } = response.data.data;

          if (children.length > 0) {
            error.value = `There is no: r/${searchTerm.value.replace(
              ' ',
              ''
            )}, these are some results on reddit that have that term.`;

            data.value = purifyPosts(children, true);
          } else {
            error.value = `Nothing found for: ${searchTerm.value}`;
          }

          searchTerm.value = '';
          loading.value = false;
        })
        .catch((err) => {
          error.value = err.message;
        });
    });
}
</script>

<template>
  <NavBar>
    <form @submit.prevent="fetchData">
      <input v-model="searchTerm" placeholder="searchTerm ..." />
    </form>
  </NavBar>

  <SubredditInfo v-if="subredditInfo" :about="subredditInfo" />

  <div class="container">
    <Loading :class="loading ? 'show-loading' : ''" />

    <Error :error="error" :class="error ? 'show-error' : ''" />

    <Posts :posts="data" />
  </div>
</template>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
}

input {
  padding: 0.5rem;
  outline: none;
  border: none;
  font-size: 0.75rem;
  border-radius: 0.2rem;
  transition: all 0.25s ease-in-out;
  background: #0d173e;
}

input:focus {
  background: white;
  color: black;
  outline: 2px solid skyblue;
}
</style>
