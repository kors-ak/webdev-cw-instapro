import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDate } from "../helpers.js";
import { addLikeListeners } from "../initLikeListener.js";

export function renderPostsPageComponent({ appEl }) {
 if (posts.length === 0) {
  appEl.innerHTML = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">Постов пока нет</ul>
              </div>`;
 } else {
  const allPostsHtml = posts
   .map(
    (post) => `
        <li class="post">
          <div class="post-header" data-user-id="${post.user.id}">
              <img src="${post.user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes" data-post-id="${post.id}">
            <button class="like-button" data-is-liked="${post.isLiked}">
              <img src="./assets/images${post.isLiked ? "/like-active.svg" : "/like-not-active.svg"}">
            </button>
            <p class="post-likes-text">
              Нравится: ${post.likes.length === 0 ? '<strong>0</strong>' : `<strong>${post.likes[0].name}</strong>`} ${post.likes.length >= 2 ? `и ещё <strong>${post.likes.length - 1}</strong>` : ''}
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>
            ${post.description}
          </p>
          <p class="post-date">
            ${formatDate(post.createdAt)}
          </p>
        </li>`,
   )
   .join("");

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">${allPostsHtml}</ul>
              </div>`;

  appEl.innerHTML = appHtml;

  for (let userEl of document.querySelectorAll(".post-header")) {
   userEl.addEventListener("click", () => {
    goToPage(USER_POSTS_PAGE, {
     userId: userEl.dataset.userId,
    });
   });
  }
 }

 renderHeaderComponent({
  element: document.querySelector(".header-container"),
 });

 addLikeListeners()
}
