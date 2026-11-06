# Reader nods

The garden uses a custom SVG marginal mark, not an emoji or a third-party widget.
The label changes from **Noted.** to **Duly noted.** after a confirmed save.

The component appears below notes with at least 150 words. It does not appear on
the homepage or generated topic lists. A note can opt out with `appreciation: false`
in its frontmatter. Article contents do not need editing to enable the feature.

## Counts and reader state

Counts are served by the community endpoint `https://applause.chabouis.fr`, which
is the alternative documented in the upstream [applause-button project](https://github.com/ColinEberhardt/applause-button).
The interface calls its `get-claps` and `update-claps` endpoints directly; no
remote JavaScript is embedded. Requests omit credentials. Readers need no account.
As with any external request, the service receives the network IP and note URL.

Each note uses its configured production URL, independent of query strings,
fragments, local previews, or `.html` aliases. The browser stores a successful nod
in localStorage to prevent casual repeat taps. When storage is unavailable, the
state lasts for the current visit. These are appreciation counts, not verified
unique people. Clearing storage or using another device can allow another nod.

This is a free community service without an uptime guarantee. If unavailable,
the count is not fabricated and the control offers a retry. The article remains
readable. To move to a different compatible backend, change `appreciationApi` in
`quartz/components/scripts/gardenAppreciation.inline.ts` and rebuild. Keep canonical
note URLs stable to preserve count identity.

## Verification

Run `node --test tests/garden-appreciation.test.mjs` for network failure, repeat
submission, rate limiting, private storage, and stale-response checks. Use a
dedicated non-article URL for live save tests so QA does not inflate reader counts.
