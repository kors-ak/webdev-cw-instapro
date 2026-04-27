import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
 const render = () => {
  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="form">
        <h3 class="form-title">
          Cтраница добавления поста
        </h3>
        <div class="form-inputs">
          <div class="upload-image-container"></div>
          <input type="text" id="text-input" class="input" placeholder="Введите текст" />
          <div class="form-error"></div>
        </div>
      </div>
      <button class="button" id="add-button">Добавить</button>
    </div>
  `;
  appEl.innerHTML = appHtml;
 };

 render();

 renderHeaderComponent({
  element: document.querySelector(".header-container"),
 });
 document.querySelector(".add-post-sign").style.visibility = "hidden";

 const uploadImageContainer = appEl.querySelector(".upload-image-container");
 let imageUrl = "";

 if (uploadImageContainer) {
  renderUploadImageComponent({
   element: uploadImageContainer,
   onImageUrlChange(newImageUrl) {
    imageUrl = newImageUrl;
   },
  });
 }

 document.getElementById("add-button").addEventListener("click", () => {
  let text = document.getElementById("text-input").value;

  onAddPostClick({
   description: `${text}`,
   imageUrl: `${imageUrl}`,
  });
 });
}
