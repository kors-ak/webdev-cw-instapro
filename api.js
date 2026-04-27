const baseHost = "https://wedev-api.sky.pro/api";
const postsHost = `${baseHost}/v1/korsak/instapro`;

export function getPosts({ token }) {
 return fetch(postsHost, {
  method: "GET",
  headers: {
   Authorization: token,
  },
 })
  .then((response) => {
   if (response.status === 401) {
    throw new Error("Нет авторизации");
   }

   return response.json();
  })
  .then((data) => {
   return data.posts;
  });
}

export function getUserPosts(token, data) {
 return fetch(postsHost + `/user-posts/${data.userId}`, {
  method: "GET",
  headers: {
   Authorization: token,
  },
 })
  .then((response) => {
   if (response.status === 401) {
    throw new Error("Нет авторизации");
   }

   return response.json();
  })
  .then((data) => {
   return data.posts;
  });
}

export function addPost(token, description, imageUrl) {
 return fetch(postsHost, {
  method: "POST",
  headers: {
   Authorization: token,
  },
  body: JSON.stringify({
   description,
   imageUrl,
  }),
 }).then((response) => {
  if (!response.ok) {
   return response.json().then((errorData) => {
    throw new Error(errorData.error || "Ошибка на сервере");
   });
  }
  return response.json();
 });
}

export function likePost(token, postId) {
 return fetch(postsHost + `/${postId}/like`, {
  method: "POST",
  headers: {
   Authorization: token,
  },
 }).then((response) => {
  if (!response.ok) {
   return response.json().then((errorData) => {
    throw new Error(errorData.error || "Ошибка на сервере");
   });
  }
  return response.json();
 });
}

export function dislikePost(token, postId) {
 return fetch(postsHost + `/${postId}/dislike`, {
  method: "POST",
  headers: {
   Authorization: token,
  },
 }).then((response) => {
  if (!response.ok) {
   return response.json().then((errorData) => {
    throw new Error(errorData.error || "Ошибка на сервере");
   });
  }
  return response.json();
 });
}


export function registerUser({ login, password, name, imageUrl }) {
 return fetch(baseHost + "/user", {
  method: "POST",
  body: JSON.stringify({
   login,
   password,
   name,
   imageUrl,
  }),
 }).then((response) => {
  if (response.status === 400) {
   throw new Error("Такой пользователь уже существует");
  }
  return response.json();
 });
}

export function loginUser({ login, password }) {
 return fetch(baseHost + "/user/login", {
  method: "POST",
  body: JSON.stringify({
   login,
   password,
  }),
 }).then((response) => {
  if (response.status === 400) {
   throw new Error("Неверный логин или пароль");
  }
  return response.json();
 });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
 const data = new FormData();
 data.append("file", file);

 return fetch(baseHost + "/upload/image", {
  method: "POST",
  body: data,
 }).then((response) => {
  return response.json();
 });
}
