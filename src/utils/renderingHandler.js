function purifyHTML(htmlString) {
  let newHTML = htmlString.replace('style="position:absolute;"', '');
  newHTML = newHTML.replace('width', 'width="100%" ignore');
  newHTML = newHTML.replace('height', 'height="100%" ignore');

  return newHTML;
}

export default function purifyPosts(posts, search = false) {
  return posts.map((post) => handleRender(post.data, search));
}

function handleRender(post, search) {
  const postToReturn = {};

  postToReturn.id = post.id;
  postToReturn.title = post.title;
  postToReturn.selftext = post.selftext;
  postToReturn.author = post.author;
  postToReturn.subreddit = post.subreddit;
  postToReturn.subreddit_type = post.subreddit_type;
  postToReturn.html = '';
  postToReturn.type = '';
  postToReturn.url = '';

  if (post.url.match(/.(png|jpe?g|gif)$/)) {
    postToReturn.type = 'image';
    postToReturn.url = post.url;
  } else if (post.url.endsWith('.mp4')) {
    postToReturn.type = 'video';
    postToReturn.url = post.url;
  } else if (post?.preview?.reddit_video_preview) {
    postToReturn.type = 'video';
    postToReturn.url = search
      ? post.preview.reddit_video_preview.fallback_url.split('?')[0]
      : post.preview.reddit_video_preview.fallback_url;
  } else if (
    post.url.startsWith('https://v.redd.it') &&
    post?.media?.reddit_video
  ) {
    postToReturn.type = 'video';
    postToReturn.url = post.media.reddit_video.fallback_url;
  } else if (post?.media?.oembed) {
    postToReturn.type = 'iframe';
    postToReturn.html = purifyHTML(post.media.oembed.html);
  } else if (
    post.url.startsWith('https://i.imgur.com') &&
    post.url.endsWith('.gifv')
  ) {
    postToReturn.type = 'image';
    postToReturn.url = post.url.slice(0, -2);
  } else if (/(.gifv)$/.test(post.url)) {
    postToReturn.type = 'video';
    postToReturn.url = post.url.replace('.gifv', '.mp4');
  } else {
    postToReturn.type = 'non-conform';
  }

  return postToReturn;
}
