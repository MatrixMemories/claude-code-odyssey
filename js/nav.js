/* ==========================================================================
   nav.js — Navigator Logic
   Claude Code Tutorial Site
   ========================================================================== */

/* --------------------------------------------------------------------------
   Navigation Data
   Declare chapters > sections > subsections here.
   Each subsection must have: { id, title, file }
   -------------------------------------------------------------------------- */

window.NAV_DATA = [
  {
    id: "ch00",
    type: "site-overview",
    title: "Overview",
    file: "chapters/ch00/overview.html"
  },
  {
    id: "ch01",
    title: "1. Introduction",
    desc: "Build a solid foundation — learn what Claude Code is, how it thinks, and why it changes the way you write software.",
    file: "chapters/chapter-01/overview.html",
    url: "/chapter-introduction",
    sections: [
      {
        id: "ch01-s01",
        title: "1.1. What is Claude Code?",
        desc: "From traditional IDEs to agentic coding — understand the shift and what it means for your workflow.",
        file: "chapters/chapter-01/01-what-is-claude-code/overview.html",
        url: "/section-what-is-claude-code",
        subsections: [
          {
            id: "ch01-s01-ss01",
            title: "1.1.1 What is a Coding Agent?",
            desc: "This section explains what a Coding Agent is and how the Agentic Harness transforms raw LLMs into autonomous coding assistants using tools, context, memory, and an orchestration loop.",
            file: "chapters/chapter-01/01-what-is-claude-code/01-what-is-a-coding-agent.html",
            url: "/what-is-claude-code/what-is-a-coding-agent"
          }
        ]
      }
    ]
  },
  {
    id: "ch02",
    title: "2. Claude Code Setup",
    desc: "Properly setting up Claude Code unlocks its full potential as your AI coding companion, delivering seamless integration, optimal performance, and maximum productivity.",
    file: "chapters/chapter-02/overview.html",
    url: "/chapter-setup",
    sections: [
      {
        id: "ch02-s01",
        title: "2.1. Prerequisites",
        desc: "Everything you need to know and do before installing Claude Code and shooting your first prompt.",
        file: "chapters/chapter-02/01-prerequisites/overview.html",
        url: "/section-prerequisites",
        subsections: [
          {
            id: "ch0-s01-ss01",
            title: "2.1.1 Subscriptions and Costs",
            desc: "This section compares pricing, 5-hour usage quotas, metering units, and best-value recommendations across Anthropic, Kimi, Z.ai, and MiniMax subscription plans for powering Claude Code.",
            file: "chapters/chapter-02/01-prerequisites/01-subscriptions-and-costs.html",
            url: "/prerequisites/subscriptions-and-costs"
          },
          {
            id: "ch0-s01-ss02",
            title: "2.1.2 The Right Subscription",
            desc: "Comparison of Claude, MiniMax, GLM (Z.ai), and Kimi models for Claude Code, covering their stylistic vibes, benchmark performances, cost metrics, and subscription recommendations.",
            file: "chapters/chapter-02/01-prerequisites/02-the-right-subscription.html",
            url: "/prerequisites/the-right-subscription"
          }
        ]
      }
    ]
  },
  {
    id: "ch03",
    title: "3. Claude Code Full Stack",
    desc: "Go deeper into the features and workflows that make Claude Code indispensable for real projects.",
    file: "chapters/chapter-03/overview.html",
    url: "/chapter-full-stack",
    sections: [
      {
        id: "ch03-s03",
        title: "3.3. The CLAUDE.md File",
        desc: "The single most powerful lever in your Claude Code setup — a persistent instruction file that shapes every session.",
        file: "chapters/chapter-03/03-claude-md/overview.html",
        url: "/section-claude-md",
        subsections: [
          {
            id: "ch03-s03-ss01",
            title: "3.3.1 The CLAUDE.md file",
            desc: "This section explains what CLAUDE.md is, why it's essential for Claude Code sessions, its recommended WHAT/WHY/HOW structure, and how global (~/.claude/CLAUDE.md) and local (CLAUDE.local.md) variants work.",
            file: "chapters/chapter-03/03-claude-md/01-claude-md-file.html",
            url: "/claude-md/claude-md-file"
          },
          {
            id: "ch03-s03-ss02",
            title: "3.3.2 CLAUDE.md Do’s & Don’ts",
            desc: "Discover the essential do’s and don’ts for writing concise, clear, and highly effective CLAUDE.md files that Claude Code actually follows consistently.",
            file: "chapters/chapter-03/03-claude-md/02-dos-and-donts.html",
            url: "/claude-md/dos-and-donts"
          },
          {
            id: "ch03-s03-ss03",
            title: "3.3.3 CLAUDE.md Blueprint",
            desc: "In this section, you'll see how to build a powerful CLAUDE.md file using a proven section-based template with 16 practical sections, clear include/avoid guidelines, and real-world examples.",
            file: "chapters/chapter-03/03-claude-md/03-claude-md-blueprint.html",
            url: "/claude-md/claude-md-blueprint"
          },
          {
            id: "ch03-s03-ss04",
            title: "3.3.4 Global CLAUDE.md Blueprint",
            desc: "This section covers building your global ~/.claude/CLAUDE.md — the short permanent blueprint that encodes your response style, stack preferences, autonomy rules, and non-negotiables so Claude instantly works your way on every project.",
            file: "chapters/chapter-03/03-claude-md/04-global-md-blueprint.html",
            url: "/claude-md/global-blueprint"
          },
          {
            id: "ch03-s03-ss05",
            title: "3.3.5 Local CLAUDE.md Blueprint",
            desc: "Learn how to create and use CLAUDE.local.md as your personal, never-committed override file for local environment details, current focus, temporary hacks, and machine-specific instructions.",
            file: "chapters/chapter-03/03-claude-md/05-local-md-blueprint.html",
            url: "/claude-md/local-blueprint"
          },
          {
            id: "ch03-s03-ss06",
            title: "3.3.6 Progressive Disclosure",
            desc: "In this section, you'll discover progressive disclosure techniques — nested CLAUDE.md files, path-scoped rules, and agent_docs — to keep Claude Code's context lean and focused as your projects grow.",
            file: "chapters/chapter-03/03-claude-md/06-progressive-disclosure.html",
            url: "/claude-md/progressive-disclosure"
          },
          {
            id: "ch03-s03-ss07",
            title: "3.3.7 Deep Dive I: Internals",
            desc: "In this section, you’ll discover the inner mechanics of CLAUDE.md: how @ imports actually load and expand, the CHANGELOG.md + project-notes workflow for persistent memory across sessions, the system-reminder wrapper and its API placement, system prompt injection flags for unbreakable adherence, and other practical techniques to keep your instructions reliably followed.",
            file: "chapters/chapter-03/03-claude-md/07-deep-dive-internals.html",
            url: "/claude-md/deep-dive-internals"
          },
          {
            id: "ch03-s03-ss08",
            title: "3.3.8 Deep Dive II: Tactics",
            desc: "You will discover advanced tactics for optimizing CLAUDE.md—including on-demand task-specific file switching, strategic emphasis patterns, high-impact instruction writing, and using Claude itself for automated reviews and self-maintenance.",
            file: "chapters/chapter-03/03-claude-md/08-deep-dive-tactics.html",
            url: "/claude-md/deep-dive-tactics"
          }
        ]
      }
    ]
  }
];

