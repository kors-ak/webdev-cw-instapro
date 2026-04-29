import { likePost, dislikePost } from "./api.js";
import { sanitizeHtml } from "./helpers.js";
import { getToken } from "./index.js";

export function addLikeListeners() {
 const postLikesElArr = document.querySelectorAll(".post-likes");

 for (const postLikesEl of postLikesElArr) {
  const postId = postLikesEl.dataset.postId;
  const btn = postLikesEl.querySelector(".like-button");
  const likeImg = btn.querySelector("img");
  const likesTextEl = postLikesEl.querySelector(".post-likes-text");

  btn.addEventListener("click", (e) => {
   e.stopPropagation();

   btn.disabled = true;

   const wasLiked = btn.dataset.isLiked === "true";

   const requestPromise = wasLiked
    ? dislikePost(getToken(), postId)
    : likePost(getToken(), postId);

   requestPromise
    .then((data) => {
     btn.dataset.isLiked = data.post.isLiked.toString();
     likeImg.src = data.post.isLiked
      ? "./assets/images/like-active.svg"
      : "./assets/images/like-not-active.svg";

     updateLikesText(likesTextEl, data.post.likes);
    })
    .catch((error) => {
     alert("Лайкать посты могут только авторизованные пользователи");
    })
    .finally(() => {
     btn.disabled = false;
    });
  });
 }

 function updateLikesText(element, likes) {
  let text = "Нравится: ";

  if (likes.length === 0) {
   text += "<strong>0</strong>";
  } else if (likes.length === 1) {
   text += `<strong>${sanitizeHtml(likes[Math.floor(Math.random() * likes.length)].name)}</strong>`;
  } else {
   text += `<strong>${sanitizeHtml(likes[Math.floor(Math.random() * likes.length)].name)}</strong> и ещё <strong>${likes.length - 1}</strong>`;
  }

  element.innerHTML = text;
 }
}
