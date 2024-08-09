AFRAME.registerComponent('move-cytokine', {
  schema: {
    finalPos: { type: 'string', default: '-0.241 4.362 -2.419' },
    maxScale: { type: 'string', default: '-0.241 4.362 -2.419' },
    duration: { type: 'number', default: 1000 },
  },

  init: function () {
    this.setupAnimations();
  },

  setupAnimations: function () {
    const el = this.el;
    const data = this.data;

    el.addEventListener('model-loaded', () => {
      const cytokineX = el.getAttribute('position').x;
      const cytokineY = el.getAttribute('position').y;
      const cytokineZ = el.getAttribute('position').z;

      const cytokineScaleX = el.getAttribute('scale').x;
      const cytokineScaleY = el.getAttribute('scale').y;
      const cytokineScaleZ = el.getAttribute('scale').z;

      el.setAttribute('animation__spawn', {
        property: 'scale',
        from: `0 0 0`,
        to: `0.500 0.500 0.500`,
        dur: Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000,
        delay: Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000,
        easing: 'easeInOutSine',
        startEvents: 'startSpawn'
      })

      el.addEventListener('animationcomplete__spawn', () => {
        el.emit(`startAnim1`, null, false);
      })

      el.setAttribute('animation__move', {
        property: 'position',
        from: `${cytokineX} ${cytokineY} ${cytokineZ}`,
        to: data.finalPos,
        dur: data.duration,
        delay: Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000,
        easing: 'easeInOutSine',
        startEvents: 'startAnim1'
      });

      el.setAttribute('animation__shrink', {
        property: 'scale',
        from: data.maxScale,
        to: `${cytokineScaleX} ${cytokineScaleY} ${cytokineScaleZ}`,
        dur: 2000,
        delay: 2000,
        easing: 'easeInOutSine',
        startEvents: 'startAnim2'
      });

      // Listen for the completion of the first animation
      el.addEventListener('animationcomplete__move', () => {
        // el.emit(`startAnim2`, null, false);
      });

      el.addEventListener('animationcomplete__shrink', () => {
        // el.setAttribute('scale', `${cytokineScaleX} ${cytokineScaleY} ${cytokineScaleZ}`); // Reset scale
        el.setAttribute('position', `${cytokineX} ${cytokineY} ${cytokineZ}`); // Reset position
        el.emit(`startSpawn`, null, false);
      });
      el.emit(`startSpawn`, null, false);
    });

  }
});
