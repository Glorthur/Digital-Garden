---
draft: false
dg-publish: true
status: published
---


> [!abstract]
> Early ops starts when a company has become too interdependent to run on founder memory alone, but is still too early for heavyweight process.

> [!info]
> Related: [Operations Hub Template](https://glorthur.notion.site/?source=copy_link)

A startup hires its first ops person when the company has become too interdependent to run on memory alone.

By that point, there is already a system in place. It just happens to be unstable. Direction lives in founder memory. Decisions get made in meetings and disappear into inboxes. New hires learn by proximity. Ownership is mostly inferred. Everyone stays busy, but too much of the company still depends on who happens to remember what.

That is where early ops starts. The problem is a company already running on a fragile operating system.

## Where Early Ops Starts

The strain usually shows up in ordinary ways. Hiring is moving, but onboarding is inconsistent. Founders spend half the day context-switching and the other half following up. Teams use different definitions for the same thing. Meetings generate work, but not always owners. Revenue work slows down because internal confusion keeps getting passed around instead of resolved.

That is why the role gets misunderstood.

From a distance, early ops can look like administrative cleanup. In reality, it is a judgment role. The work involves deciding which recurring work still belongs with founders and executive leaders, and which recurring work has become too expensive to keep personal.

## The Catch-All Trap

That is also where the first trap appears.

In a company with loose ownership, the new operator becomes the answer to everything: recruiting issue, vendor issue, handoff issue, broken onboarding, board prep, internal follow-up, weird cross-functional friction. They become useful immediately because the gaps are obvious.

If that usefulness hardens into a permanent catch-all role, the company gets relief without getting structure. The operator absorbs the chaos instead of reducing it. The business feels less painful for a while, yet the underlying system stays just as dependent on memory, improvisation, and founder intervention as before.

So the first job is to reduce repeated founder intervention by building enough structure around the places where work keeps falling apart.

In practice, that usually starts with a narrow set of systems: a weekly leadership cadence, clear owners on recurring decisions, onboarding documentation that tells a new hire what they are actually supposed to own in the first month, and a way to record decisions so the same debate does not keep getting rerun from memory. Once reporting starts to matter, the company also needs consistent tracking logic so tasks, reports, and pipeline status are interpreted the same way across the system.

None of this is glamorous. That is part of the point.

The first useful ops systems are rarely sophisticated. They are usually the minimum structure required to stop the company from re-explaining itself every week.

## Useful Structure vs. Dead Structure

That distinction matters because bad advice enters early.

A lot of startup advice tells people to document everything, automate quickly, and build the machine. At this stage, that advice is too blunt to help. Early companies do need more structure than founders usually want to admit. If nothing is written down, new hires do not experience autonomy; they experience ambiguity. If nobody knows who decides what, speed turns into drift.

Too much machinery creates its own failure mode. Companies start building systems that look mature without solving the coordination problems in front of them.

You see it in the usual places: dashboards full of charts that nobody uses to make decisions; approval processes that send routine work back through founders in the name of control; review systems copied from much larger companies before roles and expectations are even stable; onboarding docs that describe the company as it existed two weeks ago; instrumentation built before anyone agrees on what should count as the same event.

The company gets more process and stays just as confused.

That is the line early ops has to hold: useful structure versus dead structure.

Useful structure reduces repeated explanation. It clarifies who decides. It makes onboarding less dependent on osmosis. It gives people enough consistency to move without founders stitching every thread together by hand.

Dead structure adds review overhead without reducing confusion. It produces cleaner templates, heavier dashboards, and more approval steps while the same coordination failures stay in place.

## How the Ops Hub Reflects That

That distinction shaped how I built my [Operations Hub Template](https://glorthur.notion.site/?source=copy_link).

I did not build it as a generic productivity template. I built it around the operating failures that show up early, when a company has become too interdependent to run on memory but is still too fluid for heavyweight process.

That is why the system centers on a few things.

First, a triage layer. The hub has a Triage Dashboard because early companies usually do not need more work. They need better visibility into the work already slipping. Overdue tasks, blocked tasks, high-priority work with no deadline, aging items that look active but are really drifting, stale deals, meetings this week, and report status: those are the places where coordination failure becomes visible before it becomes normal.

Second, meetings that actually turn into owned work. A lot of companies think they have a follow-through problem. In practice, they often have a handoff problem. Decisions get made, but action items stay trapped in notes. In the hub, meetings connect directly to tasks. If a meeting creates work, that work should leave the meeting with an owner and a deadline.

Third, reporting that rolls up without pretending the platform can do something it cannot do. Weekly reports only matter if they create shared visibility. In the hub, reports connect back to the Team Directory so leadership can see who has submitted and who has not. That mattered to me because early ops is full of fake completeness. A neat-looking reporting system that cannot actually show missing inputs is mostly theater.

Fourth, CRM and delivery in the same operating layer. That was a deliberate choice. In small companies, pipeline work and operational work are rarely separate in practice. Deals create follow-up tasks, internal prep, project handoffs, and delivery implications. Keeping CRM in the same system as tasks and projects reflects the real relationship between sales and execution.

Even some of the awkward parts of the build reflect real ops tradeoffs. For example, I used a dual-property ownership model in places where Notion forces one. The relation field is the system of record because it powers rollups, linked views, and team workload. The Person field exists only because Notion's native "Me" filter does not work on relations. That is a small example, but it captures the kind of compromise early ops work actually involves. You are usually building useful systems, not ideal ones.

## Temporary Systems Are Still Systems

Some early systems should also be temporary on purpose.

A lot of first-build ops work is scaffolding. It exists to stabilize the company long enough for the next level of structure to become possible. The mistake is not building temporary systems. The mistake is letting every stopgap harden into policy, or importing heavyweight process from a larger company before the current one has earned it.

## What Good Early Ops Looks Like

The clearest sign that early ops is working is the disappearance of avoidable chaos.

Meetings get fewer, or sharper. Founders get time back for work only they can do. New hires stop bouncing off ambiguity. Decisions stop lingering in half-remembered conversations. Teams stop relitigating the same issues because there is a record, a cadence, or a clear owner. The company still feels early, but it no longer feels like it is being held together entirely by memory.

That is the standard I used in building the Ops Hub: enough structure to make work visible, ownership legible, and follow-through harder to lose.

The first ops hire is there to decide which founder habits can no longer remain personal.

Good early systems make that shift without freezing the company into a version of itself it has not grown into yet.

That is what building ops actually looks like at the start.

If you want to see how I translated that thinking into a concrete system, you can explore the [Operations Hub Template](https://glorthur.notion.site/?source=copy_link). I built it to show what early operational structure looks like when the goal is less avoidable confusion, clearer ownership, and fewer things slipping through memory alone.
