AFRAME.registerComponent('rotate-bone', {
  schema: {
    boneName: {type: 'string'},
    angle: {type: 'number', default: 0.1},
    duration: {type: 'number', default: 1000},
    pauseDuration: {type: 'number', default: 6000} // Pause duration in milliseconds
  },
  init: function () {
    this.bone = null;
    this.initialRotationY = 0;
    this.elapsedTime = 0;
    this.direction = 1;
    this.currentRotation = 0;

    const el = this.el;
    const data = this.data;

    el.addEventListener('model-loaded', () => {
      const model = el.getObject3D('mesh');
      if (model) {
        model.traverse((node) => {
          if (node.isBone && node.name === data.boneName) {
            this.bone = node;
            this.initialRotationY = this.bone.rotation.y; // Capture initial rotation
            this.animate(); // Start animation
          }
        });
      }
    });
  },
  animate: function () {
    if (!this.bone) return;

    const data = this.data;
    const halfDuration = data.duration / 2;
    const pauseDuration = data.pauseDuration;

    const update = (time) => {
      this.elapsedTime += 16; // Approximate frame duration (16ms for 60fps)
      if (this.elapsedTime >= halfDuration) {
        this.direction *= -1;
        this.elapsedTime = 0;
        
        if (this.direction === -1 || this.direction === 1) {
          // When direction is reset, apply the pause
          setTimeout(() => {
            requestAnimationFrame(update);
          }, pauseDuration);
          return;
        }
      }

      const rotationIncrement = (data.angle / halfDuration) * 16 * this.direction;
      this.currentRotation += rotationIncrement;
      this.bone.rotation.z = this.initialRotationY + this.currentRotation; // Apply rotation incrementally

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
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
    this.initialRotationY = 0;
    this.elapsedTime = 0;
    this.direction = 1;
    this.currentRotation = 0;

    const el = this.el;
    const data = this.data;

    el.addEventListener('model-loaded', () => {
      const model = el.getObject3D('mesh');
      if (model) {
        model.traverse((node) => {
          if (node.isBone && node.name === data.boneName) {
            this.bone = node;
            this.initialRotationY = this.bone.rotation.y; // Capture initial rotation
            this.animate(); // Start animation
          }
        });
      }
    });
  },
  animate: function () {
    if (!this.bone) return;

    const data = this.data;
    const halfDuration = data.duration / 2;
    const pauseDuration = data.pauseDuration;

    const update = (time) => {
      this.elapsedTime += 16; // Approximate frame duration (16ms for 60fps)
      if (this.elapsedTime >= halfDuration) {
        this.direction *= -1;
        this.elapsedTime = 0;

        if (this.direction === -1 || this.direction === 1) {
          // When direction is reset, apply the pause
          setTimeout(() => {
            requestAnimationFrame(update);
          }, pauseDuration);
          return;
        }
      }

      const rotationIncrement = (data.angle / halfDuration) * 16 * this.direction;
      this.currentRotation += rotationIncrement;
      this.bone.rotation.x = this.initialRotationY + this.currentRotation; // Apply rotation incrementally

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
});