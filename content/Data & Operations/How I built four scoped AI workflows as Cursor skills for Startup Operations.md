---
draft: false
dg-publish: true
status: published
---


> [!abstract]
> Over two weeks, I built four scoped AI workflows that help run communications review, operational analysis, weekly reporting, and document quality control under human review.

They are not autonomous. Every output gets reviewed before it is used. They do not replace an operations team. What they do offer is a way for a small team to run a few operational functions under defined standards and supervision before those functions justify additional headcount.

In the first two weeks, I used the system on content review, a readiness sprint plan, operational assessment, and two Friday reporting cycles. The Ops Integrator has been part of my daily workflow since I built it. This is what worked in practice, where it broke, and what I would do differently.

![[Pasted image 20260414230910.png]]

---

## The Problem

At any early-stage startup, operational work outpaces headcount. Comms review, ops analysis, meeting audits, and weekly reporting all matter, but they rarely justify a full-time hire when you are still building the product. So the work gets absorbed by whoever has capacity, or it does not get done at all.

I tried the obvious thing first: general-purpose AI chat. It helps with isolated tasks, but it does not solve the structural problem. A chatbot does not remember your company's IP boundaries from one conversation to the next. It does not know which team member is overloaded this week. It does not enforce your messaging standards across documents. Every session starts from zero, and you spend the first ten minutes re-explaining context.

I wanted something closer to a set of lightweight operational functions that could run repeatedly under defined standards, not a smarter chatbot.

---

## What I Built

The system works because each skill has a narrow role and a defined review path. The boundaries matter as much as the capabilities.

| Skill                       | What it does                                                                                                                                                                                             | What it cannot do                                                                                                         | Human review                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Communications Director** | Reviews external content against a six-dimension rubric: clarity, audience fit, claim discipline, IP safety, consistency, and banned language. Flags specific problem lines and suggests draft reframes. | Cannot write publishable copy. Cannot judge technical accuracy. Cannot make IP disclosure decisions.                      | I read every review before any content changes. Reframes are labeled `not publishable`. |
| **Ops Integrator**          | Pulls live task data from Notion, maps tasks to people, identifies bottlenecks, flags single points of failure, and produces capacity assessments.                                                       | Cannot change task status or assignments. Cannot make financial decisions. Cannot access data outside approved databases. | I review every assessment before acting on it.                                          |
| **Weekly Report Generator** | Queries five Notion databases and synthesizes accomplishments, decisions, remaining tasks, and individual updates into a formatted report page.                                                          | Cannot interpret or editorialize. Produces a draft, not a final report.                                                   | I review and edit every report before it goes to leadership.                            |
| **Adversarial Reviewer**    | Stress-tests documents using a structured rubric: Verdict, Blockers, Questions, Scope, Metrics, Assumptions, Risks, Contradictions, and Rewrite plan.                                                    | Cannot write final copy. Cannot approve documents. Cannot override human judgment.                                        | The review informs my decisions. I choose what to act on.                               |

### How They Connect

All project data lives in Notion databases. The skills read from these using the Notion MCP (Model Context Protocol) server, so every skill works from the same source of truth.

Each skill is defined in a `SKILL.md` file, a structured markdown document that specifies identity, capabilities, boundaries, data access, decision rules, and output formats. I treated these like versioned operational playbooks. When the Comms Director's evaluation rubric needed updating after a colleague's feedback, I changed one file. Every future review automatically used the new criteria.

Every significant document goes through structured adversarial review before it leaves the building.

For tasks requiring synthesis across many sources, I offload heavy document processing to Google's NotebookLM via the `notebooklm-py` CLI. The Skills coordinate the queries; NotebookLM does the reading.

---

## What Worked in Practice

**The Comms Director caught real problems in content copy.** I ran the skill on live copy that needed a colleague's feedback incorporated. It produced a formal review with verdict, specific problem lines, draft reframes, and IP flags. When the content lead was unavailable to rewrite, the skill's draft reframe became the working document. The rubric made the review repeatable regardless of who was available that day. I used it on three separate content reviews over the two weeks.

**The Ops Integrator became a daily tool.** The partner-assessment example is the most dramatic one. The skill pulled meeting minutes and task data from Notion and surfaced the actual state of an external relationship from the records instead of letting me make a decision based on how I felt. But the real value showed up in daily use: checking task distribution before standups, flagging bottlenecks before they became blockers, and getting a grounded read on team capacity instead of guessing. I have used it every working day since building it.

**The adversarial reviewer caught problems before they became expensive.** I ran it on a four-week readiness sprint plan. It flagged missing owners, unclear definitions of done, and assumptions about leadership's availability that would have blown up the timeline. Without the review, those problems would have surfaced in Week 2 instead of before the sprint started. 

