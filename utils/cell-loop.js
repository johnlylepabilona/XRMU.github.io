AFRAME.registerComponent('wave-animation', {
  schema: {
    rowDelay: {type: 'number', default: 100}, // Delay increment for each row
    animDur: {type: 'number', default: 900},  // Duration of animation
    animHeight: {type: 'number', default: 1.5} // Height to animate to
  },

  init: function () {
    this.setupAnimations();
    this.handleVisibilityChange();
  },

  setupAnimations: function () {
    const el = this.el;
    const data = this.data;

    const cellX = el.getAttribute('position').x;
    const cellZ = el.getAttribute('position').z;

    const delay = data.rowDelay; // Calculate delay based on row (Z position)

    el.setAttribute('animation', {
      property: 'position',
      from: `${cellX} 1.100 ${cellZ}`,
      to: `${cellX} ${data.animHeight} ${cellZ}`,
      loop: true,
      dur: data.animDur,
      dir: 'alternate',
      delay: delay,
      easing: 'easeInOutSine'
    });
  },

  handleVisibilityChange: function () {
    const el = this.el;

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          const cellX = el.getAttribute('position').x;
          const cellZ = el.getAttribute('position').z;
          el.setAttribute('position', `${cellX} 1.100 ${cellZ}`)
          el.removeAttribute('animation');
        } else {
          this.setupAnimations();
        }
    });
  },

  restartAnimations: function () {
    const el = this.el;
    el.removeAttribute('animation');

    // Re-setup the animations
    this.setupAnimations();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#cell');

  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 40; i++) {
      const modelEntity = document.createElement('a-entity');
      modelEntity.setAttribute('gltf-model', '#Cell');
      const cellX = i * 2;
      const cellZ = j * -2;

      const animationAttr = `
      animDur: 900;
      rowDelay: ${i * 100};
      animHeight: 1.5
    `;
      modelEntity.setAttribute('position', `${cellX} 1.100 ${cellZ}`);
      modelEntity.setAttribute('scale', '1 1 1');
      modelEntity.setAttribute('wave-animation', animationAttr); // Apply the custom animation component

      container.appendChild(modelEntity);
    }
  }
});
