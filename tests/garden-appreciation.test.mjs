import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import vm from "node:vm"
import { transformSync } from "esbuild"

const source = transformSync(
  readFileSync(
    new URL("../quartz/components/scripts/gardenAppreciation.inline.ts", import.meta.url),
    "utf8",
  ),
  { loader: "ts" },
).code

function harness(fetchImpl, { blockedStorage = false } = {}) {
  const storage = new Map()
  const listeners = {}
  const cleanups = []
  const elements = new Map()
  const requests = []
  let onIntersect
  const getElement = (selector) => {
    if (!elements.has(selector)) {
      elements.set(selector, {
        attributes: {},
        handlers: {},
        textContent: "",
        hidden: true,
        setAttribute(key, value) {
          this.attributes[key] = value
        },
        removeAttribute(key) {
          delete this.attributes[key]
        },
        addEventListener(key, callback) {
          this.handlers[key] = callback
        },
        removeEventListener(key) {
          delete this.handlers[key]
        },
      })
    }
    return elements.get(selector)
  }
  const root = {
    dataset: { noteUrl: "https://glorthur.github.io/Digital-Garden/a-note" },
    querySelector: getElement,
  }
  const context = vm.createContext({
    document: {
      addEventListener: (event, callback) => {
        listeners[event] = callback
      },
      querySelector: () => root,
    },
    window: {
      addEventListener: (event, callback) => {
        listeners[event] = callback
      },
      removeEventListener: (event) => {
        delete listeners[event]
      },
      addCleanup: (callback) => cleanups.push(callback),
    },
    localStorage: {
      getItem: (key) => {
        if (blockedStorage) throw Error("blocked")
        return storage.get(key)
      },
      setItem: (key, value) => {
        if (blockedStorage) throw Error("blocked")
        storage.set(key, value)
      },
    },
    IntersectionObserver: class {
      constructor(callback) {
        onIntersect = callback
      }
      observe() {}
      disconnect() {}
    },
    AbortController,
    AbortSignal,
    encodeURIComponent,
    fetch: async (url, options) => {
      requests.push({ url, ...options })
      return fetchImpl(url, options)
    },
  })
  vm.runInContext(source, context)
  listeners.nav()
  return {
    element: getElement,
    requests,
    storage,
    click: () => getElement(".garden-mark").handlers.click(),
    intersect: () => onIntersect([{ isIntersecting: true }]),
    cleanup: () => cleanups.splice(0).forEach((cleanup) => cleanup()),
    navigate: () => {
      cleanups.splice(0).forEach((cleanup) => cleanup())
      listeners.nav()
    },
  }
}
const response = (count) => ({ ok: true, text: async () => String(count) })

test("saves one nod, uses anonymous requests, and prevents double submissions", async () => {
  const h = harness(async (_url, options) => response(options.method === "POST" ? 9 : 8))
  await Promise.all([h.click(), h.click()])
  assert.equal(h.requests.filter((request) => request.method === "POST").length, 1)
  assert.ok(h.requests.every((request) => request.credentials === "omit"))
  assert.equal(h.element(".garden-mark-count").textContent, "9")
  assert.equal(h.element(".garden-mark-label").textContent, "Duly noted.")
  h.navigate()
  assert.equal(h.element(".garden-mark").attributes["aria-pressed"], "true")
  await h.click()
  assert.equal(h.requests.length, 2)
  h.cleanup()
})

test("a network failure never invents a count or remembers a failed nod", async () => {
  const h = harness(async () => {
    throw Error("offline")
  })
  await h.click()
  assert.equal(h.storage.size, 0)
  assert.equal(h.element(".garden-mark-count").hidden, true)
  assert.equal(h.element(".garden-mark-label").textContent, "Noted.")
  assert.match(h.element(".garden-mark-status").textContent, /Try again/)
  assert.equal(h.element(".garden-mark").attributes["aria-busy"], undefined)
  h.cleanup()
})

test("a server rate limit is not presented as a saved reaction", async () => {
  const h = harness(async () => response(8))
  await h.click()
  assert.equal(h.storage.size, 0)
  assert.notEqual(h.element(".garden-mark").attributes["aria-pressed"], "true")
  assert.match(h.element(".garden-mark-status").textContent, /Try again/)
  h.cleanup()
})

test("private browsing still remembers a nod during navigation", async () => {
  const h = harness(async (_url, options) => response(options.method === "POST" ? 1 : 0), {
    blockedStorage: true,
  })
  await h.click()
  h.navigate()
  assert.equal(h.element(".garden-mark").attributes["aria-pressed"], "true")
  await h.click()
  assert.equal(h.requests.length, 2)
  h.cleanup()
})

test("a late initial read cannot overwrite a newer saved total", async () => {
  let finishInitialRead
  let reads = 0
  const h = harness(async (_url, options) => {
    if (options.method === "POST") return response(9)
    reads += 1
    if (reads === 1)
      return new Promise((resolve) => {
        finishInitialRead = () => resolve(response(8))
      })
    return response(8)
  })
  h.intersect()
  await h.click()
  finishInitialRead()
  await new Promise((resolve) => setImmediate(resolve))
  assert.equal(h.element(".garden-mark-count").textContent, "9")
  h.cleanup()
})
