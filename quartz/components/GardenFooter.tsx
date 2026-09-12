import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { version } from "../../package.json"

const GardenFooter: QuartzComponent = (_props: QuartzComponentProps) => {
  const year = new Date().getFullYear()

  return (
    <footer class="garden-footer">
      <p>
        Created with <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
      </p>
      <nav aria-label="Elsewhere">
        <a class="garden-footer-portfolio" href="https://glorthur.github.io/">
          Portfolio
        </a>
        <a
          class="garden-social"
          href="https://github.com/Glorthur"
          aria-label="GitHub"
          title="GitHub"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.33 6.84 9.68.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.2-3.37-1.2-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.67.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.91c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.79 0 .27.18.6.69.49A10.23 10.23 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
          </svg>
        </a>
        <a
          class="garden-social"
          href="https://www.linkedin.com/in/gloria-arthur-536070150"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.37 3.5A1.87 1.87 0 1 1 1.63 3.5a1.87 1.87 0 0 1 3.74 0ZM1.9 8.1h3v12h-3v-12ZM7 8.1h2.88v1.64h.04c.4-.76 1.38-1.96 2.84-1.96 3.04 0 3.6 2.05 3.6 4.71v7.61h-3v-6.75c0-1.61-.03-3.68-2.19-3.68-2.2 0-2.54 1.76-2.54 3.56v6.87H5.63v-12H7Z" />
          </svg>
        </a>
      </nav>
    </footer>
  )
}

export default (() => GardenFooter) satisfies QuartzComponentConstructor
