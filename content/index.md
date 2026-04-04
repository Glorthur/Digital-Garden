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
      <h3><a href="./Data-and-Operations">Data and Operations</a></h3>
      <p>Process, reporting, CRM hygiene, migration planning, and getting reliable outputs.</p>
    </div>
    <div class="dg-card">
      <h3><a href="./Career-and-Growth">Career and Growth</a></h3>
      <p>Communication, positioning, professional habits, and long-term skill-building.</p>
    </div>
    <div class="dg-card">
      <h3><a href="./Systems">Systems</a></h3>
      <p>How tools and workflows interact, where they break, and how to make them resilient.</p>
    </div>
    <div class="dg-card">
      <h3><a href="./Learning">Learning</a></h3>
      <p>Study notes, experiments, and drafts that get clearer through writing.</p>
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
