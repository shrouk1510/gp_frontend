export function getAllCookies() {
  const cookies = {};
  const documentCookie = document.cookie;
  const cookiePairs = documentCookie.split(";");

  for (const cookiePair of cookiePairs) {
    if (cookiePair.includes('=')) {
      const [key, value] = cookiePair.trim().split("=");
      cookies[key] = value;
    }
  }

  return cookies;
}
