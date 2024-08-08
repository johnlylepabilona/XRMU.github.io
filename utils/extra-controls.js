AFRAME.registerComponent('vertical-movement', {
  init: function () {
    this.velocity = 0.1;  // Movement speed
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.keys = {};
    
    // Add event listeners for keydown and keyup events
    window.addEventListener('keydown', this.keyDownHandler);
    window.addEventListener('keyup', this.keyUpHandler);
  },
  
  keyDownHandler: function (event) {
    this.keys[event.key] = true;
  },
  
  keyUpHandler: function (event) {
    this.keys[event.key] = false;
  },

  tick: function (time, deltaTime) {
    let el = this.el;
    let position = el.getAttribute('position');

    if (this.keys['e']) {  // Press 'Q' to move up
      position.y += this.velocity;
    }
    if (this.keys['q']) {  // Press 'E' to move down
      position.y -= this.velocity;
    }
    if (this.keys['r']) {  // Press 'R' to reset position
      position = '0 0.500 5.860';
    }
    

    el.setAttribute('position', position);
  },

  remove: function () {
    // Clean up event listeners when the component or element is removed
    window.removeEventListener('keydown', this.keyDownHandler);
    window.removeEventListener('keyup', this.keyUpHandler);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const camera = document.querySelector('#rig');
  camera.addEventListener('keydown', (evt) => {
    console.log('camera.addEventListener ~ evt:', evt);
  });

});
