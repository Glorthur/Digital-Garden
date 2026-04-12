---
draft: true
dg-publish: false
---

# Obsidian Vault Workflow

This vault is an active Obsidian workspace, not a dumping ground.

Use the `notebooklm` skill when research requires cross-document retrieval or grounded synthesis.
Use the `wrap-up` skill when preserving durable session context.
Use the `humanizer` skill as a mandatory final pass for article drafts, essays, newsletters, blog posts, and any other public-facing prose.

## Vault Rules

- Prefer writing research notes under `Research & Writing/`.
- Keep note titles human-readable and stable.
- Use YAML frontmatter on generated notes.
- Add Obsidian wikilinks for major concepts, methods, theories, countries, and domains.
- Do not create vague files like `notes.md`, `thoughts.md`, or `untitled.md`.
- Do not spam the vault with raw command logs or test artifacts.
- Do not treat a first-pass draft as final if it has not gone through `humanizer`.
- For publishable prose, the final saved version must be the humanized version, not the raw draft.

## Research Notes

Place NotebookLM-driven literature outputs here:

- `Research & Writing/Literature Notes/`
- `Research & Writing/Syntheses/`
- `Research & Writing/Session Summaries/`

For literature synthesis notes, include:

- `title`
- `type`
- `topic`
- `created`
- `source_notebook`
- `tags`

Use sections in this order:

1. `Research Question`
2. `Grounded Synthesis`
3. `Theoretical Lenses`
4. `Empirical Findings`
5. `Methodological Patterns`
6. `Contradictions`
7. `Ghana-Specific Evidence`
8. `Research Gaps`
9. `Linked Concepts`

## Public-facing prose

For articles, essays, and polished opinion pieces, use this sequence:

1. Ground the topic with `notebooklm` if the piece depends on external sources.
2. Draft the piece.
3. Run a full final pass with `humanizer`.
4. Save both files only if useful:
   - raw draft in `Research & Writing/Syntheses/`
   - final version in `Research & Writing/Articles/`

The `humanizer` pass is not optional for publishable prose.
Remove AI-pattern language, empty grandstanding, em-dash abuse, rule-of-three sludge, and fake authority phrasing.
Keep the evidence and the intended voice.
For article requests, always create:
1. an Obsidian-native article brief in `Research & Writing/Syntheses/`
2. the final humanized article in `Research & Writing/Articles/`

## Linking Rules

Prefer wikilinks such as:

- `[[Corporate Governance]]`
- `[[Board Composition]]`
- `[[Board Size]]`
- `[[Gender Diversity]]`
- `[[Agency Theory]]`
- `[[Resource Dependence Theory]]`
- `[[Ghana]]`

If the note does not exist yet, still create the wikilink if the concept is central.

## Wrap-Up Notes

Session summaries belong in `Research & Writing/Session Summaries/`.
Keep them compact and retrieval-oriented.

Never describe NotebookLM as "memory" without qualification. It is external retrieval over stored notes.
