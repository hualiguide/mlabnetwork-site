// app.js

// Set footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Load members.json and render cards
(async () => {
  try {
    const res = await fetch("members.json");
    if (!res.ok) throw new Error("Failed to load members.json");
    const members = await res.json();

    const grid = document.getElementById("team-grid");
    grid.innerHTML = "";

    members.forEach((m) => {
      const card = document.createElement("article");
      card.className = "team-card";

      const avatar = document.createElement("div");
      avatar.className = "team-avatar";

      if (m.avatar) {
        const img = document.createElement("img");
        img.src = m.avatar;
        img.alt = `${m.name} avatar`;
        avatar.appendChild(img);
      } else {
        const initials = (m.name || "?")
          .split(" ")
          .map((p) => p[0])
          .join("")
          .slice(0, 3)
          .toUpperCase();
        avatar.textContent = initials;
      }

      const meta = document.createElement("div");
      meta.className = "team-meta";

      const nameEl = document.createElement("h3");
      nameEl.textContent = m.name || "Unnamed Member";

      const roleEl = document.createElement("p");
      roleEl.className = "team-role";
      roleEl.textContent = m.role || "";

      const taglineEl = document.createElement("p");
      taglineEl.className = "team-tagline";
      taglineEl.textContent = m.tagline || "";

      const links = document.createElement("div");
      links.className = "team-links";

      if (m.linkedin) {
        const a = document.createElement("a");
        a.href = m.linkedin;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = "btn-linkedin";
        a.innerHTML = `🔗 View on LinkedIn`;
        links.appendChild(a);
      }

      meta.appendChild(nameEl);
      if (m.role) meta.appendChild(roleEl);
      if (m.tagline) meta.appendChild(taglineEl);
      if (links.childNodes.length > 0) meta.appendChild(links);

      card.appendChild(avatar);
      card.appendChild(meta);

      grid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    const grid = document.getElementById("team-grid");
    grid.innerHTML =
      '<p style="color: #f87171;">Failed to load team members. Check members.json.</p>';
  }
})();
