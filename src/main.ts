import { appWindow } from "@tauri-apps/api/window";

let buttonEl: HTMLInputElement;
let messageEl: HTMLElement;

window.addEventListener("DOMContentLoaded", () => {
  buttonEl = document.querySelector("#repro")!;
  messageEl = document.querySelector("#message")!;
  buttonEl.addEventListener('click', async () => {
    const unlisten = await appWindow.onCloseRequested(async (ev) => {
      const confirmed = await confirm('[confirmation message]');
      if (!confirmed) {
          // user did not confirm closing the window; let's prevent it
          ev.preventDefault();
      }
    });
    messageEl.textContent = "Blocked close";
    setTimeout(() => {
      unlisten()
      messageEl.textContent = "Called unlisten(). Try closing now";
    }, 5000);
  })
});
