/* ==========================================================================
   SAMSUNG VISION HUB - APPLICATION LOGIC & INTERACTIVE SUITE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initializers
  initNavigation();
  initSmartDevices();
  initCharts();
  initGalaxyAIStudio();
  initProductConfigurator();
  initDiagnostics();
  initAmbientCanvas();
  initModalsAndEvents();
});

/* --------------------------------------------------------------------------
   1. NAVIGATION & TAB SYSTEM
   -------------------------------------------------------------------------- */
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-item');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');

  const tabTitles = {
    'dashboard': {
      title: 'Ecosystem Overview',
      subtitle: 'Real-time intelligent sync with 14 connected Samsung devices.'
    },
    'smarthome': {
      title: 'SmartThings IoT Control Center',
      subtitle: 'Manage active appliances, lighting routines, and connected sensors.'
    },
    'galaxy-ai': {
      title: 'Galaxy AI Vision & Generative Studio',
      subtitle: 'Harness NPU-powered Generative Art, Interpreter, and Predictive Automations.'
    },
    'showcase': {
      title: '3D Interactive Product Studio',
      subtitle: 'Customize flagship Samsung Galaxy devices with instant VIP specs.'
    },
    'energy': {
      title: 'SmartThings Eco & Energy Grid',
      subtitle: 'Monitor solar generation, carbon footprint savings, and battery reserve.'
    },
    'diagnostics': {
      title: 'Knox Security & Device Health Diagnostics',
      subtitle: 'Deep hardware diagnostics and firmware status checks.'
    }
  };

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabKey = btn.getAttribute('data-tab');

      navButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(`tab-${tabKey}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      if (tabTitles[tabKey]) {
        pageTitle.textContent = tabTitles[tabKey].title;
        pageSubtitle.textContent = tabTitles[tabKey].subtitle;
      }
    });
  });

  // Hero section shortcuts
  document.getElementById('launch-ai-mode')?.addEventListener('click', () => {
    document.querySelector('.nav-item[data-tab="galaxy-ai"]').click();
  });

  document.getElementById('view-devices-btn')?.addEventListener('click', () => {
    document.querySelector('.nav-item[data-tab="smarthome"]').click();
  });
}

/* --------------------------------------------------------------------------
   2. SMARTTHINGS IOT DEVICES SYSTEM
   -------------------------------------------------------------------------- */
const devicesData = [
  { id: 1, name: 'Neo QLED 8K TV (85")', room: 'living', icon: 'fa-tv', status: 'ON', mode: 'Cinema Mode (8K HDR)', power: '180W' },
  { id: 2, name: 'Bespoke AI Refrigerator', room: 'kitchen', icon: 'fa-box-tissue', status: 'ON', mode: 'Family Hub Active (3°C)', power: '95W' },
  { id: 3, name: 'Bespoke WindFree AirCon', room: 'bedroom', icon: 'fa-snowflake', status: 'ON', mode: 'Cool (21.5°C)', power: '420W' },
  { id: 4, name: 'Bespoke Jet Bot AI+ Vacuum', room: 'living', icon: 'fa-robot', status: 'OFF', mode: 'Docked & Charging', power: '12W' },
  { id: 5, name: 'Galaxy Soundbar Q990D', room: 'living', icon: 'fa-volume-high', status: 'ON', mode: 'Dolby Atmos 11.1.4', power: '60W' },
  { id: 6, name: 'Bespoke AI Washer & Dryer', room: 'kitchen', icon: 'fa-soap', status: 'OFF', mode: 'Idle (Wash Ready)', power: '0W' },
  { id: 7, name: 'SmartThings Smart Door Lock', room: 'living', icon: 'fa-lock', status: 'ON', mode: 'Knox Encrypted Locked', power: '4W' },
  { id: 8, name: 'Smart Office Odyssey OLED G9', room: 'office', icon: 'fa-desktop', status: 'ON', mode: 'DisplayPort 240Hz', power: '85W' },
  { id: 9, name: 'Bespoke Air Purifier', room: 'bedroom', icon: 'fa-wind', status: 'ON', mode: 'Silent Night Purify', power: '22W' },
  { id: 10, name: 'SmartThings RGB Accent Lighting', room: 'living', icon: 'fa-lightbulb', status: 'ON', mode: 'Cyber Neon Sync (45%)', power: '18W' },
  { id: 11, name: 'Bespoke Smart Oven', room: 'kitchen', icon: 'fa-fire', status: 'OFF', mode: 'Preheat Ready', power: '0W' },
  { id: 12, name: 'Smart Office Galaxy Book4 Ultra', room: 'office', icon: 'fa-laptop', status: 'ON', mode: 'Connected via Link to Windows', power: '45W' }
];

function initSmartDevices() {
  const container = document.getElementById('devices-container');
  const roomChips = document.querySelectorAll('.room-chip');

  function renderDevices(filterRoom = 'all') {
    if (!container) return;
    container.innerHTML = '';

    const filtered = filterRoom === 'all' 
      ? devicesData 
      : devicesData.filter(d => d.room === filterRoom);

    filtered.forEach(dev => {
      const card = document.createElement('div');
      card.className = `device-card ${dev.status === 'ON' ? 'on' : ''}`;
      card.innerHTML = `
        <div class="device-top">
          <div class="device-icon-box">
            <i class="fa-solid ${dev.icon}"></i>
          </div>
          <label class="switch">
            <input type="checkbox" ${dev.status === 'ON' ? 'checked' : ''} data-id="${dev.id}">
            <span class="slider"></span>
          </label>
        </div>
        <div class="device-name">${dev.name}</div>
        <div class="device-room">${dev.room.toUpperCase()} • ${dev.mode}</div>
        <div class="device-meta">
          <span>Power draw:</span>
          <strong>${dev.power}</strong>
        </div>
      `;

      // Toggle listener
      const toggle = card.querySelector('input');
      toggle.addEventListener('change', (e) => {
        dev.status = e.target.checked ? 'ON' : 'OFF';
        if (dev.status === 'OFF') {
          dev.power = '0W';
        } else {
          dev.power = Math.floor(Math.random() * 150 + 20) + 'W';
        }
        renderDevices(filterRoom);
        showToast(`${dev.name} turned ${dev.status}`, dev.status === 'ON' ? 'info' : 'warning');
      });

      container.appendChild(card);
    });
  }

  roomChips.forEach(chip => {
    chip.addEventListener('click', () => {
      roomChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      renderDevices(chip.getAttribute('data-room'));
    });
  });

  renderDevices();
}

/* --------------------------------------------------------------------------
   3. CHARTS INITIALIZATION (CHART.JS)
   -------------------------------------------------------------------------- */
function initCharts() {
  // Dashboard Energy Line Chart
  const dashCanvas = document.getElementById('dashboard-energy-chart');
  if (dashCanvas) {
    const ctx = dashCanvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(0, 210, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(0, 102, 255, 0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
        datasets: [{
          label: 'Grid Power Draw (kW)',
          data: [1.2, 0.8, 1.1, 2.4, 3.1, 2.8, 4.2, 2.4],
          borderColor: '#00d2ff',
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#0066ff',
          pointBorderColor: '#ffffff',
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } }
        }
      }
    });
  }

  // Large Eco Grid Bar/Line Chart
  const ecoCanvas = document.getElementById('eco-grid-chart');
  if (ecoCanvas) {
    const ctx = ecoCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Solar Generated (kWh)',
            data: [18.4, 22.1, 19.5, 24.8, 28.2, 26.0, 29.5],
            backgroundColor: 'rgba(0, 210, 255, 0.6)',
            borderRadius: 6
          },
          {
            label: 'Total Home Consumption (kWh)',
            data: [14.2, 16.5, 15.0, 18.2, 20.1, 19.4, 18.0],
            backgroundColor: 'rgba(139, 92, 246, 0.5)',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#f8fafc', font: { family: 'Plus Jakarta Sans' } } }
        },
        scales: {
          x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8' } }
        }
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. GALAXY AI STUDIO
   -------------------------------------------------------------------------- */
function initGalaxyAIStudio() {
  const toolItems = document.querySelectorAll('.ai-tool-item');
  const toolViewports = document.querySelectorAll('.tool-viewport');
  const promptInput = document.getElementById('ai-prompt-input');
  const generateBtn = document.getElementById('generate-ai-img-btn');
  const placeholder = document.getElementById('ai-placeholder');
  const loader = document.getElementById('ai-loader');
  const generatedImg = document.getElementById('generated-image');
  const imgActions = document.getElementById('ai-img-actions');
  const presetTags = document.querySelectorAll('.preset-tag');

  // Tool view switching
  toolItems.forEach(item => {
    item.addEventListener('click', () => {
      const toolKey = item.getAttribute('data-tool');
      toolItems.forEach(i => i.classList.remove('active'));
      toolViewports.forEach(v => v.classList.add('hidden'));

      item.classList.add('active');
      const activeViewport = document.getElementById(`tool-${toolKey}`);
      if (activeViewport) activeViewport.classList.remove('hidden');
    });
  });

  // Preset tag click
  presetTags.forEach(tag => {
    tag.addEventListener('click', () => {
      promptInput.value = tag.getAttribute('data-prompt');
    });
  });

  // Generate Image Simulation
  generateBtn?.addEventListener('click', () => {
    const promptText = promptInput.value.trim();
    if (!promptText) return;

    placeholder.classList.add('hidden');
    loader.classList.remove('hidden');
    generatedImg.classList.add('hidden');
    imgActions.classList.add('hidden');

    // Simulate NPU generation timeout
    setTimeout(() => {
      loader.classList.add('hidden');
      // High quality UNSPLASH tech architecture placeholder
      generatedImg.src = `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80`;
      generatedImg.classList.remove('hidden');
      imgActions.classList.remove('hidden');
      showToast('Galaxy AI HD Scene rendered successfully!', 'success');
    }, 2200);
  });

  // AI Actions
  document.getElementById('apply-wallpaper-btn')?.addEventListener('click', () => {
    showToast('Wallpaper synchronized to Neo QLED 8K TV', 'info');
  });

  document.getElementById('send-phone-btn')?.addEventListener('click', () => {
    showToast('Sent to Galaxy S25 Ultra Lockscreen', 'info');
  });

  // Text Summarizer Simulation
  document.getElementById('summarize-btn')?.addEventListener('click', () => {
    showToast('Galaxy AI Note Assist: Key insights extracted', 'success');
  });
}

/* --------------------------------------------------------------------------
   5. 3D PRODUCT CONFIGURATOR
   -------------------------------------------------------------------------- */
const productsConfig = {
  s25: {
    title: 'Galaxy S25 Ultra',
    desc: 'Equipped with Snapdragon 8 Gen 4, Titanium frame, and embedded S-Pen with real-time Galaxy AI camera processing.',
    colors: [
      { name: 'Titanium Black', hex: '#1e293b' },
      { name: 'Titanium Blue', hex: '#0284c7' },
      { name: 'Titanium Silver', hex: '#e2e8f0' },
      { name: 'Titanium Amber', hex: '#d97706' }
    ],
    basePrice: 1419
  },
  fold6: {
    title: 'Galaxy Z Fold6 5G',
    desc: 'Dual Dynamic AMOLED 2X screens with ultra-thin flexible glass and S-Pen Fold Edition support.',
    colors: [
      { name: 'Crafted Black', hex: '#0f172a' },
      { name: 'Navy Blue', hex: '#1e3a8a' },
      { name: 'Silver Shadow', hex: '#cbd5e1' }
    ],
    basePrice: 1899
  },
  qled8k: {
    title: '85" Neo QLED 8K QN900D',
    desc: 'NQ8 AI Gen3 Processor, Infinity Air Design, and Quantum Matrix Technology Pro.',
    colors: [
      { name: 'Graphite Stainless', hex: '#334155' },
      { name: 'Titanium Edge', hex: '#64748b' }
    ],
    basePrice: 4999
  },
  odyssey: {
    title: '49" Odyssey OLED G9',
    desc: 'Dual QHD Curved Gaming Monitor with 0.03ms response time and Neo Quantum Processor Pro.',
    colors: [
      { name: 'Silver Cyber', hex: '#94a3b8' }
    ],
    basePrice: 1799
  }
};

function initProductConfigurator() {
  const prodTabs = document.querySelectorAll('.prod-tab');
  const swatchesContainer = document.querySelector('.color-swatches');
  const colorLabel = document.getElementById('color-label');
  const configTitle = document.getElementById('config-title');
  const configDesc = document.getElementById('config-desc');
  const priceDisplay = document.getElementById('product-price');
  const renderGraphic = document.getElementById('render-graphic');
  const rotateLeft = document.getElementById('rotate-left');
  const rotateRight = document.getElementById('rotate-right');

  let activeKey = 's25';
  let rotationAngle = 0;

  function loadProduct(key) {
    activeKey = key;
    const p = productsConfig[key];
    configTitle.textContent = p.title;
    configDesc.textContent = p.desc;
    priceDisplay.textContent = `$${p.basePrice.toLocaleString()}.00`;

    // Render Swatches
    swatchesContainer.innerHTML = '';
    p.colors.forEach((c, index) => {
      const btn = document.createElement('button');
      btn.className = `swatch ${index === 0 ? 'active' : ''}`;
      btn.style.background = c.hex;
      btn.setAttribute('data-color', c.hex);
      btn.setAttribute('data-color-name', c.name);
      btn.addEventListener('click', () => {
        document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        colorLabel.textContent = `Color: ${c.name}`;
        if (renderGraphic) renderGraphic.style.backgroundColor = c.hex;
      });
      swatchesContainer.appendChild(btn);
    });

    if (p.colors[0] && renderGraphic) {
      colorLabel.textContent = `Color: ${p.colors[0].name}`;
      renderGraphic.style.backgroundColor = p.colors[0].hex;
    }
  }

  prodTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      prodTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadProduct(tab.getAttribute('data-prod'));
    });
  });

  // Rotation
  rotateLeft?.addEventListener('click', () => {
    rotationAngle -= 45;
    if (renderGraphic) renderGraphic.style.transform = `rotateY(${rotationAngle}deg)`;
  });

  rotateRight?.addEventListener('click', () => {
    rotationAngle += 45;
    if (renderGraphic) renderGraphic.style.transform = `rotateY(${rotationAngle}deg)`;
  });

  document.getElementById('add-to-cart-btn')?.addEventListener('click', () => {
    showToast(`Added ${productsConfig[activeKey].title} to Galaxy VIP Order!`, 'success');
  });

  loadProduct('s25');
}

/* --------------------------------------------------------------------------
   6. HARDWARE DIAGNOSTICS SCANNER
   -------------------------------------------------------------------------- */
function initDiagnostics() {
  const scanBtn = document.getElementById('run-diag-btn');
  const progressBox = document.getElementById('scan-progress-box');
  const fill = document.getElementById('scan-fill');
  const pctText = document.getElementById('scan-pct');

  scanBtn?.addEventListener('click', () => {
    progressBox.classList.remove('hidden');
    scanBtn.disabled = true;
    let pct = 0;

    const interval = setInterval(() => {
      pct += 4;
      fill.style.width = `${pct}%`;
      pctText.textContent = `${pct}%`;

      if (pct >= 100) {
        clearInterval(interval);
        scanBtn.disabled = false;
        showToast('Knox System Diagnostic Complete: All 14 Nodes Secure!', 'success');
      }
    }, 80);
  });
}

/* --------------------------------------------------------------------------
   7. AMBIENT PARTICLE CANVAS
   -------------------------------------------------------------------------- */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 1,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.2
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 210, 255, ${p.alpha})`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* --------------------------------------------------------------------------
   8. TOAST NOTIFICATIONS & MODALS
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const iconMap = {
    info: 'fa-circle-info',
    success: 'fa-circle-check',
    warning: 'fa-triangle-exclamation'
  };

  toast.innerHTML = `
    <i class="fa-solid ${iconMap[type] || 'fa-bell'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function initModalsAndEvents() {
  const modal = document.getElementById('settings-modal');
  const openBtn = document.getElementById('open-settings-btn');
  const closeBtn = document.getElementById('close-settings');
  const saveBtn = document.getElementById('save-settings-btn');
  const themeToggle = document.getElementById('theme-toggle');
  const syncBtn = document.getElementById('sync-all-btn');

  openBtn?.addEventListener('click', () => modal.classList.remove('hidden'));
  closeBtn?.addEventListener('click', () => modal.classList.add('hidden'));
  saveBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
    showToast('Preferences updated successfully', 'success');
  });

  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    showToast(`Switched to ${isLight ? 'Light' : 'Dark'} mode`, 'info');
  });

  syncBtn?.addEventListener('click', () => {
    showToast('Performing Knox SmartSync across 14 devices...', 'info');
    setTimeout(() => showToast('All devices in sync!', 'success'), 1200);
  });
}
