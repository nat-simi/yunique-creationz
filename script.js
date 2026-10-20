function start(PROJECTS) {
  const grid = document.getElementById("grid");
  const filters = document.getElementById("filters");
  const modal = document.getElementById("modal");
  const modalMedia = document.getElementById("modalMedia");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");


  // ---------- Filters ----------
  const categories = ["All", ...new Set(PROJECTS.map(p => p.category))];
  let active = "All";

  function renderFilters() {
    filters.innerHTML = "";
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.className = "filter" + (cat === active ? " active" : "");
      btn.textContent = cat;
      btn.addEventListener("click", () => {
        active = cat;
        renderFilters();
        renderGrid();
      });
      filters.appendChild(btn);
    });
  }

  // ---------- Grid ----------
  function renderGrid() {
    grid.innerHTML = "";
    const list = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);

    if (!list.length) {
      grid.innerHTML = '<p class="empty">New projects coming soon.</p>';
      return;
    }

    list.forEach((project, i) => {
      const card = document.createElement("button");
      card.className = "card";
      card.setAttribute("aria-label", "Open project: " + project.title);

      const media = document.createElement("div");
      media.className = "card-media";
      if (project.image) {
        const img = document.createElement("img");
        img.src = project.image;
        img.alt = project.title;
        img.loading = "lazy";
        media.appendChild(img);
      } else {
        const ph = document.createElement("div");
        ph.className = "card-placeholder";
        ph.textContent = project.title;
        media.appendChild(ph);
      }

      const body = document.createElement("div");
      body.className = "card-body";
      body.innerHTML = `
        <div class="card-tag">${project.category}</div>
        <div class="card-title">${project.title}</div>`;

      card.appendChild(media);
      card.appendChild(body);
      card.addEventListener("click", () => openModal(project));
      grid.appendChild(card);
    });
  }

  // ---------- Modal ----------
  function openModal(project) {
    modalMedia.innerHTML = "";
    if (project.image) {
      const img = document.createElement("img");
      img.src = project.image;
      img.alt = project.title;
      modalMedia.appendChild(img);
    } else {
      modalMedia.style.display = "none";
    }
    modalMedia.style.display = project.image ? "block" : "none";
    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.description;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  modal.addEventListener("click", e => {
    if (e.target.hasAttribute("data-close")) closeModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });

  renderFilters();
  renderGrid();
}

(window.PROJECTS
  ? Promise.resolve(window.PROJECTS)
  : fetch("projects.json").then(r => r.json()).then(d => d.projects)
).then(start).catch(() => {
  document.getElementById("grid").innerHTML = '<p class="empty">Projects will appear here soon.</p>';
});
