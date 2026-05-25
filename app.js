/* ===================================================================
   Renders the directory from data.js. No need to edit this file.
   =================================================================== */
(function () {
  "use strict";

  // ---- Helpers ----------------------------------------------------
  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Deterministic colour for the initials avatar, derived from the name.
  function colorFor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    const hue = Math.abs(hash) % 360;
    return `linear-gradient(135deg, hsl(${hue} 70% 58%), hsl(${(hue + 40) % 360} 70% 52%))`;
  }

  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  }

  function logoMarkup(tool) {
    if (tool.logo) {
      return `<img class="card__logo" src="${escapeHtml(tool.logo)}" alt="${escapeHtml(tool.name)} logo" loading="lazy" />`;
    }
    return `<div class="card__logo" style="background:${colorFor(tool.name)}" aria-hidden="true">${escapeHtml(initials(tool.name))}</div>`;
  }

  function cardMarkup(tool) {
    const featured = tool.tier === "featured";
    return `
      <article class="card${featured ? " card--featured" : ""}">
        <div class="card__top">
          ${logoMarkup(tool)}
          <div>
            <div class="card__name">${escapeHtml(tool.name)}</div>
            <div class="card__cat">${escapeHtml(tool.category || "")}</div>
          </div>
        </div>
        <p class="card__tagline">${escapeHtml(tool.tagline || "")}</p>
        <div class="card__foot">
          <a class="card__link" href="${escapeHtml(tool.url || "#")}" target="_blank" rel="noopener">Visit site →</a>
          ${tool.sponsored ? '<span class="badge">Sponsored</span>' : (tool.founding ? '<span class="badge badge--founding">Founding Partner</span>' : "")}
        </div>
      </article>`;
  }

  // ---- Populate hero / static text from SITE ----------------------
  function hydrateSite() {
    document.getElementById("navBrand").textContent = SITE.brand;
    document.getElementById("heroTitle").textContent = SITE.brand;
    document.getElementById("heroTagline").textContent = SITE.tagline;
    document.title = SITE.brand + " — Curated Directory";

    const statsWrap = document.getElementById("heroStats");
    SITE.stats.forEach(s => {
      statsWrap.appendChild(el(
        `<div class="stat"><div class="stat__value">${escapeHtml(s.value)}</div><div class="stat__label">${escapeHtml(s.label)}</div></div>`
      ));
    });

    // Links
    const form = SITE.intakeFormUrl || "#";
    document.getElementById("pricingFormLink").href = form;
    const listedBtn = document.getElementById("listedCtaBtn");
    if (listedBtn) listedBtn.href = form;
    document.getElementById("subscribeBtn").href = SITE.newsletterUrl || "#";

    document.getElementById("footerYear").textContent = new Date().getFullYear();
  }

  // ---- Featured ---------------------------------------------------
  function renderFeatured() {
    const wrap = document.getElementById("featuredGrid");
    const featured = TOOLS.filter(t => t.tier === "featured");

    featured.forEach(t => wrap.appendChild(el(cardMarkup(t))));

    // Fill the row with "open slot" cards so the empty space sells itself.
    const openCount = Math.max(3 - featured.length, 1);
    const slotCard = `
      <article class="card card--featured card--slot">
        <div class="card__name">Your tool here</div>
        <p class="card__tagline">Get your AI tool featured at the top plus a monthly Medium feature.</p>
        <a class="btn btn--primary" href="${escapeHtml(SITE.intakeFormUrl || "#")}" target="_blank" rel="noopener">Get featured →</a>
      </article>`;
    for (let i = 0; i < openCount; i++) wrap.appendChild(el(slotCard));
  }

  // ---- Directory grid with search + category filter ---------------
  const grid = document.getElementById("toolsGrid");
  const emptyState = document.getElementById("emptyState");
  let activeCategory = "All";
  let query = "";

  // Non-featured tools live in the main grid.
  const listed = TOOLS.filter(t => t.tier !== "featured");

  function renderGrid() {
    grid.innerHTML = "";
    const q = query.toLowerCase();
    const matches = listed.filter(t => {
      const catOk = activeCategory === "All" || t.category === activeCategory;
      const text = (t.name + " " + t.tagline + " " + t.category).toLowerCase();
      return catOk && (q === "" || text.indexOf(q) !== -1);
    });
    matches.forEach(t => grid.appendChild(el(cardMarkup(t))));
    emptyState.hidden = matches.length !== 0;
  }

  function renderFilters() {
    const wrap = document.getElementById("categoryFilters");
    const cats = ["All", ...Array.from(new Set(listed.map(t => t.category).filter(Boolean))).sort()];
    cats.forEach(cat => {
      const chip = el(`<button class="chip${cat === "All" ? " chip--active" : ""}">${escapeHtml(cat)}</button>`);
      chip.addEventListener("click", () => {
        activeCategory = cat;
        wrap.querySelectorAll(".chip").forEach(c => c.classList.remove("chip--active"));
        chip.classList.add("chip--active");
        renderGrid();
      });
      wrap.appendChild(chip);
    });
  }

  function wireSearch() {
    document.getElementById("searchInput").addEventListener("input", e => {
      query = e.target.value;
      renderGrid();
    });
  }

  // ---- Pricing ----------------------------------------------------
  function renderPricing() {
    const wrap = document.getElementById("pricingGrid");
    PRICING.forEach(p => {
      const perks = p.perks.map(x => `<li>${escapeHtml(x)}</li>`).join("");
      const was = p.original ? `<span class="plan__was">${escapeHtml(p.original)}</span>` : "";
      wrap.appendChild(el(`
        <div class="plan${p.highlight ? " plan--highlight" : ""}">
          <div class="plan__name">${escapeHtml(p.name)}</div>
          <div class="plan__price">${was}${escapeHtml(p.price)}<span>${escapeHtml(p.period || "")}</span></div>
          <div class="plan__note">${escapeHtml(p.note || "")}</div>
          <ul class="plan__perks">${perks}</ul>
          <a class="btn ${p.highlight ? "btn--primary" : "btn--ghost"}" href="${escapeHtml(SITE.intakeFormUrl || "#")}" target="_blank" rel="noopener">Apply now</a>
        </div>`));
    });
  }

  // ---- Animated "tech constellation" behind the hero -------------
  function initParticles() {
    const canvas = document.getElementById("bgCanvas");
    if (!canvas) return;
    // Respect users who prefer less motion.
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    const host = canvas.parentElement;
    let w, h, dpr, particles, linkDist;

    function resize() {
      dpr = window.devicePixelRatio || 1;
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      linkDist = w < 600 ? 90 : 130;
      const count = Math.min(70, Math.floor(w / 18));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1.5
      }));
    }

    function step() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.55)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(139, 92, 246, " + (0.18 * (1 - dist / linkDist)) + ")";
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(step);
    }

    resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(step);
  }

  // ---- Init -------------------------------------------------------
  hydrateSite();
  renderFeatured();
  renderFilters();
  wireSearch();
  renderGrid();
  renderPricing();
  initParticles();
})();
