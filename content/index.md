---
title: Gloria's Digital Garden
---

<style>
  :root {
    --dg-navy: #060b1a;
    --dg-navy-2: #0b1634;
    --dg-blue: #1d4ed8;
    --dg-blue-2: #2563eb;
    --dg-ice: rgba(255, 255, 255, 0.92);
    --dg-ice-2: rgba(255, 255, 255, 0.72);
  }

  .dg-hero {
    padding: 1.25rem 1.25rem;
    border: 1px solid color-mix(in srgb, var(--dg-blue), rgba(255, 255, 255, 0.2) 70%);
    border-radius: 1.1rem;
    background: radial-gradient(900px 380px at 10% 0%, rgba(37, 99, 235, 0.35), transparent 55%),
      radial-gradient(700px 360px at 85% 20%, rgba(29, 78, 216, 0.25), transparent 50%),
      radial-gradient(900px 520px at 50% 120%, rgba(255, 255, 255, 0.06), transparent 60%),
      linear-gradient(180deg, var(--dg-navy), var(--dg-navy-2));
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
  }

  /* Mobile-first tweaks */
  @media (max-width: 800px) {
    .dg-hero {
      padding: 1rem 1rem;
      border-radius: 0.9rem;
    }

    .dg-title {
      font-size: 1.7rem;
    }

    .dg-subtitle {
      font-size: 1rem;
    }

    .dg-actions {
      gap: 0.5rem;
    }

    .dg-actions .dg-btn {
      width: 100%;
      justify-content: center;
    }

    .dg-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Quartz auto-adds anchor icons to headings; hide them on the homepage */
  .dg-hero a[role="anchor"],
  .dg-section a[role="anchor"],
  .dg-card a[role="anchor"] {
    display: none !important;
  }

  /* Quartz styles internal links; force readable buttons on the dark hero */
  .dg-hero a.dg-btn {
    color: var(--dg-ice) !important;
  }

  .dg-hero a.dg-btn.ghost {
    color: var(--dg-ice-2) !important;
  }

  .dg-kicker {
    color: var(--dg-ice-2);
    letter-spacing: 0.02em;
    text-transform: uppercase;
    font-size: 0.85rem;
    margin: 0 0 0.5rem 0;
  }

  .dg-title {
    margin: 0 0 0.6rem 0;
    font-size: 2.2rem;
    line-height: 1.1;
    color: var(--dg-ice);
  }

  .dg-subtitle {
    margin: 0 0 1.1rem 0;
    color: var(--dg-ice-2);
    max-width: 65ch;
  }

  .dg-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    align-items: center;
    margin-top: 0.25rem;
  }

  .dg-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.55rem 0.85rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    text-decoration: none;
    font-weight: 600;
    color: var(--dg-ice);
  }

  .dg-btn.primary {
    background: linear-gradient(180deg, var(--dg-blue-2), var(--dg-blue));
    border-color: rgba(255, 255, 255, 0.14);
    color: white;
  }

  .dg-btn.primary:hover {
    color: white;
    filter: brightness(1.05);
  }

  .dg-btn.ghost:hover {
    border-color: rgba(255, 255, 255, 0.32);
  }

  .dg-btn.ghost {
    background: rgba(255, 255, 255, 0.06);
  }

  .dg-btn.ghost:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .dg-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 0.9rem;
    margin-top: 1.15rem;
  }

  .dg-card {
    border: 1px solid var(--lightgray);
    border-radius: 1rem;
    padding: 1rem 1rem;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.74));
    overflow: hidden;
    position: relative;
  }

  .dg-thumb {
    height: 84px;
    border-radius: 14px;
    border: 1px solid color-mix(in srgb, var(--lightgray), transparent 35%);
    margin-bottom: 0.75rem;
    background: radial-gradient(120px 90px at 22% 30%, rgba(37, 99, 235, 0.55), transparent 60%),
      radial-gradient(140px 110px at 82% 20%, rgba(132, 165, 157, 0.55), transparent 62%),
      radial-gradient(220px 140px at 55% 120%, rgba(40, 75, 99, 0.35), transparent 65%),
      linear-gradient(180deg, rgba(6, 11, 26, 0.92), rgba(11, 22, 52, 0.88));
  }

  .dg-thumb.alt-ops {
    background: radial-gradient(140px 110px at 20% 30%, rgba(29, 78, 216, 0.62), transparent 60%),
      radial-gradient(170px 120px at 75% 20%, rgba(14, 165, 233, 0.45), transparent 62%),
      radial-gradient(240px 150px at 55% 120%, rgba(40, 75, 99, 0.38), transparent 65%),
      linear-gradient(180deg, rgba(6, 11, 26, 0.94), rgba(10, 18, 40, 0.88));
  }

  .dg-thumb.alt-career {
    background: radial-gradient(160px 120px at 25% 25%, rgba(245, 158, 11, 0.42), transparent 62%),
      radial-gradient(150px 120px at 80% 25%, rgba(37, 99, 235, 0.45), transparent 62%),
      radial-gradient(240px 150px at 55% 120%, rgba(132, 165, 157, 0.3), transparent 65%),
      linear-gradient(180deg, rgba(6, 11, 26, 0.92), rgba(11, 22, 52, 0.88));
  }

  .dg-thumb.alt-systems {
    background: radial-gradient(140px 110px at 18% 30%, rgba(34, 197, 94, 0.38), transparent 62%),
      radial-gradient(160px 120px at 82% 25%, rgba(29, 78, 216, 0.5), transparent 62%),
      radial-gradient(240px 150px at 55% 120%, rgba(99, 102, 241, 0.25), transparent 65%),
      linear-gradient(180deg, rgba(6, 11, 26, 0.94), rgba(10, 18, 40, 0.88));
  }

  .dg-thumb.alt-learning {
    background: radial-gradient(160px 120px at 22% 25%, rgba(99, 102, 241, 0.5), transparent 62%),
      radial-gradient(170px 120px at 80% 25%, rgba(236, 72, 153, 0.28), transparent 62%),
      radial-gradient(240px 150px at 55% 120%, rgba(14, 165, 233, 0.22), transparent 65%),
      linear-gradient(180deg, rgba(6, 11, 26, 0.92), rgba(11, 22, 52, 0.88));
  }

  .dg-thumb.alt-hr {
    background: radial-gradient(160px 120px at 22% 25%, rgba(244, 63, 94, 0.32), transparent 62%),
      radial-gradient(170px 120px at 80% 25%, rgba(245, 158, 11, 0.28), transparent 62%),
      radial-gradient(240px 150px at 55% 120%, rgba(37, 99, 235, 0.22), transparent 65%),
      linear-gradient(180deg, rgba(6, 11, 26, 0.92), rgba(11, 22, 52, 0.88));
  }

  .dg-card h3 {
    margin-top: 0.1rem;
    margin-bottom: 0.4rem;
    font-size: 1.1rem;
  }

  .dg-card p {
    margin: 0;
    color: var(--darkgray);
  }

  .dg-card a {
    text-decoration: none;
  }

  .dg-card:hover {
    border-color: color-mix(in srgb, var(--secondary), var(--lightgray) 45%);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.05);
  }

  .dg-section {
    margin-top: 1.4rem;
  }

  .dg-muted {
    color: var(--darkgray);
  }
