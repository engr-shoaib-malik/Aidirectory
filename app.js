let tools = [];

async function loadTools() {
  const container = document.getElementById('tools-container');
  
  try {
    // 1. Check if we already have tools to prevent vanishing
    if (tools.length > 0) return;

    const res = await fetch('./tools.json');
    if (!res.ok) throw new Error('File not found');
    
    tools = await res.json();

    // 2. Update the counter if it exists
    const countEl = document.getElementById('total-count');
    if (countEl) countEl.textContent = tools.length + '+';

    // 3. Render the tools
    if (container) {
      displayTools(tools);
    }
  } catch (e) {
    console.error('Error:', e);
    if (container && tools.length === 0) {
      container.innerHTML = '<p style="color:white; text-align:center;">Loading error. Please refresh.</p>';
    }
  }
}

function createCard(tool, index) {
  // Matches your tools.json fields exactly
  return `
    <div class="tool-card fade-up" onclick="window.location='tool.html?id=${tool.id}'" style="animation-delay:${index * 0.05}s">
      ${tool.featured ? '<div class="featured-badge">Featured</div>' : ''}
      <div class="card-top">
        <div class="tool-logo">${tool.name[0]}</div>
        <span class="pricing-badge">${tool.pricing || 'Free'}</span>
      </div>
      <div class="tool-name">${tool.name}</div>
      <div class="tool-tagline">${tool.tagline}</div>
      <div class="card-footer">
        <span class="tool-category">${tool.category}</span>
        <span class="tool-rating"><span class="star">★</span> ${tool.rating || '5.0'}</span>
      </div>
    </div>
  `;
}

function displayTools(data) {
  const container = document.getElementById('tools-container');
  if (!container) return;
  
  if (!data || data.length === 0) {
    container.innerHTML = '<div class="no-results">No AI tools found</div>';
    return;
  }
  
  container.innerHTML = data.map((t, i) => createCard(t, i)).join('');
}

// Run immediately
loadTools();

// Run again when the page is fully finished just in case
window.addEventListener('DOMContentLoaded', loadTools);
