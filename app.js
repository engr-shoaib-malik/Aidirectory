async function start() {
  const container = document.getElementById('tools-container');
  if (!container) return;

  try {
    const response = await fetch('./tools.json');
    if (!response.ok) throw new Error('Cannot find tools.json');
    
    const data = await response.json();
    
    if (data.length > 0) {
      container.innerHTML = data.map(tool => `
        <div class="tool-card">
          <div class="tool-name" style="color:white; font-weight:bold;">${tool.name}</div>
          <div style="color:#aaa; font-size:12px;">${tool.tagline || tool.description}</div>
          <div style="color:#a855f7; font-size:12px; margin-top:10px;">${tool.category}</div>
        </div>
      `).join('');
    } else {
      container.innerHTML = '<p style="color:white;">JSON file is empty</p>';
    }
  } catch (err) {
    container.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
  }
}

start();
