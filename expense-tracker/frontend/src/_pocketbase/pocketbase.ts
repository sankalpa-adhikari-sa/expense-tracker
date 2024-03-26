import PocketBase from "pocketbase";
// export const url = process.env.NEXT_PUBLIC_BASE_URL;
// export const url = "http://127.0.0.1:8080";
export const url = "http://wails.localhost:8080";
const pb = new PocketBase(url);

typeof document !== "undefined" && pb.authStore.loadFromCookie(document.cookie);

pb.authStore.onChange(() => {
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
});
export default pb;