/* --------------------------------------------------------------------------
   State
   -------------------------------------------------------------------------- */

let _activeId = null;

// Read from <base href="..."> so these are always correct even when shell.html
// is served by the SPA dev-server for a custom URL path like /my-slug.
const _APP_BASE  = document.querySelector('base')?.getAttribute('href') || '/';
const _SHELL_URL = _APP_BASE + 'shell.html';

/* --------------------------------------------------------------------------
   _idToPageParam(id) / _pageParamToId(param)
   Convert between internal dash-separated IDs and slash-separated URL params.
     ch03-s03-ss02     ↔  ch03/s03/ss02
     ch03-overview     ↔  ch03/overview
     ch03-s03-overview ↔  ch03/s03/overview
     site-overview     ↔  site-overview  (unchanged)
   -------------------------------------------------------------------------- */

function _idToPageParam(id) {
  if (id === 'site-overview') return 'site-overview';
  return id.split('-').join('/');
}

function _pageParamToId(param) {
  if (param === 'site-overview') return 'site-overview';
  return param.split('/').join('-');
}

/* --------------------------------------------------------------------------
   _setMapBg(on)
   Adds/removes the .has-map-bg class on #content-area.
   true  → show the nautical-chart background (overview pages)
   false → clear it (regular subsection pages)
   -------------------------------------------------------------------------- */
function _setMapBg(on) {
  const contentArea = document.getElementById('content-area');
  if (contentArea) contentArea.classList.toggle('has-map-bg', on);
}

/* --------------------------------------------------------------------------
   buildNav()
   Reads NAV_DATA and renders the chapter/section/subsection tree
   into #nav-panel.
   -------------------------------------------------------------------------- */

function buildNav() {
  const panel = document.getElementById('nav-panel');
  if (!panel) return;

  panel.innerHTML = '';

  if (!window.NAV_DATA || window.NAV_DATA.length === 0) {
    panel.innerHTML = '<p style="padding:16px;color:var(--mu);font-size:13px;">No content yet.</p>';
    return;
  }

  NAV_DATA.forEach((chapter, chIdx) => {
    // Site-overview entry — render as a direct-click button, not a collapsible chapter
    if (chapter.type === 'site-overview') {
      const btn = document.createElement('button');
      btn.className = 'nav-overview-btn';
      btn.dataset.id = chapter.id;
      btn.innerHTML = `<span class="nav-overview-icon">◉</span><span>${chapter.title}</span>`;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.nav-overview-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadSiteOverview();
        const navPanel = document.getElementById('nav-panel');
        if (navPanel) navPanel.classList.remove('open');
      });
      panel.appendChild(btn);
      return;
    }

    // Shift chapter index for 'open' logic (skip the site-overview entry)
    const regularChIdx = chIdx - NAV_DATA.filter((ch, i) => i < chIdx && ch.type === 'site-overview').length;

    const chapterEl = document.createElement('div');
    // chapterEl.className = 'nav-chapter' + (regularChIdx === 0 ? ' open' : '');
    chapterEl.className = 'nav-chapter';
    chapterEl.dataset.id = chapter.id;

    // Chapter toggle button
    const chBtn = document.createElement('button');
    chBtn.className = 'nav-chapter-btn';
    chBtn.setAttribute('aria-expanded', regularChIdx === 0 ? 'true' : 'false');
    chBtn.innerHTML = `<span>${chapter.title}</span><span class="chevron">›</span>`;
    chBtn.addEventListener('click', () => {
      const isOpen = chapterEl.classList.toggle('open');
      chBtn.setAttribute('aria-expanded', String(isOpen));
      loadChapterOverview(chapter);
    });

    const chBody = document.createElement('div');
    chBody.className = 'nav-chapter-body';

    chapter.sections.forEach((section, secIdx) => {
      const sectionEl = document.createElement('div');
      // sectionEl.className = 'nav-section' + (regularChIdx === 0 && secIdx === 0 ? ' open' : '');
      sectionEl.className = 'nav-section';
      sectionEl.dataset.id = section.id;

      const secBtn = document.createElement('button');
      secBtn.className = 'nav-section-btn';
      secBtn.setAttribute('aria-expanded', regularChIdx === 0 && secIdx === 0 ? 'true' : 'false');
      secBtn.innerHTML = `<span>${section.title}</span><span class="chevron">›</span>`;
      secBtn.addEventListener('click', () => {
        const isOpen = sectionEl.classList.toggle('open');
        secBtn.setAttribute('aria-expanded', String(isOpen));
        loadSectionOverview(section, chapter);
      });

      const secBody = document.createElement('div');
      secBody.className = 'nav-section-body';

      section.subsections.forEach(sub => {
        const subBtn = document.createElement('button');
        subBtn.className = 'nav-subsection-btn';
        subBtn.dataset.id = sub.id;
        subBtn.dataset.file = sub.file;
        subBtn.textContent = sub.title;
        subBtn.addEventListener('click', () => {
          loadSubsection(sub.file, sub.id);
          // Close mobile nav after selection
          const navPanel = document.getElementById('nav-panel');
          if (navPanel) navPanel.classList.remove('open');
        });
        secBody.appendChild(subBtn);
      });

      sectionEl.appendChild(secBtn);
      sectionEl.appendChild(secBody);
      chBody.appendChild(sectionEl);
    });

    // Divider between chapters
    if (chIdx < NAV_DATA.length - 1) {
      const divider = document.createElement('div');
      divider.className = 'nav-divider';
      chBody.appendChild(divider);
    }

    chapterEl.appendChild(chBtn);
    chapterEl.appendChild(chBody);
    panel.appendChild(chapterEl);
  });
}

