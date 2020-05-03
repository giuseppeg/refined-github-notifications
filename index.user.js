// ==UserScript==
// @name refined-github-notifications
// @description Add UI improvements to the new GitHub Notifications page
// @version 0.1.3
// @match https://github.com/notifications
// @match https://github.com/notifications?*
// ==/UserScript==
(function() {
  const showAllMessagesParameter = "show_full=true";

  function addClasses() {
    Array.from(document.querySelectorAll(".Label")).forEach((label) => {
      const labelName = label.textContent
        .trim()
        .replace(/\s+([a-z])/, (...args) => args[1].toUpperCase());
      let container = label.closest("li");
      if (
        labelName.startsWith("+") ||
        !container ||
        !(container = container.firstElementChild)
      ) {
        return;
      }
      label.classList.add("rgn-Label");
      label.classList.add(`rgn-Label--${labelName}`);
      container.classList.add(`rgn-Item`);
      container.classList.add(`rgn-Item--${labelName}`);
    });
  }

  function alwaysShowFull() {
    Array.from(
      document.querySelectorAll(".notification-list-item-link")
    ).forEach((anchor) => {
      if (anchor.search.includes(showAllMessagesParameter)) return;
      anchor.search +=
        (anchor.search.startsWith("?") ? "&" : "?") + showAllMessagesParameter;
    });
  }

  function applyModifications() {
    addClasses();
    alwaysShowFull();
  }

  document.body.addEventListener("pjax:complete", applyModifications);

  applyModifications();
})();
