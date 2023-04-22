export function register() {
  if ("serviceWorker" in navigator) {
    const onsuccess = () => console.log("[Service Worker] Registered");
    const onfailure = () => console.log("[Service Worker] Failed");

    navigator.serviceWorker
      .register("firebase-messaging-sw.js")
      .then(onsuccess)
      .catch(onfailure);
  }
}
