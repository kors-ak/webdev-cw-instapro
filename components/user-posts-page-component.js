import { renderHeaderComponent } from "./header-component.js";
import { posts } from "../index.js";
import { formatDate, sanitizeHtml } from "../helpers.js";

export function renderUserPostsPageComponent({ appEl }) {
 const allPostsHtml = posts
  .map(
   (post) => `
        <li class="post">
          <div class="post-image-container">
            <img class="post-image" src="${sanitizeHtml(post.imageUrl)}">
          </div>
          <div class="post-likes" data-post-id="${post.id}">
            <button class="like-button" data-is-liked="${post.isLiked}">
              <img src="./assets/images${post.isLiked ? "/like-active.svg" : "/like-not-active.svg"}">
            </button>
            <p class="post-likes-text">
              Нравится: ${post.likes.length === 0 ? '<strong>0</strong>' : `<strong>${sanitizeHtml(post.likes[Math.floor(Math.random() * post.likes.length)].name)}</strong>`} ${post.likes.length >= 2 ? `и ещё <strong>${post.likes.length - 1}</strong>` : ''}
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${sanitizeHtml(post.user.name)}</span>
            ${sanitizeHtml(post.description)}
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
                    <img src="${sanitizeHtml(posts[0].user.imageUrl)}" class="posts-user-header__user-image">
                    <p class="posts-user-header__user-name">${sanitizeHtml(posts[0].user.name)}</p>
                </div>
                <ul class="posts">${allPostsHtml}</ul>
              </div>`;

 appEl.innerHTML = appHtml;

 renderHeaderComponent({
  element: document.querySelector(".header-container"),
 });
}
