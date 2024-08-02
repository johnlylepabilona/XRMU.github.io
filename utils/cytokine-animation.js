AFRAME.registerComponent('move-cytokine', {
  schema: {
    finalPos: { type: 'number', default: 0 },
    duration: { type: 'number', default: 1000 },
    pauseDuration: { type: 'number', default: 6000 },
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

      el.setAttribute('animation__move', {
        property: 'position',
        from: `${cytokineX} ${cytokineY} ${cytokineZ}`,
        to: `-0.241 4.362 -2.419`,
        dur: data.duration,
        delay: data.pauseDuration,
        easing: 'easeInOutSine',
        startEvents: 'startAnim1'
      });

      el.setAttribute('animation__shrink', {
        property: 'scale',
        from: `${cytokineScaleX} ${cytokineScaleY} ${cytokineScaleZ}`,
        to: `0 0 0`,
        dur: 2000,
        delay: 2000,
        easing: 'easeInOutSine',
        startEvents: 'startAnim2'
      });

      // Listen for the completion of the first animation
      el.addEventListener('animationcomplete__move', () => {
        el.emit(`startAnim2`, null, false);
      });

      el.addEventListener('animationcomplete__shrink', () => {
        el.setAttribute('scale', `${cytokineScaleX} ${cytokineScaleY} ${cytokineScaleZ}`); // Reset scale
        el.setAttribute('position', `${cytokineX} ${cytokineY} ${cytokineZ}`); // Reset position
        el.emit(`startAnim1`, null, false);
      });

      // Start the initial animation sequence
      el.emit(`startAnim1`, null, false);
    });
  }
});
