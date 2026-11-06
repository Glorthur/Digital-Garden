import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

import { SortFn, byDateAndAlphabeticalFolderFirst } from "../PageList"
import { Date as DisplayDate, getDate } from "../Date"
import { FullSlug, resolveRelative } from "../../util/path"
import topicStyle from "../styles/gardenTopic.scss"
import { Root } from "hast"
import { htmlToJsx } from "../../util/jsx"
import { QuartzPluginData } from "../../plugins/vfile"
import { ComponentChildren } from "preact"
import { trieFromAllFiles } from "../../util/ctx"

interface FolderContentOptions {
  /**
   * Whether to display number of folders
   */
  showFolderCount: boolean
  showSubfolders: boolean
  sort?: SortFn
}

const defaultOptions: FolderContentOptions = {
  showFolderCount: true,
  showSubfolders: true,
}

const topicIntroductions: Record<string, string> = {
  "Personal-Essays": "Lessons learned, decisions, work stories, and what I’m building toward.",
  "HR--and--People-Ops":
    "People operations, recruiting workflows, and the systems that help teams do good work.",
  "Data--and--Operations":
    "Process, reporting, CRM hygiene, and the practical work of keeping systems reliable.",
  "Data-Migration--and--CRM-Systems":
    "Planning migrations, keeping data clean, and building reporting people can trust.",
  "Career--and--Growth":
    "Communication, professional habits, and the things I’m learning along the way.",
  "Salesforce-BA":
    "Notes on Salesforce, business analysis, and turning requirements into useful systems.",
}

const normalizeTopic = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "")

export default ((opts?: Partial<FolderContentOptions>) => {
  const options: FolderContentOptions = { ...defaultOptions, ...opts }

  const FolderContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { tree, fileData, allFiles, cfg } = props

    const trie = (props.ctx.trie ??= trieFromAllFiles(allFiles))
    const folder = trie.findNode(fileData.slug!.split("/"))
    if (!folder) {
      return null
    }

    const allPagesInFolder: QuartzPluginData[] =
      folder.children
        .map((node) => {
          // regular file, proceed
          if (node.data) {
            return node.data
          }

          if (node.isFolder && options.showSubfolders) {
            // folders that dont have data need synthetic files
            const getMostRecentDates = (): QuartzPluginData["dates"] => {
              let maybeDates: QuartzPluginData["dates"] | undefined = undefined
              for (const child of node.children) {
                if (child.data?.dates) {
                  // compare all dates and assign to maybeDates if its more recent or its not set
                  if (!maybeDates) {
                    maybeDates = { ...child.data.dates }
                  } else {
                    if (child.data.dates.created > maybeDates.created) {
                      maybeDates.created = child.data.dates.created
                    }

                    if (child.data.dates.modified > maybeDates.modified) {
                      maybeDates.modified = child.data.dates.modified
                    }

                    if (child.data.dates.published > maybeDates.published) {
                      maybeDates.published = child.data.dates.published
                    }
                  }
                }
              }
              return (
                maybeDates ?? {
                  created: new Date(),
                  modified: new Date(),
                  published: new Date(),
                }
              )
            }

            return {
              slug: node.slug,
              dates: getMostRecentDates(),
              frontmatter: {
                title: node.displayName,
                tags: [],
              },
            }
          }
        })
        .filter((page) => page !== undefined) ?? []
    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = cssClasses.join(" ")
    const overview = allPagesInFolder.find(
      (page) =>
        normalizeTopic(page.frontmatter?.title ?? "") === normalizeTopic(folder.displayName) &&
        (page.text?.trim().split(/\s+/).length ?? 0) < 200 &&
        page.filePath,
    )
    const notes = allPagesInFolder
      .filter((page) => page !== overview)
      .sort(options.sort ?? byDateAndAlphabeticalFolderFirst(cfg))
    const introduction =
      topicIntroductions[folder.slugSegment] ??
      "Notes, questions, and work in progress from this part of the garden."

    const content = (
      (tree as Root).children.length === 0
        ? fileData.description
        : htmlToJsx(fileData.filePath!, tree)
    ) as ComponentChildren

    return (
      <div class="popover-hint garden-topic">
        <div class="topic-introduction">
          <p>{introduction}</p>
          {overview && (
            <a class="topic-about internal" href={resolveRelative(fileData.slug!, overview.slug!)}>
              About this collection <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
        {(tree as Root).children.length > 0 && (
          <article class={`topic-authored-intro ${classes}`}>{content}</article>
        )}
        <section class="topic-listing" aria-label={`Notes in ${folder.displayName}`}>
          <div class="topic-list-heading">
            <h2>In this collection</h2>
            {options.showFolderCount && (
              <span>
                {notes.length} {notes.length === 1 ? "note" : "notes"}
              </span>
            )}
          </div>
          <ul class="topic-notes">
            {notes.map((page) => {
              const title = page.frontmatter?.title ?? "Untitled note"
              const date = page.filePath ? getDate(cfg, page) : undefined
              const tags = page.frontmatter?.tags ?? []
              const description = page.description
                ?.replace(
                  new RegExp(`^${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*`, "i"),
                  "",
                )
                .trim()
              const excerpt =
                description && description.length > 185
                  ? description.slice(0, 185).replace(/\s+\S*$/, "") + "…"
                  : description
              return (
                <li class="topic-note" key={page.slug}>
                  <h3>
                    <a class="internal" href={resolveRelative(fileData.slug!, page.slug!)}>
                      {title}
                    </a>
                  </h3>
                  {excerpt && <p class="topic-excerpt">{excerpt}</p>}
                  <div class="topic-note-meta">
                    {date && (
                      <span class="topic-date">
                        Tended <DisplayDate date={date} locale={cfg.locale} />
                      </span>
                    )}
                    {tags.length > 0 && (
                      <ul class="topic-tags" aria-label="Tags">
                        {tags.map((tag) => (
                          <li key={tag}>
                            <a
                              class="internal topic-tag"
                              href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                            >
                              #{tag}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
          {notes.length === 0 && <p class="topic-empty">Nothing planted here just yet.</p>}
        </section>
      </div>
    )
  }

  FolderContent.css = topicStyle
  return FolderContent
}) satisfies QuartzComponentConstructor
