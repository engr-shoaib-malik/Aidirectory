let tools = [];

async function loadTools() {
  try {
    const res = await fetch('tools.json');
    tools = await res.json();
    document.getElementById('total-count') && (document.getElementById('total-count').textContent = tools.length + '+');
  } catch (e) {
    console.error('Could not load tools.json', e);
  }
}

function getLogoContent(tool) {
  if (tool.logo) return `<img src="${tool.logo}" alt="${tool.name}" onerror="this.parentElement.textContent='${tool.name[0]}'">`;
  return tool.name[0];
}

function createCard(tool, index) {
  return `
    <div class="tool-card fade-up" onclick="window.location='tool.html?id=${tool.id}'" style="animation-delay:${index * 0.05}s">
      ${tool.featured ? '<div class="featured-badge">Featured</div>' : ''}
      <div class="card-top">
        <div class="tool-logo">${getLogoContent(tool)}</div>
        <span class="pricing-badge ${tool.pricing}">${tool.pricing}</span>
      </div>
      <div class="tool-name">${tool.name}</div>
      <div class="tool-tagline">${tool.tagline}</div>
      <div class="card-footer">
        <span class="tool-category">${tool.category}</span>
        <span class="tool-rating"><span class="star">★</span> ${tool.rating}</span>
      </div>
    </div>
  `;
}

loadTools();
