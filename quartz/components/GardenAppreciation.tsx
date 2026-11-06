import { QuartzComponent, QuartzComponentConstructor } from "./types"
import style from "./styles/gardenAppreciation.scss"
// @ts-ignore
import script from "./scripts/gardenAppreciation.inline"

/** A reader's marginal mark. Topic indexes and short navigation notes stay quiet. */
export default (() => {
  const GardenAppreciation: QuartzComponent = ({ fileData, cfg }) => {
    const slug = fileData.slug
    if (
      !slug ||
      slug === "index" ||
      fileData.frontmatter?.appreciation === false ||
      (fileData.text?.trim().split(/\s+/).length ?? 0) < 150
    ) {
      return null
    }

    const base = cfg.baseUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "")
    if (!base) return null
    const url = new URL(`https://${base}/${slug}`).href

    return (
      <div class="garden-appreciation" data-note-url={url}>
        <button
          type="button"
          class="garden-mark"
          aria-label="Noted. A quiet nod."
          aria-pressed="false"
          title="A quiet nod. No account required."
        >
          <span class="garden-mark-glyph" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none">
              <path
                class="mark-orbit"
                d="M35 7.8C26 2.5 13 6.6 7.8 16.3C2.6 26 7.3 38.7 17.8 41.3C28.4 44 39.5 36.9 41.1 27.4C41.9 22.8 40.5 17.1 37.8 13.7"
              />
              <g class="mark-strokes">
                <path d="M23 12.5L24.9 35.1" />
                <path d="M13.7 18.4L34.4 29.2" />
                <path d="M14.7 30.4L33.1 17.1" />
              </g>
              <circle class="mark-center" cx="24" cy="24" r="2.6" />
            </svg>
          </span>
          <span class="garden-mark-label">Noted.</span>
        </button>
        <span class="garden-mark-tally" aria-label="Appreciation count">
          <span class="garden-mark-count" hidden></span>
          <span class="garden-mark-unit">quiet nods</span>
        </span>
        <span class="garden-mark-status" role="status" aria-live="polite"></span>
        <noscript>A quiet nod needs JavaScript, but never an account.</noscript>
      </div>
    )
  }

  GardenAppreciation.css = style
  GardenAppreciation.afterDOMLoaded = script
  return GardenAppreciation
}) satisfies QuartzComponentConstructor
