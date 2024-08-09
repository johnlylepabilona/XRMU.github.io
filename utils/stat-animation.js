AFRAME.registerComponent('move-stat', {
  schema: {
    finalPos: { type: 'string', default: '-44.296 -67.153 19.067' },
    duration: { type: 'number', default: 1000 }
  },

  init: function () {
    this.animate()
  },

  animate: function () {
    const el = this.el;
    const data = this.data;

    el.addEventListener('model-loaded', () => {
      const statPosition = el.getAttribute('position');
      const { x: statX, y: statY, z: statZ } = statPosition;

      const stateScale = el.getAttribute('scale');
      const { x: statScaleX, y: statScaleY, z: statScaleZ} = el.getAttribute('scale');


      el.setAttribute('animation__move-to-receptors', {
        property: 'position',
        from: `${statX} ${statY} ${statZ}`,
        to: data.finalPos,
        // dur: Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000,
        // delay: Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000,
        easing: 'easeInOutSine',
        startEvents: 'startStatMove'
      })

      el.setAttribute('animation__shrink-stat', {
        property: 'scale',
        from: `${statScaleX} ${statScaleY} ${statScaleZ}`,
        to: '0 0 0',
        easing: 'easeInOutSine',
        startEvents: 'startStatShrink'
      })

      el.addEventListener('animationcomplete__move-to-receptors', () => {
        el.emit('startStatShrink', null, false)
      })
      el.addEventListener('animationcomplete__shrink-stat', () => {
        el.setAttribute('position', `${statX} ${statY} ${statZ}`)
        el.setAttribute('scale', `${statScaleX} ${statScaleY} ${statScaleZ}`)
      })
    })
  }
});
