<template>
  <div class="subreddit-info">
    <img
      v-if="banner_background_image || banner_img"
      :src="banner_img ? banner_img : banner_background_image.split('?')[0]"
      alt="banner background image"
    />

    <div class="about">
      <img
        v-if="icon_img || community_icon"
        :src="icon_img ? icon_img : community_icon.split('?')[0]"
        alt="subreddit icon image"
      />
      <div>
        <h3 v-if="display_name">{{ display_name }}</h3>
        <h5 v-if="title">{{ title }}</h5>

        <p v-if="public_description">{{ public_description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  icon_img,
  display_name,
  title,
  public_description,
  banner_background_image,
  banner_img,
  community_icon,
} = props.about;

const props = defineProps({
  about: Object,
});
</script>

<style scoped>
.subreddit-info {
  width: 100%;
  background: #000a29;
  box-shadow: 0 0 20px 15px #000a29;
  margin-bottom: 3rem;
}

.subreddit-info img {
  display: block;
  width: 100%;
  object-fit: cover;
}

.about {
  display: flex;
  width: 90%;
  margin: 0 auto;
  gap: 2rem;
  padding-top: 2rem;
}

.about img {
  aspect-ratio: 1 / 1;
  width: 15%;
  min-width: 15%;
  object-fit: cover;
  padding: 4px;
  border: 3px solid whitesmoke;
  border-radius: 50%;
}

.about div h3,
.about div h5 {
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
}
</style>
