// ==UserScript==
// @name refined-github-notifications
// @description Add UI improvements to the new GitHub Notifications page
// @version 0.1.0
// @match https://github.com/notifications/*
// ==/UserScript==
(function () {
  function addClasses() {
    Array.from(document.querySelectorAll('.Label')).forEach(label => {
      const labelName = label.textContent.trim().replace(/\s+([a-z])/, (...args) => args[1].toUpperCase())
      if (labelName.startsWith('+')) { return }
      label.classList.add('rgn-Label')
      label.classList.add(`rgn-Label--${labelName}`)
      const container = label.closest('li').firstElementChild
      container.classList.add(`rgn-Item`)
      container.classList.add(`rgn-Item--${labelName}`)
    })
  }

  document.body.addEventListener('pjax:complete', addClasses)

  addClasses()
}())
