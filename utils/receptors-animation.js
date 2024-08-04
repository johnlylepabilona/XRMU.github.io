AFRAME.registerComponent('rotate-bone', {
  schema: {
    boneName: {type: 'string'},
    angle: {type: 'number', default: 0.1},
    duration: {type: 'number', default: 1000},
    cytokineId: {type: 'string', default: 'cytokine1'}
  },
  init: function () {
    this.bone = null;
    this.initialRotationZ = 0;
    this.elapsedTime = 0;

    const el = this.el;
    const data = this.data;

    el.addEventListener('model-loaded', () => {
      const model = el.getObject3D('mesh');
      if (model) {
        model.traverse((node) => {
          if (node.isBone && node.name === data.boneName) {
            this.bone = node;
            this.initialRotationZ = this.bone.rotation.z; // Capture initial rotation
            this.animate(); // Start animation
          }
        });
      }
    });
  },
  animate: function () {
    if (!this.bone) return;

    const data = this.data;

    const animateTo = (targetAngle, duration) => {
      const startAngle = this.bone.rotation.z;
      const angleChange = targetAngle - startAngle;
      const startTime = performance.now();

      const animateStep = (time) => {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1); // Clamp t to [0, 1]
        this.bone.rotation.z = startAngle + angleChange * t;

        if (t < 1) {
          requestAnimationFrame(animateStep);
        }
      };

      requestAnimationFrame(animateStep);
    };


    document.querySelector(`#${data.cytokineId}`).addEventListener('animationcomplete__move', () => {
      animateTo(data.angle, data.duration);
    })

    document.querySelector(`#${data.cytokineId}`).addEventListener('animationcomplete__shrink', () => {
      animateTo(this.initialRotationZ, data.duration);
    })
  }
});

AFRAME.registerComponent('rotate-bone2', {
  schema: {
    boneName: {type: 'string'},
    angle: {type: 'number', default: 0.1},
    duration: {type: 'number', default: 1000},
    cytokineId: {type: 'string', default: 'cytokine1'}
  },
  init: function () {
    this.bone = null;
    this.initialRotationX = 0;

    const el = this.el;
    const data = this.data;

    el.addEventListener('model-loaded', () => {
      const model = el.getObject3D('mesh');
      if (model) {
        model.traverse((node) => {
          if (node.isBone && node.name === data.boneName) {
            this.bone = node;
            this.initialRotationX = this.bone.rotation.x; // Capture initial rotation
            this.animate(); // Start animation
          }
        });
      }
    });
  },
  animate: function () {
    if (!this.bone) return;

    const data = this.data;

    const animateTo = (targetAngle, duration) => {
      const startAngle = this.bone.rotation.x;
      const angleChange = targetAngle - startAngle;
      const startTime = performance.now();

      const animateStep = (time) => {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1); // Clamp t to [0, 1]
        this.bone.rotation.x = startAngle + angleChange * t;

        if (t < 1) {
          requestAnimationFrame(animateStep);
        }
      };

      requestAnimationFrame(animateStep);
    };


    document.querySelector(`#${data.cytokineId}`).addEventListener('animationcomplete__move', () => {
      animateTo(data.angle, data.duration);
    })

    document.querySelector(`#${data.cytokineId}`).addEventListener('animationcomplete__shrink', () => {
      animateTo(this.initialRotationX, data.duration);
    })
  }
});


AFRAME.registerComponent('absorb-cytokine', {
  schema: {
    cytokineId: {type: 'string', default: 'cytokine1'}
  },

  init: function () {
    this.spawn()
  },

  spawn: function () {
    const data = this.data;
    const el = this.el
    const position = el.getAttribute('position')

    const x = el.getAttribute('position').x;
    const y = el.getAttribute('position').y;
    const z = el.getAttribute('position').z;
    console.log('`${position.x} ${position.y} ${position.z}`:', `${position.x} ${position.y} ${position.z}`)
    console.log('`${position.x} -3.957 ${position.z}`:', `${position.x} -3.957 ${position.z}`)
    el.setAttribute('animation__move-light', {
      property: 'position',
      to: `${position.x} -3.957 ${position.z}`,
      dur: 3000,
      // dir: 'alternate',
      // delay: 1000,
      easing: 'easeInOutSine',
      startEvents: 'StartMoveLight'
    })

    document.querySelector(`#${data.cytokineId}`).addEventListener('animationcomplete__move', () => {
      el.setAttribute('visible', true)
      el.emit(`StartMoveLight`, null, false);
    })

    el.addEventListener('animationcomplete__move-light', () => {
      el.setAttribute('visible', false)
      el.setAttribute('position', `${x} ${y} ${z}`)
      document.querySelector(`#${data.cytokineId}`).emit(`startAnim2`, null, false);
    })
  },

});


document.addEventListener('DOMContentLoaded', () => {
  const receptors = document.querySelector('#receptors');

  const checkModelLoaded = (element, callback) => {
    if (element.getObject3D('mesh')) {
      callback();
    } else {
      element.addEventListener('model-loaded', callback);
    }
  };

  for (let i = 0; i < receptors.children.length; i++) {
    const el = receptors.children[i];

    checkModelLoaded(el, () => {
      const position = el.object3D.position;

      const cellX = position.x;
      const cellZ = position.z;

      el.setAttribute('animation', {
        property: 'position',
        from: `${cellX} 0 ${cellZ}`,
        to: `${cellX} 0.2 ${cellZ}`,
        loop: true,
        dur: 900,
        dir: 'alternate',
        delay: i * 1000,
        easing: 'easeInOutSine'
      });
    });
  }
});
