---
title: "Two subscriptions and a watcher script: notes from a month of running an AI team"
description: "A month of running fifteen AI agents taught me about delegation, review, and the work that gets lost between handoffs."
tags: [systems, people-ops, ai, working-notes]
status: published
draft: false
dg-publish: true
date: 2026-11-05
created: 2026-11-05
modified: 2026-11-05
---

In September I wrote about [[The Architecture of Collaboration - What Systems Thinking Is Teaching Me About People Operations|what systems thinking was teaching me about people operations]]. I didn't expect the follow-up to come from a task board on my laptop.

For about a month I've been running a small team of AI agents. When I started, I assumed the hard part would be the agents getting things wrong. That happened, but it was rarely what stopped the work. Most of what I ended up managing was the space between them, and my own instructions.

The work itself is mostly research and writing: research notes, source-checked reports and process documents. One process document, for example, needed two review rounds before someone new could follow it. The section "Briefs became contracts" explains why.

I named most of them after characters from Chimamanda Ngozi Adichie's *Half of a Yellow Sun*. That felt funny at the start, and less funny the first time I had to explain to myself why Ugwu had gone quiet. Some write first drafts. Some check. One summarises my day at half past nine every morning. Ugwu, the houseboy who notices everything, does the mechanical pre-checks. Kainene, sharp and impossible to impress, is the reviewer: she runs on a more expensive model and is only allowed to look at something twice. As I write this, Olanna is in an error state, and I haven't fixed it yet.

There are fifteen of them on the board now, which sounds like an attempt to boil the ocean. In practice, each has one narrow job, a pre-check, a digest or a review, and most sit idle until that job comes round. Fifteen tells you how finely the work is divided. The lessons came from a handful of tasks.

![[Personal Essays/assets/managing-agents/01_dashboard_blurred.png|The dashboard, with agent and task names blurred]]

The dashboard says the whole thing costs $0.00. That's true, misleading, and a good place to start.

## The real budget is hours in a usage window

Most of the agents run on two subscriptions to the same chat AI. Neither charges per task. Each has a usage window instead, and when the window runs out, work stops mid-sentence.

The first time it happened was 14:49 on a Monday. One account hit its limit and four agents stopped at once. I'd already written a small script to swap the default account when that happens, and it did. The work still didn't restart. The second account had never been given permission to be used by those agents, and fixing that took one toggle in a settings page I'd never opened. Nothing in the logs mentioned permission. They just said the run had failed.

So the budget I actually manage is time inside a window. Once I saw that, I started routing work the way you'd staff a team. The most expensive model does the thinking at the start: it writes the detailed brief for each task, decides how a big job should be split, and sets out what "done" means. First drafts go to a mid-tier model working from that brief. Mechanical checks go to a cheap one. Then the expensive model returns as the reviewer, and Kainene gets one full review and one follow-up check per task, and no more.

Expensive judgement at both ends, cheaper hands in the middle. I broke that rule once, by toggling a setting on a paused task. The board woke Kainene, and I sat there watching her carefully critique work nobody needed.

## The cheapest agent made a backup and went home

On one task, I gave the work to the cheapest agent because I wanted to save the better account for later. It was also the only agent on the board I hadn't named after a character. The agent ran for ninety seconds, made a backup of the file, left a note saying the work was "still incomplete", and then stopped. When I woke it again, it did exactly the same thing.

When I moved the task to the stronger agent, it worked for fifty minutes and finished.

This was a familiar management mistake. I gave a hard, open-ended job to the most junior person on the team because they were cheaper, and then I was surprised when they did the safe, visible part and stopped. The rule I wrote down afterwards is boring and correct: anything that must be complete goes to someone who can complete it. Cheaper hands fix numbered findings. First passes go to the stronger agent.

## Most failures were handoffs

![[Personal Essays/assets/managing-agents/02_agent-org-chart_blurred.png|The agent org chart, names blurred]]

Here are a few that actually happened.

- **The botched split.** A big job was split, and the remainder went to a new task, which failed twice. First, nobody was told, so it sat assigned and untouched for two and a half hours while its agent idled. Then, when it finally ran, the agent stopped after a few minutes and asked where the working files were and whether it was allowed to edit them. Fair question. The split had copied the job and left out the one paragraph that said where the files lived and what it was cleared to touch. It parked the task as "in review" with no reviewer on it, and it stayed there all night.
- **Waiting for feedback that had already arrived.** Another task got stuck because the board believed it was still waiting for a review. The review had come back an hour earlier. Every time I woke the agent, the board cancelled the run with a note saying it was waiting for feedback. None of these failures produced an obvious error; each one stopped with a polite message. The only way out was to open a fresh task that said "continuation, do not start over" and point it at the old one.
- **The reviewer who finished and was marked as failed.** Ugwu did a full pre-review and approved the work, and the run was recorded as an error. After that the board stopped sending it anything, because you don't wake an agent in an error state. Two tasks queued up behind it, even though it had finished its work correctly.
- **Prompts too long to start.** The same reviewer crashed outright on any brief longer than about twenty thousand characters. The fix was to write the brief to a file and send a one-line prompt: read the whole file first.

