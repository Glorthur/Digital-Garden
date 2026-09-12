// @ts-ignore
import scrollbarAutohideScript from "./scripts/scrollbarAutohide.inline"
import styles from "./styles/scrollbarAutohide.scss"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ScrollbarAutohide: QuartzComponent = () => (
  <span aria-hidden="true" class="scrollbar-autohide" />
)

ScrollbarAutohide.beforeDOMLoaded = scrollbarAutohideScript
ScrollbarAutohide.css = styles

export default (() => ScrollbarAutohide) satisfies QuartzComponentConstructor
