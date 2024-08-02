AFRAME.registerComponent('rotate-bone', {
  schema: {
    boneName: {type: 'string'},
    angle: {type: 'number', default: 0.1},
    duration: {type: 'number', default: 1000},
    pauseDuration: {type: 'number', default: 6000} // Pause duration in milliseconds
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


    document.querySelector('#cytokine1').addEventListener('animationcomplete__move', () => {
      animateTo(data.angle, 1000);
    })

    document.querySelector('#cytokine1').addEventListener('animationcomplete__shrink', () => {
      animateTo(this.initialRotationZ, 1000);
    })
  }
});

AFRAME.registerComponent('rotate-bone2', {
  schema: {
    boneName: {type: 'string'},
    angle: {type: 'number', default: 0.1},
    duration: {type: 'number', default: 1000},
    pauseDuration: {type: 'number', default: 7000} // Pause duration in milliseconds
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


    document.querySelector('#cytokine1').addEventListener('animationcomplete__move', () => {
      animateTo(data.angle, 1000);
    })

    document.querySelector('#cytokine1').addEventListener('animationcomplete__shrink', () => {
      animateTo(this.initialRotationX, 1000);
    })
  }
});