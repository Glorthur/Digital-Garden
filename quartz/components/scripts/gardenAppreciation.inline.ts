// No accounts, analytics script, or cookies; the browser remembers its own nod.
// The community applause API is documented by ColinEberhardt/applause-button.
const appreciationApi = "https://applause.chabouis.fr"
const notedThisVisit = new Set<string>()

document.addEventListener("nav", () => {
  const root = document.querySelector<HTMLElement>(".garden-appreciation")
  if (!root) return
  const url = root.dataset.noteUrl!
  const button = root.querySelector<HTMLButtonElement>(".garden-mark")!
  const label = root.querySelector<HTMLElement>(".garden-mark-label")!
  const count = root.querySelector<HTMLElement>(".garden-mark-count")!
  const unit = root.querySelector<HTMLElement>(".garden-mark-unit")!
  const status = root.querySelector<HTMLElement>(".garden-mark-status")!
  const storageKey = `garden:nod:${url}`
  let saved = notedThisVisit.has(url)
  let busy = false
  let loaded = false
  let total: number | undefined
  const lifecycle = new AbortController()

  try {
    saved = saved || localStorage.getItem(storageKey) === "1"
  } catch {
    /* Private browsing is welcome. */
  }

  const renderSaved = () => {
    button.setAttribute("aria-pressed", String(saved))
    if (saved) {
      button.setAttribute("aria-disabled", "true")
      button.setAttribute("aria-label", "Duly noted. Your quiet nod is saved.")
      button.title = "Your quiet nod is saved."
      label.textContent = "Duly noted."
    }
  }
  const renderCount = (value: number) => {
    total = Math.max(total ?? 0, value)
    count.textContent = total.toLocaleString("en")
    count.hidden = false
    unit.textContent = total === 1 ? "quiet nod" : "quiet nods"
  }
  const request = async (action: "get-claps" | "update-claps") => {
    const timeout = AbortSignal.timeout(10000)
    const response = await fetch(`${appreciationApi}/${action}?url=${encodeURIComponent(url)}`, {
      method: action === "get-claps" ? "GET" : "POST",
      ...(action === "update-claps"
        ? {
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify("1,4.0.7"),
          }
        : {}),
      credentials: "omit",
      cache: "no-store",
      signal: AbortSignal.any([lifecycle.signal, timeout]),
    })
    if (!response.ok) throw new Error("Count service unavailable")
    const text = (await response.text()).trim()
    const value = Number(text)
    if (!text || !Number.isSafeInteger(value) || value < 0) throw new Error("Invalid count")
    return value
  }
  const load = async () => {
    if (loaded || busy) return
    loaded = true
    try {
      renderCount(await request("get-claps"))
    } catch {
      if (lifecycle.signal.aborted) return
      loaded = false
      if (total === undefined) unit.textContent = "count taking a moment"
    }
  }
  const onClick = async () => {
    if (saved || busy) return
    busy = true
    button.setAttribute("aria-busy", "true")
    status.textContent = ""
    label.textContent = "One moment…"
    try {
      // Re-read first, so a failed initial load never turns into an invented total.
      const before = await request("get-claps")
      const after = await request("update-claps")
      renderCount(after)
      if (after <= before) {
        label.textContent = "Noted."
        status.textContent = "The ink needs a moment. Try again shortly."
        return
      }
      saved = true
      notedThisVisit.add(url)
      try {
        localStorage.setItem(storageKey, "1")
      } catch {
        /* Keep this visit's state in memory. */
      }
      renderSaved()
      status.textContent = "Your quiet nod is saved."
    } catch {
      if (lifecycle.signal.aborted) return
      label.textContent = "Noted."
      status.textContent = "The ink is taking its time. Try again in a moment."
    } finally {
      busy = false
      button.removeAttribute("aria-busy")
    }
  }

  // Cross-tab updates keep this browser from offering the same nod twice.
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey && event.newValue === "1") {
      saved = true
      notedThisVisit.add(url)
      renderSaved()
      loaded = false
      void load()
    }
  }
  renderSaved()
  button.addEventListener("click", onClick)
  window.addEventListener("storage", onStorage)
  // Fetch only when the end of the article comes into view.
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect()
        void load()
      }
    },
    { rootMargin: "200px" },
  )
  observer.observe(root)
  window.addCleanup(() => {
    lifecycle.abort()
    observer.disconnect()
    button.removeEventListener("click", onClick)
    window.removeEventListener("storage", onStorage)
  })
})