</style>

<div class="dg-hero">
  <p class="dg-kicker">Working Notes, In Public</p>
  <h1 class="dg-title">Gloria's Digital Garden</h1>
  <p class="dg-subtitle">
    Notes on data migration, CRM systems, operations, and learning. Some pages are polished, many are in progress, all are useful.
  </p>
  <div class="dg-actions">
    <a class="dg-btn primary" href="./Data-Migration-and-CRM-Systems">Start Here: CRM Migration</a>
    <a class="dg-btn ghost" href="./tags">Browse Tags</a>
    <a class="dg-btn ghost" href="https://glorthur.github.io">Portfolio</a>
  </div>
</div>

<div class="dg-section">
  <h2>Categories</h2>
  <div class="dg-grid">
    <div class="dg-card">
      <div class="dg-thumb alt-ops"></div>
      <h3><a href="./Data-and-Operations">Data and Operations</a></h3>
      <p>Process, reporting, CRM hygiene, migration planning, and getting reliable outputs.</p>
    </div>
    <div class="dg-card">
      <div class="dg-thumb alt-career"></div>
      <h3><a href="./Career-and-Growth">Career and Growth</a></h3>
      <p>Communication, positioning, professional habits, and long-term skill-building.</p>
    </div>
    <div class="dg-card">
      <div class="dg-thumb alt-systems"></div>
      <h3><a href="./Systems">Systems</a></h3>
      <p>How tools and workflows interact, where they break, and how to make them resilient.</p>
    </div>
    <div class="dg-card">
      <div class="dg-thumb alt-learning"></div>
      <h3><a href="./Learning">Learning</a></h3>
      <p>Study notes, experiments, and drafts that get clearer through writing.</p>
    </div>
    <div class="dg-card">
      <div class="dg-thumb alt-hr"></div>
      <h3><a href="./HR-and-People-Ops">HR and People Ops</a></h3>
      <p>People operations notes: recruiting ops, HR workflows, and practical team systems.</p>
    </div>
  </div>
  <p class="dg-muted">Tip: use the left sidebar Explorer or search to jump to anything fast.</p>
</div>

<div class="dg-section">
  <h2>Latest</h2>
  <ul>
    <li><a href="./Data-Migration-and-CRM-Systems">Data Migration and CRM Systems</a></li>
    <li><a href="./Data-and-Operations">Data and Operations</a></li>
    <li><a href="./Systems">Systems</a></li>
  </ul>
  <p class="dg-muted">I'll keep this list updated as new notes land.</p>
</div>
