export class OrbitingCircles {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      reverse: false,
      duration: 20,
      radius: 160,
      path: true,
      iconSize: 30,
      speed: 1,
      children: [],
      ...options
    };
    
    this.calculatedDuration = this.options.duration / this.options.speed;
    
    this.init();
  }

  /**
   * Initialize the orbiting circles
   */
  init() {
    this.setupContainer();
    if (this.options.path) {
      this.createPath();
    }
    this.createOrbitingElements();
  }

  /**
   * Setup the container with necessary classes
   */
  setupContainer() {
    this.container.classList.add('orbiting-circles-container');
  }

  /**
   * Create the SVG path that shows the orbit circle
   */
  createPath() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('version', '1.1');
    svg.classList.add('orbiting-circles-path');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '50%');
    circle.setAttribute('cy', '50%');
    circle.setAttribute('r', this.options.radius);

    svg.appendChild(circle);
    this.container.appendChild(svg);
  }

  /**
   * Create orbiting elements from children
   */
  createOrbitingElements() {
    const children = this.getChildren();
    const childCount = children.length;

    children.forEach((child, index) => {
      const angle = (360 / childCount) * index;
      const orbitingElement = this.createOrbitingElement(child, angle);
      this.container.appendChild(orbitingElement);
    });
  }

  /**
   * Get children elements from container or options
   */
  getChildren() {
    if (this.options.children.length > 0) {
      return this.options.children;
    }
    
    // Get existing children from container (excluding SVG path)
    return Array.from(this.container.children).filter(child => 
      !child.classList.contains('orbiting-circles-path')
    );
  }

  /**
   * Create a single orbiting element
   */
  createOrbitingElement(child, angle) {
    const orbitingDiv = document.createElement('div');
    orbitingDiv.classList.add('orbiting-circle-item');
    
    if (this.options.reverse) {
      orbitingDiv.classList.add('reverse');
    }

    // Set CSS custom properties
    orbitingDiv.style.setProperty('--duration', this.calculatedDuration);
    orbitingDiv.style.setProperty('--radius', this.options.radius);
    orbitingDiv.style.setProperty('--angle', angle);
    orbitingDiv.style.width = `${this.options.iconSize}px`;
    orbitingDiv.style.height = `${this.options.iconSize}px`;

    // Clone the child element if it's an HTML element
    if (child instanceof HTMLElement) {
      orbitingDiv.appendChild(child.cloneNode(true));
    } else if (typeof child === 'string') {
      orbitingDiv.innerHTML = child;
    } else {
      orbitingDiv.appendChild(child);
    }

    return orbitingDiv;
  }

  /**
   * Add a new orbiting element
   */
  addElement(element) {
    this.options.children.push(element);
    this.refresh();
  }

  /**
   * Remove all orbiting elements and recreate them
   */
  refresh() {
    // Remove existing orbiting elements
    const existingElements = this.container.querySelectorAll('.orbiting-circle-item');
    existingElements.forEach(el => el.remove());
    
    // Recreate orbiting elements
    this.createOrbitingElements();
  }

  /**
   * Update options and refresh
   */
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.calculatedDuration = this.options.duration / this.options.speed;
    
    // Remove existing elements
    this.container.innerHTML = '';
    
    // Reinitialize
    this.init();
  }

  /**
   * Destroy the orbiting circles instance
   */
  destroy() {
    this.container.innerHTML = '';
    this.container.classList.remove('orbiting-circles-container');
  }
}

/**
 * Helper function to create orbiting circles with a simpler API
 */
export function createOrbitingCircles(containerSelector, options = {}) {
  const container = typeof containerSelector === 'string' 
    ? document.querySelector(containerSelector)
    : containerSelector;
    
  if (!container) {
    throw new Error('Container element not found');
  }
  
  return new OrbitingCircles(container, options);
} 