A smarter model wouldn't have fixed any of these. They needed someone watching the handoffs.

So the watcher script grew. Every two minutes it now checks for reviewers that have gone quiet, authors who haven't picked up returned work, new tasks nobody has started, tasks parked for review with no reviewer, and tasks stuck in that waiting state. It nudges, it opens continuation tasks, and it writes anything that needs me into a small text file instead of guessing. In effect, I built a line manager, one that follows its instructions exactly.

## Briefs became contracts

Early briefs were a paragraph. Now they have a fixed shape: why the task exists, the files to use and the ones never to touch, exactly where the output goes and what it's called, numbered acceptance criteria that the agent reports back as met, partly met or not met, and a line about what "done" means.

That last line mattered more than I expected. Kainene once sent back a process document with four material findings, and all four were the same kind of mistake. The draft told readers to record results in tabs that didn't exist. It applied a staleness rule that was wrong for half the stages, left out a decision I'd made a week earlier, and leaned on rules written for an older version of the work without saying so. The writing was fine. Someone new just couldn't follow it, and the brief had said that was the whole point. It passed on the second round, which is as good a result as Kainene gives.

The agents also made me honest about my own instructions. Twice I told one to "fix" something, and it fixed exactly what I said. That turned out to be different from what I meant.

## The little things are where trust goes

Every so often I do a quality pass over everything the team has produced: a script, then a link checker, then me. It turned up two kinds of problem, and they pull in opposite directions.

**When the audit lies.** The link checker opened 3,426 links. Thirty-seven failed, and thirty of those were flagged as "likely made up", which is not a number you want to see at four in the afternoon. When I went through them, almost none were invented. Five were share links that had simply expired, several were government sites that had moved to a new domain, and a few were font links in page styling that were never citations at all. Four were real documents that had been taken down. I labelled those "no longer live" and kept them on record. Most of the scary number came from the internet decaying over time.

The same week, I was sure fifty-five accounts in the CRM had lost their account numbers. I could see the gaps on screen. The data file had every number; my browser was showing a copy it had saved days earlier. Both times I nearly blamed the agents for something the tooling did.

**When the work leaks.** The opposite problem: the agents did the job and left fingerprints all over it. Paths from my own laptop inside documents meant for other people. The tool's own name, fourteen times, in a published document. "This week" in a document that would be read weeks later. And the Excel files we produced turned out to store the folder they were last saved in, hidden inside the file where nobody sees it. No reviewer flagged any of this, because none of it is wrong. It's just unfinished.

## What I'd tell myself a month ago

- Write the instructions file like a job description: scope, what isn't yours, and what done looks like. Add "if evidence is missing, say so; never fill the gap". An honest empty field beats an invented full one.
- Cap review. On my board, one full review and one follow-up check has produced better first drafts than unlimited rounds did, and I suspect the same is true of people.
- Keep "approved" and "accepted" apart. A reviewer can approve work I still decide not to ship, a distinction I had to enforce in my own vocabulary this week.
- If your setup tracks versions, avoid editing an agent's output yourself to save time. I did once, and the attached version and the file on disk stopped matching. Sending the fix back keeps the record straight.
- Expect the gaps between agents to fail, and build the watcher before you need it.
- Keep a decision log. Half of my questions to myself were answered by something I'd decided ten days earlier and forgotten.

![[Personal Essays/assets/managing-agents/03_routines_blurred.png|Routines with their run switches, details blurred]]

The routines are running as I write this: the morning digest, the weekly catch-up, and the window-start checks that line work up against the usage limits. They're the first thing I look at each morning, and the clearest sign of whether the team is healthy.

In September I was writing about systems thinking and people operations. A month on, running an AI team still looks like people operations to me, only without the politeness. A person will fill the gap in a vague brief, guess where the files are, or tell me over coffee that my definition of done makes no sense. The agents on my board did none of that. So every weak spot in how I delegate, define "done" and design the handoffs shows up on the board, in order, with a timestamp.

*Working note. I'll keep tending this one.*
