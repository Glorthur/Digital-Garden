import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Commonplace Book",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "Glorthur.github.io/Digital-Garden",
    ignorePatterns: [
      "private",
      "templates",
      "Templates",
      "Literature Notes",
      ".obsidian",
      "AGENTS.md",
    ],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Source Serif 4",
        body: "Archivo",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f6f3ec",
          lightgray: "#dedbd3",
          gray: "#a8a49c",
          darkgray: "#423f3a",
          dark: "#1f1b16",
          secondary: "#020617",
          tertiary: "#0f172a",
          highlight: "rgba(2, 6, 23, 0.1)",
          textHighlight: "#bdd0ff99",
        },
        darkMode: {
          light: "#10182d",
          lightgray: "#26334f",
          gray: "#6c7896",
          darkgray: "#d8deee",
          dark: "#f4f7ff",
          secondary: "#7fa2ff",
          tertiary: "#aebfff",
          highlight: "rgba(127, 162, 255, 0.18)",
          textHighlight: "#536fc488",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
