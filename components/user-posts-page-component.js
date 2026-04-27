import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";
import { formatDate } from "../helpers.js";
import { addLikeListeners } from "../initLikeListener.js";

export function renderUserPostsPageComponent({ appEl }) {
 const allPostsHtml = posts
  .map(
   (post) => `
        <li class="post">
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
                <div class="posts-user-header">
                    <img src="${posts[0].user.imageUrl}" class="posts-user-header__user-image">
                    <p class="posts-user-header__user-name">${posts[0].user.name}</p>
                </div>
                <ul class="posts">${allPostsHtml}</ul>
              </div>`;

 appEl.innerHTML = appHtml;

 renderHeaderComponent({
  element: document.querySelector(".header-container"),
 });

 addLikeListeners()
}
