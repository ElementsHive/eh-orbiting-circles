import { createOrbitingCircles, OrbitingCircles } from './lib/OrbitingCircles.js';

// Make OrbitingCircles available globally
window.OrbitingCircles = OrbitingCircles;
window.createOrbitingCircles = createOrbitingCircles;

// Demo implementation - you can remove this and use your own implementation
document.addEventListener('DOMContentLoaded', function() {
  // Create a demo container if one doesn't exist
  let demoContainer = document.getElementById('orbiting-circles-demo');
  
  if (!demoContainer) {
    demoContainer = document.createElement('div');
    demoContainer.id = 'orbiting-circles-demo';
    demoContainer.style.cssText = `
      width: 400px;
      height: 400px;
      margin: 50px auto;
      border: 1px solid #ccc;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
    `;
    document.body.appendChild(demoContainer);
  }

  // Create demo content
  const icons = [
    '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
    '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/></svg>',
    '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>'
  ];

  // Create first orbiting circle set
  const orbitingCircles1 = new OrbitingCircles(demoContainer, {
    children: icons,
    radius: 120,
    duration: 15,
    iconSize: 40,
    path: true
  });

  // Create second orbiting circle set (reverse direction, smaller radius)
  const orbitingCircles2 = new OrbitingCircles(demoContainer, {
    children: [
      '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>',
      '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>'
    ],
    radius: 80,
    duration: 10,
    iconSize: 24,
    reverse: true,
    path: true
  });
});

// Export for use in other files
export { OrbitingCircles, createOrbitingCircles };
