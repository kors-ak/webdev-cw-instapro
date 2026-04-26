export function saveUserToLocalStorage(user) {
 window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
 try {
  return JSON.parse(window.localStorage.getItem("user"));
 } catch (error) {
  return null;
 }
}

export function removeUserFromLocalStorage(user) {
 window.localStorage.removeItem("user");
}

export function sanitizeHtml(text) {
 String(text)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");
}

function getPluralForm(number, one, two, five) {
 const lastDigit = number % 10;
 const lastTwoDigits = number % 100;

 if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
  return five;
 }

 switch (lastDigit) {
  case 1:
   return one;
  case 2:
  case 3:
  case 4:
   return two;
  default:
   return five;
 }
}

export function formatDate(data) {
 const date = new Date(data);
 const now = new Date();
 const diffInMs = now - date;

 const diffInSeconds = Math.floor(diffInMs / 1000);
 const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
 const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
 const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
 const diffInMonths = Math.floor(diffInDays / 30);
 const diffInYears = Math.floor(diffInDays / 365);

 let result;

 switch (true) {
  case diffInSeconds < 60:
   result = "только что";
   break;

  case diffInMinutes < 60: {
   const word = getPluralForm(diffInMinutes, "минуту", "минуты", "минут");
   result = `${diffInMinutes} ${word} назад`;
   break;
  }

  case diffInHours < 24: {
   const word = getPluralForm(diffInHours, "часа", "часов", "часов");
   result = `около ${diffInHours} ${word} назад`;
   break;
  }

  case diffInDays < 30: {
   const word = getPluralForm(diffInDays, "день", "дня", "дней");
   result = `${diffInDays} ${word} назад`;
   break;
  }

  case diffInMonths < 12: {
   const word = getPluralForm(diffInMonths, "месяца", "месяцев", "месяцев");
   result = `около ${diffInMonths} ${word} назад`;
   break;
  }

  default: {
   const word = getPluralForm(diffInYears, "год", "года", "лет");
   result = `${diffInYears} ${word} назад`;
   break;
  }
 }

 return result;
}
