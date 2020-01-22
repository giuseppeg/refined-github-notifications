// ==UserScript==
// @name refined-github-notifications
// @description Add UI improvements to the new GitHub Notifications page
// @version 0.1.1
// @match https://github.com/notifications/beta
// @match https://github.com/notifications/beta?*
// ==/UserScript==
(function () {
  const showAllMessagesParameter = '&show_full=true'

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

  function alwaysShowFull() {
    Array.from(document.querySelectorAll('.notification-list-item-link')).forEach(anchor => {
      if (anchor.search.includes(showAllMessagesParameter)) return
      anchor.href = anchor.href + showAllMessagesParameter
    })
  }

  function applyModifications() {
    addClasses()
    alwaysShowFull()
  }

  document.body.addEventListener('pjax:complete', applyModifications)

  applyModifications()
}())
