import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const GardenRail: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.slug !== "index") return null

  return (
    <aside class="garden-rail" aria-label="Garden overview">
      <section class="garden-now">
        <p class="garden-rail-label">
          <span aria-hidden="true"></span> Now tending
        </p>
        <p class="garden-now-intro">Notes, systems, questions, and ongoing experiments.</p>
        <ul>
          <li>
            <span class="is-seedling" aria-hidden="true"></span>
            <a href="./Data--and--Operations/Data-and-Operations">Reporting people can trust</a>
          </li>
          <li>
            <span class="is-budding" aria-hidden="true"></span>
            <a href="./Data--and--Operations/Systems">Systems that don’t break at handoff</a>
          </li>
          <li>
            <span class="is-seedling" aria-hidden="true"></span>
            <a href="./HR--and--People-Ops/HR-and-People-Ops">People Ops as an operating system</a>
          </li>
        </ul>
        <div class="garden-rail-legend" aria-label="Note maturity legend">
          <span>
            <i class="is-seedling"></i>Seedling
          </span>
          <span>
            <i class="is-budding"></i>Budding
          </span>
          <span>
            <i class="is-evergreen"></i>Evergreen
          </span>
        </div>
      </section>

      <section class="garden-rail-section">
        <p class="garden-rail-label">Threading</p>
        <div class="garden-tags">
          <a href="./tags/crm">crm</a>
          <a href="./tags/migration">migration</a>
          <a href="./tags/systems-thinking">systems-thinking</a>
          <a href="./tags/people-ops">people-ops</a>
          <a href="./tags/reporting">reporting</a>
          <a href="./tags/career">career</a>
          <a href="./tags/learning">learning</a>
        </div>
      </section>

      <section class="garden-rail-section garden-elsewhere">
        <p class="garden-rail-label">Elsewhere</p>
        <a class="garden-elsewhere-link" href="https://glorthur.github.io/">
          <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
            <path
              d="M7 17 17 7M9 7h8v8"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
            />
          </svg>
          <span>Portfolio</span>
        </a>
        <a class="garden-elsewhere-link" href="https://github.com/Glorthur">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.2-3.37-1.2-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.91c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.79 0 .27.18.6.69.49A10.23 10.23 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
          </svg>
          <span>GitHub</span>
        </a>
      </section>
    </aside>
  )
}

export default (() => GardenRail) satisfies QuartzComponentConstructor
