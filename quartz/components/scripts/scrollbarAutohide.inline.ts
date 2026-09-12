let scrollbarIdleTimer: number | undefined

const showScrollbar = () => {
  document.documentElement.classList.add("is-scrolling")
  window.clearTimeout(scrollbarIdleTimer)
  scrollbarIdleTimer = window.setTimeout(() => {
    document.documentElement.classList.remove("is-scrolling")
  }, 850)
}

document.addEventListener("nav", () => {
  window.addEventListener("scroll", showScrollbar, { passive: true })
  window.addCleanup(() => {
    window.removeEventListener("scroll", showScrollbar)
    window.clearTimeout(scrollbarIdleTimer)
  })
})
