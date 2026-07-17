const returnFilm = {
  title: 'The Return',
  tagline: 'The edge was never the throne.',
  description: 'A king leaves the exhausted edge of the map and returns to an abandoned center. Across four acts—exile, ruin, false rule, and restoration—he discovers that expansion becomes disorder when no one returns to inhabit the center.',
  short: 'A symbolic microfilm about leaving the edge of the map and returning to restore the center.',
  meta: ['Symbolic short', 'Mythic realism', '56 seconds'],
  src: 'https://pub-c33da43b9bfb4bd282e74ed34b19f234.r2.dev/JwBRGIA2UzZkf32WC1Pn__merged_video.mp4',
  seek: 4
};

function mountReturnRelease() {
  const rail = document.querySelector('#filmRail');
  const dialog = document.querySelector('#player');
  const mainVideo = document.querySelector('#mainVideo');
  if (!rail || !dialog || !mainVideo || document.querySelector('[data-return-release]')) return;

  const style = document.createElement('style');
  style.textContent = `
    .return-release-badge{position:absolute;z-index:3;top:12px;left:12px;padding:6px 9px;border-radius:3px;background:#e50914;color:#fff;font:800 10px/1 Arial,sans-serif;letter-spacing:.12em}
    .return-release-card{outline:1px solid rgba(229,9,20,.38)}
    .return-release-card:focus-visible{outline:2px solid #fff}
  `;
  document.head.appendChild(style);

  const card = document.createElement('button');
  card.className = 'card return-release-card';
  card.type = 'button';
  card.dataset.returnRelease = 'true';
  card.innerHTML = `
    <div class="card-media">
      <video class="preview" muted loop playsinline preload="metadata" src="${returnFilm.src}"></video>
      <span class="return-release-badge">NEW RELEASE</span>
      <span class="play-dot">▶</span>
    </div>
    <div class="card-copy">
      <div class="card-title">${returnFilm.title}</div>
      <div class="card-desc">${returnFilm.short}</div>
    </div>`;
  rail.prepend(card);

  const preview = card.querySelector('video');
  preview.addEventListener('loadedmetadata', () => {
    try { preview.currentTime = Math.min(returnFilm.seek, Math.max(0, preview.duration - .2)); } catch {}
  }, { once: true });
  preview.play().catch(() => {});

  card.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    mainVideo.src = returnFilm.src;
    document.querySelector('#detailTitle').textContent = returnFilm.title;
    document.querySelector('#detailTag').textContent = returnFilm.tagline;
    document.querySelector('#detailDescription').textContent = returnFilm.description;
    document.querySelector('#detailMeta').innerHTML = returnFilm.meta.map(x => `<span>${x}</span>`).join('');
    dialog.showModal();
    mainVideo.play().catch(() => {});
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(mountReturnRelease, 0));
} else {
  setTimeout(mountReturnRelease, 0);
}