/* --------------------------------------------------------------------------
   loadSubsection(file, id)
   Fetches an HTML fragment and injects it into #content-area.
   -------------------------------------------------------------------------- */

function loadSubsection(file, id) {
  const contentArea = document.getElementById('content-area');
  if (!contentArea) return;

  // Update URL without reload — use custom url if defined, otherwise ?page= format
  const _sub = _findSubsectionById(id);
  const _pushUrl = (_sub && _sub.url) ? _sub.url : _SHELL_URL + '?page=' + _idToPageParam(id);
  window.history.pushState({ page: id, file }, '', _pushUrl);

  // Update active nav state
  _setActiveNav(id);

  // Update breadcrumb
  _updateBreadcrumb(id);

  // Clear map background on regular subsection pages
  _setMapBg(false);

  // Fetch and inject
  contentArea.style.opacity = '0';
  contentArea.style.transition = 'opacity 0.15s ease';

  fetch(_APP_BASE + file)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${file}`);
      return res.text();
    })
    .then(html => {
      contentArea.innerHTML = html;
      trimDirTree();
      trimCodeBlocks();
      contentArea.scrollTop = 0;
      window.scrollTo(0, 0);
      contentArea.style.opacity = '1';
      _activeId = id;

      // Re-attach copy buttons (copyCode is defined in shell scope)
      // No scripts in fragments — copy buttons use inline onclick which
      // references the global copyCode() defined in shell.html
    })
    .catch(err => {
      contentArea.innerHTML = `
        <div class="page-wrap">
          <div class="card">
            <h2 class="section-title">Page Not Found</h2>
            <p class="body-text">Could not load <span class="inline-code">${file}</span>.</p>
            <p class="body-text" style="color:var(--mu);font-size:13px;">${err.message}</p>
          </div>
        </div>`;
      contentArea.style.opacity = '1';
    });
}

/* --------------------------------------------------------------------------
   _setActiveNav(id)
   Updates the .active class on nav subsection buttons.
   Opens parent chapter and section if collapsed.
   -------------------------------------------------------------------------- */

function _setActiveNav(id) {
  // Remove all active states including overview button
  document.querySelectorAll('.nav-subsection-btn, .nav-overview-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Find and activate the target button
  const target = document.querySelector(`.nav-subsection-btn[data-id="${id}"]`);
  if (!target) return;

  target.classList.add('active');

  // Ensure parent section is open
  const sectionEl = target.closest('.nav-section');
  if (sectionEl) {
    sectionEl.classList.add('open');
    const secBtn = sectionEl.querySelector('.nav-section-btn');
    if (secBtn) secBtn.setAttribute('aria-expanded', 'true');
  }

  // Ensure parent chapter is open
  const chapterEl = target.closest('.nav-chapter');
  if (chapterEl) {
    chapterEl.classList.add('open');
    const chBtn = chapterEl.querySelector('.nav-chapter-btn');
    if (chBtn) chBtn.setAttribute('aria-expanded', 'true');
  }

  // Scroll nav item into view
  target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

/* --------------------------------------------------------------------------
   _updateBreadcrumb(id)
   Finds the subsection in NAV_DATA and updates #breadcrumb.
   -------------------------------------------------------------------------- */

function _updateBreadcrumb(id) {
  const el = document.getElementById('breadcrumb');
  if (!el) return;

  for (const chapter of (NAV_DATA || [])) {
    for (const section of (chapter.sections || [])) {
      for (const sub of (section.subsections || [])) {
        if (sub.id === id) {
          el.textContent = `${chapter.title}  ›  ${section.title}  ›  ${sub.title}`;
          return;
        }
      }
    }
  }

  el.textContent = '';
}

/* --------------------------------------------------------------------------
   _getFirstSubsection()
   Returns { file, id } of the very first subsection in NAV_DATA.
   -------------------------------------------------------------------------- */

function _getFirstSubsection() {
  for (const chapter of (NAV_DATA || [])) {
    for (const section of (chapter.sections || [])) {
      if (section.subsections && section.subsections.length > 0) {
        return section.subsections[0];
      }
    }
  }
  return null;
}

/* --------------------------------------------------------------------------
   _findSubsectionById(id)
   Looks up a subsection by id in NAV_DATA.
   -------------------------------------------------------------------------- */

function _findSubsectionById(id) {
  for (const chapter of (NAV_DATA || [])) {
    for (const section of (chapter.sections || [])) {
      for (const sub of (section.subsections || [])) {
        if (sub.id === id) return sub;
      }
    }
  }
  return null;
}

/* --------------------------------------------------------------------------
   _findSubByCustomUrl(path) / _findSectionByCustomUrl(path)
   Walk NAV_DATA looking for an entry whose optional `url` field matches the
   current pathname. Used on initial page load so custom URLs are bookmarkable.
   -------------------------------------------------------------------------- */

function _findSubByCustomUrl(path) {
  for (const chapter of (NAV_DATA || [])) {
    for (const section of (chapter.sections || [])) {
      for (const sub of (section.subsections || [])) {
        if (sub.url && sub.url === path) return sub;
      }
    }
  }
  return null;
}

function _findSectionByCustomUrl(path) {
  for (const chapter of (NAV_DATA || [])) {
    for (const section of (chapter.sections || [])) {
      if (section.url && section.url === path) return { section, chapter };
    }
    if (chapter.url && chapter.url === path) return { chapter };
  }
  return null;
}

/* --------------------------------------------------------------------------
   _stripNumericPrefix(title)
   Removes leading numeric prefixes like "3.3.1. " or "3. " from a title
   string so overview cards show clean names.
   -------------------------------------------------------------------------- */


function _stripNumericPrefix(title) {
  return title.replace(/^[\d.]+\s*/, '');
}


/* --------------------------------------------------------------------------
   loadChapterOverview(chapter)
   Fetches chapters/<chId>/overview.html, injects it, then appends an
   auto-generated sections list so the HTML file stays purely editorial.
   -------------------------------------------------------------------------- */

function loadChapterOverview(chapter) {
  const contentArea = document.getElementById('content-area');
  if (!contentArea) return;

  const pageId = chapter.id + '-overview';
  const file   = chapter.file || ('chapters/' + chapter.id + '/overview.html');

  const _chPushUrl = chapter.url ? chapter.url : _SHELL_URL + '?page=' + _idToPageParam(pageId);
  window.history.pushState({ page: pageId, isChapterOverview: true, chapterId: chapter.id }, '', _chPushUrl);

  const breadcrumb = document.getElementById('breadcrumb');
  if (breadcrumb) breadcrumb.textContent = chapter.title + '  ›  Overview';

  document.querySelectorAll('.nav-subsection-btn, .nav-overview-btn').forEach(btn => btn.classList.remove('active'));

  _setMapBg(true);

  contentArea.style.opacity = '0';
  contentArea.style.transition = 'opacity 0.15s ease';

  fetch(_APP_BASE + file)
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status + ': ' + file);
      return res.text();
    })
    .then(html => {
      contentArea.innerHTML = html;
      const pageWrap = contentArea.querySelector('.page-wrap');
      if (pageWrap) pageWrap.appendChild(_buildSectionsNavCard(chapter));
      contentArea.scrollTop = 0;
      window.scrollTo(0, 0);
      contentArea.style.opacity = '1';
      _activeId = pageId;
    })
    .catch(err => {
      contentArea.innerHTML = `
        <div class="page-wrap">
          <div class="card">
            <h2 class="section-title">Overview Not Found</h2>
            <p class="body-text">Could not load <span class="inline-code">${file}</span>.</p>
            <p class="body-text" style="color:var(--mu);font-size:13px;">${err.message}</p>
          </div>
        </div>`;
      contentArea.style.opacity = '1';
    });
}

/* --------------------------------------------------------------------------
   loadSectionOverview(section, chapter)
   Fetches chapters/<chId>/<sId>/overview.html, injects it, then appends an
   auto-generated subsections list.
   -------------------------------------------------------------------------- */

function loadSectionOverview(section, chapter) {
  const contentArea = document.getElementById('content-area');
  if (!contentArea) return;

  const pageId = section.id + '-overview';
  const [chPart, sPart] = section.id.split('-');
  const file = section.file || ('chapters/' + chPart + '/' + sPart + '/overview.html');

  const _secPushUrl = section.url ? section.url : _SHELL_URL + '?page=' + _idToPageParam(pageId);
  window.history.pushState({ page: pageId, isSectionOverview: true, sectionId: section.id }, '', _secPushUrl);

  const breadcrumb = document.getElementById('breadcrumb');
  if (breadcrumb) {
    breadcrumb.textContent = chapter.title + '  ›  ' + section.title + '  ›  Overview';
  }

  document.querySelectorAll('.nav-subsection-btn, .nav-overview-btn').forEach(btn => btn.classList.remove('active'));

  _setMapBg(true);

  contentArea.style.opacity = '0';
  contentArea.style.transition = 'opacity 0.15s ease';

  fetch(_APP_BASE + file)
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status + ': ' + file);
      return res.text();
    })
    .then(html => {
      contentArea.innerHTML = html;
      const pageWrap = contentArea.querySelector('.page-wrap');
      if (pageWrap) pageWrap.appendChild(_buildSubsectionsNavCard(section));
      contentArea.scrollTop = 0;
      window.scrollTo(0, 0);
      contentArea.style.opacity = '1';
      _activeId = pageId;
    })
    .catch(err => {
      contentArea.innerHTML = `
        <div class="page-wrap">
          <div class="card">
            <h2 class="section-title">Overview Not Found</h2>
            <p class="body-text">Could not load <span class="inline-code">${file}</span>.</p>
            <p class="body-text" style="color:var(--mu);font-size:13px;">${err.message}</p>
          </div>
        </div>`;
      contentArea.style.opacity = '1';
    });
}

/* --------------------------------------------------------------------------
   loadSiteOverview()
   Fetches chapters/ch00/overview.html, injects it, then appends the
   auto-generated full guide map (all chapters → sections → subsections).
   -------------------------------------------------------------------------- */

function loadSiteOverview() {
  const contentArea = document.getElementById('content-area');
  if (!contentArea) return;

  const file   = 'chapters/ch00/overview.html';
  const pageId = 'site-overview';

  window.history.pushState({ page: pageId, isSiteOverview: true }, '', _SHELL_URL + '?page=' + _idToPageParam(pageId));

  const breadcrumb = document.getElementById('breadcrumb');
  if (breadcrumb) breadcrumb.textContent = 'Guide Overview';

  document.querySelectorAll('.nav-subsection-btn, .nav-overview-btn').forEach(btn => btn.classList.remove('active'));
  const ovBtn = document.querySelector('.nav-overview-btn[data-id="ch00"]');
  if (ovBtn) ovBtn.classList.add('active');

  _setMapBg(true);

  contentArea.style.opacity = '0';
  contentArea.style.transition = 'opacity 0.15s ease';

  fetch(_APP_BASE + file)
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status + ': ' + file);
      return res.text();
    })
    .then(html => {
      contentArea.innerHTML = html;
      const pageWrap = contentArea.querySelector('.page-wrap');
      if (pageWrap) pageWrap.appendChild(_buildSiteOverviewCard());
      contentArea.scrollTop = 0;
      window.scrollTo(0, 0);
      contentArea.style.opacity = '1';
      _activeId = pageId;
    })
    .catch(err => {
      contentArea.innerHTML = `
        <div class="page-wrap">
          <div class="card">
            <h2 class="section-title">Overview Not Found</h2>
            <p class="body-text">Could not load <span class="inline-code">${file}</span>.</p>
            <p class="body-text" style="color:var(--mu);font-size:13px;">${err.message}</p>
          </div>
        </div>`;
      contentArea.style.opacity = '1';
    });
}

/* --------------------------------------------------------------------------
   _buildSiteOverviewCard()
   Builds a .card DOM element containing the full ch → sec → sub hierarchy
   for every non-overview chapter in NAV_DATA. Chapters and sections are
   clickable (load their overview). Subsections are clickable (load the page).
   Optional `desc` fields on NAV_DATA entries appear as supporting text.
   -------------------------------------------------------------------------- */

function _buildSiteOverviewCard() {
  const journey = document.createElement('div');
  journey.className = 'ov-journey';

  // Eyebrow label
  const eyebrow = document.createElement('p');
  eyebrow.className = 'ov-journey-eyebrow';
  eyebrow.textContent = 'The Path Ahead';
  journey.appendChild(eyebrow);

  const spine = document.createElement('div');
  spine.className = 'ov-spine';

  // Only include proper chapters (skip the site-overview entry itself)
  const chapters = NAV_DATA.filter(ch => ch.type !== 'site-overview');

  chapters.forEach((chapter, idx) => {
    const chNum = parseInt(chapter.id.replace('ch', ''), 10);
    const side  = idx % 2 === 0 ? 'left' : 'right';

    const stop = document.createElement('div');
    stop.className = 'ov-stop ov-stop-' + side;

    // ---- Card ----
    const card = document.createElement('div');
    card.className = 'ov-stop-card';

    // Floating chapter label above the card
    const chLabel = document.createElement('span');
    chLabel.className = 'ov-stop-ch-label';
    chLabel.textContent = 'Chapter ' + String(chNum).padStart(2, '0');
    card.appendChild(chLabel);

    // Orange chapter tag
    const tag = document.createElement('div');
    tag.className = 'ov-stop-tag';
    tag.textContent = 'Chapter ' + String(chNum).padStart(2, '0');
    card.appendChild(tag);

    // Chapter title — click → chapter overview
    const title = document.createElement('h2');
    title.className = 'ov-stop-title';
    title.textContent = _stripNumericPrefix(chapter.title);
    title.addEventListener('click', e => {
      e.stopPropagation();
      loadChapterOverview(chapter);
    });
    card.appendChild(title);

    // Optional chapter description
    if (chapter.desc && chapter.desc !== '---') {
      const desc = document.createElement('p');
      desc.className = 'ov-stop-ch-desc';
      desc.textContent = chapter.desc;
      card.appendChild(desc);
    }

    // Section bullets
    if (chapter.sections && chapter.sections.length > 0) {
      const bullets = document.createElement('ul');
      bullets.className = 'ov-stop-bullets';

      chapter.sections.forEach(section => {
        const sNum = parseInt(section.id.split('-')[1].replace('s', ''), 10);

        const bullet = document.createElement('li');
        bullet.className = 'ov-stop-bullet';
        bullet.addEventListener('click', () => navToSection(section.id));

        const pip = document.createElement('div');
        pip.className = 'ov-bullet-pip';
        pip.textContent = '→';

        const text = document.createElement('div');
        text.className = 'ov-bullet-text';

        const bTitle = document.createElement('div');
        bTitle.className = 'ov-bullet-title';
        bTitle.textContent = _stripNumericPrefix(section.title);
        text.appendChild(bTitle);

        if (section.desc) {
          const bDesc = document.createElement('div');
          bDesc.className = 'ov-bullet-desc';
          bDesc.textContent = section.desc;
          text.appendChild(bDesc);
        }

        // Subsection items
        if (section.subsections && section.subsections.length > 0) {
          const subList = document.createElement('ul');
          subList.className = 'ov-bullet-subs';

          section.subsections.forEach(sub => {
            const subItem = document.createElement('li');
            subItem.className = 'ov-bullet-sub';
            subItem.textContent = _stripNumericPrefix(sub.title);
            subItem.addEventListener('click', e => {
              e.stopPropagation();
              loadSubsection(sub.file, sub.id);
            });
            subList.appendChild(subItem);
          });

          text.appendChild(subList);
        }

        bullet.appendChild(pip);
        bullet.appendChild(text);
        bullets.appendChild(bullet);
      });

      card.appendChild(bullets);
    }

    stop.appendChild(card);
    spine.appendChild(stop);

    // S-curve connector after every stop (including last → end marker)
    const nextSide = idx < chapters.length - 1
      ? (idx % 2 === 0 ? 'right' : 'left')
      : 'center';
    spine.appendChild(_buildOvConnector(side, nextSide));
  });

  // End marker
  const endMarker = document.createElement('div');
  endMarker.className = 'ov-journey-end';
  const endX = document.createElement('div');
  endX.className = 'ov-journey-end-x';
  endX.textContent = '✕';
  const endLabel = document.createElement('span');
  endLabel.className = 'ov-journey-end-label';
  endLabel.textContent = 'End of Guide Map';
  endMarker.appendChild(endX);
  endMarker.appendChild(endLabel);
  spine.appendChild(endMarker);

  journey.appendChild(spine);
  return journey;
}

/* --------------------------------------------------------------------------
   _buildOvConnector(fromSide, toSide)
   Returns a .ov-connector div containing:
     • Two CSS dot markers (.ov-connector-dot) at the path endpoints
     • An SVG (.ov-connector-svg) with only the dashed bezier path

   Using separate CSS elements for the dots avoids circle distortion that
   would occur inside a non-uniformly-scaled SVG (preserveAspectRatio="none").

   Coordinate reference — x values as % of container width:
     Left card right edge  ≈ 68%   (margin-left 2% + width 66%)
     Right card left edge  ≈ 32%   (100% − 66% − 2%)
     Center (end marker)   ≈ 50%
   -------------------------------------------------------------------------- */
function _buildOvConnector(fromSide, toSide) {
  const xMap = { left: 68, right: 32, center: 50 };
  const x0 = xMap[fromSide] !== undefined ? xMap[fromSide] : 50;
  const x1 = xMap[toSide]   !== undefined ? xMap[toSide]   : 50;

  // Wrapper div — styled by .ov-connector
  const wrap = document.createElement('div');
  wrap.className = 'ov-connector';

  // Top dot (start of path — bottom edge of the card above)
  const dot0 = document.createElement('span');
  dot0.className = 'ov-connector-dot';
  dot0.style.left = x0 + '%';
  wrap.appendChild(dot0);

  // SVG — only the S-curve path, no shapes that would distort
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'ov-connector-svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  // Cubic bezier: control points hold their column's x at the halfway point
  path.setAttribute('d', `M ${x0} 0 C ${x0} 50, ${x1} 50, ${x1} 100`);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'rgba(217,119,87,0.35)');
  path.setAttribute('stroke-width', '1.5');
  path.setAttribute('vector-effect', 'non-scaling-stroke');
  path.setAttribute('stroke-dasharray', '5 5');
  svg.appendChild(path);
  wrap.appendChild(svg);

  // Bottom dot (end of path — top edge of the card below)
  const dot1 = document.createElement('span');
  dot1.className = 'ov-connector-dot';
  dot1.style.left = x1 + '%';
  wrap.appendChild(dot1);

  return wrap;
}

/* --------------------------------------------------------------------------
   _buildSectionsNavCard(chapter)
   Returns a .card DOM element listing all sections in a chapter as rows.
   Appended to .page-wrap after the editorial HTML is injected.
   -------------------------------------------------------------------------- */
/*
function _buildSectionsNavCard(chapter) {
  const chNum  = parseInt(chapter.id.replace('ch', ''), 10);
  const card   = document.createElement('div');
  card.className = 'card';

  const heading = chapter.sections.length === 1
    ? 'Section in this Chapter'
    : 'Sections in this Chapter';

  let html = '<h2 class="section-title">' + heading + '</h2><ul class="overview-list">';

  chapter.sections.forEach(section => {
    const sNum     = parseInt(section.id.split('-')[1].replace('s', ''), 10);
    const numLabel = chNum + '.' + sNum;
    const subCount = section.subsections.length;
    html += `
      <li class="overview-list-item" onclick="navToSection('${section.id}')">
        <div class="overview-list-num">${numLabel}</div>
        <div class="overview-list-body">
          <div class="overview-list-title">${_stripNumericPrefix(section.title)}</div>
          <div class="overview-list-meta">${subCount} subsection${subCount !== 1 ? 's' : ''}</div>
        </div>
        <span class="overview-list-arrow">→</span>
      </li>`;
  });

  html += '</ul>';
  card.innerHTML = html;
  return card;
}
*/

function _buildSectionsNavCard(chapter) {
  const chNum  = parseInt(chapter.id.replace('ch', ''), 10);
  const card   = document.createElement('div');
  card.className = 'card';

  const heading = chapter.sections.length === 1
    ? 'Section in this Chapter'
    : 'Sections in this Chapter';

  const headingEl = document.createElement('h2');
  headingEl.className = 'section-title';
  headingEl.textContent = heading;
  card.appendChild(headingEl);

  const ul = document.createElement('ul');
  ul.className = 'ov-nav-list';

  chapter.sections.forEach(section => {
    const sNum     = parseInt(section.id.split('-')[1].replace('s', ''), 10);
    const numLabel = chNum + '.' + sNum;
    const subCount = section.subsections.length;

    const li = document.createElement('li');
    li.className = 'ov-nav-item';

    // Top row: num badge + title + arrow
    const top = document.createElement('div');
    top.className = 'ov-nav-item-top';

    const num = document.createElement('span');
    num.className = 'ov-nav-item-num';
    num.textContent = numLabel;

    const title = document.createElement('div');
    title.className = 'ov-nav-item-title';
    title.textContent = _stripNumericPrefix(section.title);

    const arrow = document.createElement('span');
    arrow.className = 'ov-nav-item-arrow';
    arrow.textContent = '→';

    top.appendChild(num);
    top.appendChild(title);
    top.appendChild(arrow);
    li.appendChild(top);

    // Description
    if (section.desc) {
      const desc = document.createElement('p');
      desc.className = 'ov-nav-item-desc';
      desc.textContent = section.desc;
      li.appendChild(desc);
    }

    // Footer: subsection count
    const footer = document.createElement('div');
    footer.className = 'ov-nav-item-footer';

    const count = document.createElement('span');
    count.className = 'ov-nav-item-count';
    count.textContent = subCount + ' subsection' + (subCount !== 1 ? 's' : '');
    footer.appendChild(count);

    li.appendChild(footer);

    li.addEventListener('click', () => navToSection(section.id));
    ul.appendChild(li);
  });

  card.appendChild(ul);
  return card;
}

/* --------------------------------------------------------------------------
   _buildSubsectionsNavCard(section)
   Returns a .card DOM element listing all subsections as rows.
   Appended to .page-wrap after the editorial HTML is injected.
   -------------------------------------------------------------------------- */

/*
function _buildSubsectionsNavCard(section) {
  const parts  = section.id.split('-');
  const chNum  = parseInt(parts[0].replace('ch', ''), 10);
  const sNum   = parseInt(parts[1].replace('s',  ''), 10);
  const card   = document.createElement('div');
  card.className = 'card';

  let html = '<h2 class="section-title">Subsections</h2><ul class="overview-list">';

  section.subsections.forEach((sub, idx) => {
    const numLabel = chNum + '.' + sNum + '.' + (idx + 1);
    html += `
      <li class="overview-list-item" onclick="loadSubsection('${sub.file}', '${sub.id}')">
        <div class="overview-list-num">${numLabel}</div>
        <div class="overview-list-body">
          <div class="overview-list-title">${_stripNumericPrefix(sub.title)}</div>
        </div>
        <span class="overview-list-arrow">→</span>
      </li>`;
  });

  html += '</ul>';
  card.innerHTML = html;
  return card;
}

*/

function _buildSubsectionsNavCard(section) {
  const parts  = section.id.split('-');
  const chNum  = parseInt(parts[0].replace('ch', ''), 10);
  const sNum   = parseInt(parts[1].replace('s',  ''), 10);
  const card   = document.createElement('div');
  card.className = 'card';

  const headingEl = document.createElement('h2');
  headingEl.className = 'section-title';
  headingEl.textContent = 'Subsections';
  card.appendChild(headingEl);

  const ul = document.createElement('ul');
  ul.className = 'ov-nav-list';

  section.subsections.forEach((sub, idx) => {
    const numLabel = chNum + '.' + sNum + '.' + (idx + 1);

    const li = document.createElement('li');
    li.className = 'ov-nav-item';

    // Top row: num badge + title + arrow
    const top = document.createElement('div');
    top.className = 'ov-nav-item-top';

    const num = document.createElement('span');
    num.className = 'ov-nav-item-num';
    num.textContent = numLabel;

    const title = document.createElement('div');
    title.className = 'ov-nav-item-title';
    title.textContent = _stripNumericPrefix(sub.title);

    const arrow = document.createElement('span');
    arrow.className = 'ov-nav-item-arrow';
    arrow.textContent = '→';

    top.appendChild(num);
    top.appendChild(title);
    top.appendChild(arrow);
    li.appendChild(top);

    // Description
    if (sub.desc) {
      const desc = document.createElement('p');
      desc.className = 'ov-nav-item-desc';
      desc.textContent = sub.desc;
      li.appendChild(desc);
    }

    li.addEventListener('click', () => loadSubsection(sub.file, sub.id));
    ul.appendChild(li);
  });

  card.appendChild(ul);
  return card;
}

/* --------------------------------------------------------------------------
   navToSection(sectionId)
   Called by onclick in section list rows on chapter overview pages.
   Expands the chapter/section in the nav and loads the section overview.
   -------------------------------------------------------------------------- */

/*
function navToSection(sectionId) {
  for (const chapter of (NAV_DATA || [])) {
    const section = chapter.sections.find(s => s.id === sectionId);
    if (!section) continue;

    // Expand the chapter in the nav
    const chapterEl = document.querySelector(`.nav-chapter[data-id="${chapter.id}"]`);
    if (chapterEl) {
      chapterEl.classList.add('open');
      const chBtn = chapterEl.querySelector('.nav-chapter-btn');
      if (chBtn) chBtn.setAttribute('aria-expanded', 'true');
    }

    // Expand the section in the nav
    const sectionEl = document.querySelector(`.nav-section[data-id="${sectionId}"]`);
    if (sectionEl) {
      sectionEl.classList.add('open');
      const secBtn = sectionEl.querySelector('.nav-section-btn');
      if (secBtn) secBtn.setAttribute('aria-expanded', 'true');
    }

    loadSectionOverview(section, chapter);
    return;
  }
}
*/
function navToSection(sectionId) {
  console.log('%cnavToSection called with ID:', 'color:#10b981;font-weight:bold', sectionId);

  for (const chapter of (NAV_DATA || [])) {
    // Skip entries without sections (like ch00)
    if (!chapter.sections || !Array.isArray(chapter.sections)) continue;

    const section = chapter.sections.find(s => s.id === sectionId);
    if (!section) continue;

    console.log('✓ Found section in chapter', chapter.id, ':', section.title);

    // Expand chapter + section in the sidebar nav
    const chapterEl = document.querySelector(`.nav-chapter[data-id="${chapter.id}"]`);
    if (chapterEl) {
      chapterEl.classList.add('open');
      const chBtn = chapterEl.querySelector('.nav-chapter-btn');
      if (chBtn) chBtn.setAttribute('aria-expanded', 'true');
    }

    const sectionEl = document.querySelector(`.nav-section[data-id="${sectionId}"]`);
    if (sectionEl) {
      sectionEl.classList.add('open');
      const secBtn = sectionEl.querySelector('.nav-section-btn');
      if (secBtn) secBtn.setAttribute('aria-expanded', 'true');
    }

    // ← THIS IS THE KEY CHANGE: load the section overview instead of first subsection
    loadSectionOverview(section, chapter);
    return;
  }

  console.error('❌ Could not find section with ID:', sectionId);
}

/* --------------------------------------------------------------------------
   toggleFocus()
   Adds/removes .focus-mode on body.
   -------------------------------------------------------------------------- */

function toggleFocus() {
  document.body.classList.toggle('focus-mode');
}

/* --------------------------------------------------------------------------
   trimDirTree()
   Strips the common leading whitespace from every line inside .dir-tree code
   blocks so authors can indent the raw HTML without that indentation showing
   up in the rendered tree.
   -------------------------------------------------------------------------- */

function trimDirTree() {
  document.querySelectorAll('.dir-tree code').forEach(function (code) {
    var lines = code.innerHTML.split('\n');

    // Find the minimum indentation across all non-blank lines
    var min = Infinity;
    lines.forEach(function (line) {
      if (line.trim() === '') return;
      var m = line.match(/^(\s+)/);
      min = Math.min(min, m ? m[1].length : 0);
    });

    if (min === 0 || min === Infinity) return;

    // Strip that indent and remove surrounding blank lines
    code.innerHTML = lines
      .map(function (l) { return l.slice(min); })
      .join('\n')
      .replace(/^\n+/, '')
      .replace(/\s+$/, '');
  });
}

/* --------------------------------------------------------------------------
   trimCodeBlocks()
   Strips the common leading whitespace from every line inside .code-body
   pre code blocks so authors can indent the raw HTML normally without that
   indentation polluting the rendered output. Relative indentation (e.g. an
   indented continuation line) is preserved because only the shared minimum
   is removed.
   -------------------------------------------------------------------------- */

function trimCodeBlocks() {
  document.querySelectorAll('.code-body pre code').forEach(function (code) {
    var lines = code.innerHTML.split('\n');

    // Find the minimum indentation across all non-blank lines
    var min = Infinity;
    lines.forEach(function (line) {
      // Strip HTML tags before measuring whitespace so spans don't skew the count
      var plain = line.replace(/<[^>]*>/g, '');
      if (plain.trim() === '') return;
      var m = plain.match(/^(\s+)/);
      min = Math.min(min, m ? m[1].length : 0);
    });

    if (min === 0 || min === Infinity) return;

    // Strip that shared indent and trim surrounding blank lines
    code.innerHTML = lines
      .map(function (l) { return l.slice(min); })
      .join('\n')
      .replace(/^\n+/, '')
      .replace(/\s+$/, '');
  });
}

/* --------------------------------------------------------------------------
   copyCode(btn)
   Copies code block content to clipboard.
   -------------------------------------------------------------------------- */

function copyCode(btn) {
  const block = btn.closest('.code-block');
  if (!block) return;
  const code = block.querySelector('pre code');
  if (!code) return;

  navigator.clipboard.writeText(code.innerText).then(() => {
    btn.textContent = 'copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'copy';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    btn.textContent = 'error';
    setTimeout(() => { btn.textContent = 'copy'; }, 2000);
  });
}

/* --------------------------------------------------------------------------
   DOMContentLoaded — initialise
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  buildNav();

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    // Ignore when typing in input fields
    if (e.target.matches('input, textarea, select')) return;

    if (e.key === 'f' || e.key === 'F') {
      // Don't trigger if a modifier is held
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        toggleFocus();
      }
    }

    if (e.key === 'Escape') {
      // Exit focus mode if active
      if (document.body.classList.contains('focus-mode')) {
        document.body.classList.remove('focus-mode');
      }
      // Close mobile nav
      const navPanel = document.getElementById('nav-panel');
      if (navPanel) navPanel.classList.remove('open');
    }
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navPanel = document.getElementById('nav-panel');
  if (navToggle && navPanel) {
    navToggle.addEventListener('click', () => {
      navPanel.classList.toggle('open');
    });

    // Close nav when clicking outside on mobile
    document.addEventListener('click', e => {
      if (
        navPanel.classList.contains('open') &&
        !navPanel.contains(e.target) &&
        e.target !== navToggle
      ) {
        navPanel.classList.remove('open');
      }
    });
  }

  // Exit focus button
  const exitFocusBtn = document.getElementById('exit-focus-btn');
  if (exitFocusBtn) {
    exitFocusBtn.addEventListener('click', () => {
      document.body.classList.remove('focus-mode');
    });
  }

  // Handle browser back/forward navigation
  window.addEventListener('popstate', e => {
    if (!e.state) return;
    if (e.state.isSiteOverview) {
      loadSiteOverview();
    } else if (e.state.isChapterOverview) {
      const chapter = NAV_DATA.find(ch => ch.id === e.state.chapterId);
      if (chapter) loadChapterOverview(chapter);
    } else if (e.state.isSectionOverview) {
      for (const ch of NAV_DATA) {
        const section = ch.sections.find(s => s.id === e.state.sectionId);
        if (section) { loadSectionOverview(section, ch); break; }
      }
    } else if (e.state.page && e.state.file) {
      loadSubsection(e.state.file, e.state.page);
    }
  });

  // Load initial page — GitHub Pages 404 redirect via sessionStorage
  const _ghRedir = sessionStorage.getItem('spa-redirect');
  if (_ghRedir) {
    sessionStorage.removeItem('spa-redirect');
    const _redirSub = _findSubByCustomUrl(_ghRedir);
    if (_redirSub) { loadSubsection(_redirSub.file, _redirSub.id); return; }
    const _redirOv = _findSectionByCustomUrl(_ghRedir);
    if (_redirOv) {
      if (_redirOv.section) { loadSectionOverview(_redirOv.section, _redirOv.chapter); return; }
      if (_redirOv.chapter) { loadChapterOverview(_redirOv.chapter); return; }
    }
  }

  // Check custom URL paths (works with serve.py which serves shell.html for any path)
  const _customSub = _findSubByCustomUrl(location.pathname);
  if (_customSub) { loadSubsection(_customSub.file, _customSub.id); return; }

  const _customOv = _findSectionByCustomUrl(location.pathname);
  if (_customOv) {
    if (_customOv.section) { loadSectionOverview(_customOv.section, _customOv.chapter); return; }
    if (_customOv.chapter) { loadChapterOverview(_customOv.chapter); return; }
  }

  const params = new URLSearchParams(window.location.search);
  const rawPage = params.get('page');
  const pageId = rawPage ? _pageParamToId(rawPage) : null;

  if (pageId) {
    // Site overview
    if (pageId === 'site-overview') { loadSiteOverview(); return; }

    // Check for chapter/section overview pages
    if (pageId.endsWith('-overview')) {
      const baseId = pageId.replace('-overview', '');
      const chapter = NAV_DATA.find(ch => ch.id === baseId);
      if (chapter) { loadChapterOverview(chapter); return; }
      for (const ch of NAV_DATA) {
        const section = (ch.sections || []).find(s => s.id === baseId);
        if (section) { loadSectionOverview(section, ch); return; }
      }
    }
    const sub = _findSubsectionById(pageId);
    if (sub) {
      loadSubsection(sub.file, sub.id);
      return;
    }
  }

  // Default: site overview
  loadSiteOverview();
});