**The weekly report generator eliminated manual synthesis.** Five databases, one formatted output. I ran it on two consecutive Fridays. The report still needs my review and editing, but the gathering and structuring work that used to take a couple of hours now takes minutes of review time.

**Boundaries made the system trustworthy.** The most important design decision was defining what each skill cannot do. The Comms Director cannot judge technical accuracy, so it does not hallucinate technical assessments. The Ops Integrator cannot change task assignments, so it recommends instead of acting. Those constraints are what made me comfortable using the outputs on real work.

---

## What Broke

**The adversarial reviewer over-flags.** It applied the same evidence bar to a casual draft that it would use for a procurement document. I had to manually calibrate: "this is directional, not a board decision." The skill does not yet distinguish between document types automatically.

**Token costs are real and unoptimized.** When the Ops Integrator reads meeting minutes, checks the tasks database, cross-references workloads, and produces an assessment, that is a lot of context. Multi-skill queries are expensive. I have not optimized for cost yet.

**NotebookLM ingestion is fragile.** Authenticated Notion URLs sometimes failed to import. I had to export to markdown and re-upload. The `notebooklm-py` CLI reverse-engineers Google's internal protocols, so commands can break without warning. It is a power-user tool, not production infrastructure.

**Circular sourcing is a structural risk.** The adversarial reviewer caught that vendor metrics I had cited from a NotebookLM synthesis had no traceable primary sources. Several source articles were trade press pieces potentially sourcing from each other. RAG reduces hallucination relative to your uploaded sources, but it does not guarantee those sources are independent.

**Data governance is unresolved.** Under GDPR Article 17, user data must be removable from every system caching it. In RAG systems, data persists across conversation histories and vector embeddings. Deleting a source document does not inherently eliminate the embeddings derived from it. For any startup using US-hosted consumer AI tools for business operations, this is a real compliance question.

---

## What the Research Reinforced

A few findings from independent research directly shaped how I designed the system.

**Human-curated context files outperform LLM-generated ones.** An [ETH Zurich study](https://arxiv.org/abs/2602.11988) found that LLM-generated context files actually hurt productivity, reducing task success rates and inflating inference costs by over 20%. Human-curated files offered a modest gain. This validated the time I spent writing detailed `SKILL.md` specs with explicit boundaries and decision rules. The specs are what make the system usable. Without them, you are back to ad hoc chatbot use.

**Most agent deployments fail to reach full scale.** The [MAP study](https://arxiv.org/abs/2512.04123) surveyed 306 practitioners and found that the vast majority of agent deployments do not make it to production. The ones that work intentionally throttle autonomy: 68% of production agents are restricted to 10 or fewer steps before requiring human intervention. That reinforced my decision to keep every output under review.

**I do not have before-and-after metrics.** I was not measuring before I started. What I can say is that operational functions that did not exist two weeks ago now run repeatedly under review. Documents that would have gone out unreviewed now go through structured evaluation. If you want the quantitative story, instrument from day one.

---

## What I'd Tell Another Small Team

**Start with what the skill cannot do.** The boundaries matter more than the capabilities. Those constraints are what make the system trustworthy enough to actually use.

**Write the specs before you build.** I wrote detailed specifications in Notion, had them reviewed by the team, and then implemented them as skills. The specs forced me to think about who decides what, which data each skill can see, what happens when something fails, and how work moves between skills and humans. That planning is what separates "I asked ChatGPT to help" from "I have a repeatable operational function."

**Use structured review as a quality gate.** The adversarial reviewer is the most valuable skill I built. It is the one that tells me when the other skills' outputs are wrong.

**Accept the fragility.** I am building on unofficial APIs, consumer-tier AI tools, and a set of dependencies that changes weekly. `notebooklm-py` could break tomorrow. The architecture is sound, but the specific implementations are disposable. Design for replaceability.

I think of it as an AI ops layer: a set of scoped, supervised functions that help a team run work more repeatably without pretending human judgment has disappeared. **The moment you frame it as replacing people, you overclaim what it does and undersell the work that makes it useful.**

For a startup, that is already enough. Not autonomous operations. A few operational functions that, so far, run more repeatably than the manual alternative, with clearer standards and less dependence on any one person's memory.

---

## Sources

Key sources include:

- [MAP study: "Measuring Agents in Production"](https://arxiv.org/abs/2512.04123)
- [ETH Zurich context engineering study](https://arxiv.org/abs/2602.11988)
- AGENTS.md / SKILL.md open standard documentation
