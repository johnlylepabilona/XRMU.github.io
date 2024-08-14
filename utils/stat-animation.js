AFRAME.registerComponent('move-jak', {
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
      const jakPosition = el.getAttribute('position');
      const { x: jakX, y: jakY, z: jakZ } = jakPosition;

      const jakeScale = el.getAttribute('scale');
      const { x: jakScaleX, y: jakScaleY, z: jakScaleZ} = jakeScale


      /* Sphere instance */
      if (el.children.length) {
        const sphere1 = el.children[0]
        const sphere2 = el.children[1]
        const sphereRadius = sphere1.getAttribute('radius');

        sphere1.setAttribute('animation__spawn-sphere1', {
          property: 'radius',
          from: sphereRadius,
          to: 0.5,
          easing: 'easeInOutSine',
          startEvents: 'startSphereSpawn1'
        })
        sphere1.setAttribute('animation__shrink-sphere1', {
          property: 'radius',
          from: 0.5,
          to: 0,
          easing: 'easeInOutSine',
          startEvents: 'startSphereShrink1'
        })
        sphere2.setAttribute('animation__spawn-sphere2', {
          property: 'radius',
          from: sphereRadius,
          to: 0.5,
          easing: 'easeInOutSine',
          startEvents: 'startSphereSpawn2'
        })
        sphere2.setAttribute('animation__shrink-sphere2', {
          property: 'radius',
          from: 0.5,
          to: 0,
          dur: 2000,
          delay: 2000,
          easing: 'easeInOutSine',
          startEvents: 'startSphereShrink2'
        })

        el.addEventListener('animationcomplete__move-to-receptors', () => {
          sphere1.emit('startSphereSpawn1', null, false)
        })

        sphere1.addEventListener('animationcomplete__spawn-sphere1', () => {
          sphere2.emit('startSphereSpawn2', null, false)
        })
        sphere2.addEventListener('animationcomplete__spawn-sphere2', () => {
          sphere2.emit('startSphereShrink2', null, false)
        })
        
      }


      el.setAttribute('animation__move-to-receptors', {
        property: 'position',
        from: `${jakX} ${jakY} ${jakZ}`,
        to: data.finalPos,
        // dur: Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000,
        // delay: Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000,
        easing: 'easeInOutSine',
        startEvents: 'startJakMove'
      })

      el.setAttribute('animation__shrink-jak', {
        property: 'scale',
        from: `${jakScaleX} ${jakScaleY} ${jakScaleZ}`,
        to: '0 0 0',
        easing: 'easeInOutSine',
        startEvents: 'startJakShrink'
      })

      // el.addEventListener('animationcomplete__move-to-receptors', () => {
      //   el.emit('startJakShrink', null, false)
      // })

      el.addEventListener('animationcomplete__shrink-jak', () => {
        el.setAttribute('position', `${jakX} ${jakY} ${jakZ}`)
        el.setAttribute('scale', `${jakScaleX} ${jakScaleY} ${jakScaleZ}`)
      })
    })
  }
});


AFRAME.registerComponent('move-stat', {
  schema: {
    finalPos: { type: 'string', default: '-49.177 -67.746 -1.368' },
    jakID: { type: 'string', default: 'jak1' },
    rotate: { type: 'boolean', default: false },
    duration: { type: 'number', default: 1000 },
    dimerID: { type: 'string', default: 'dimer1' },
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
      const { x: statScaleX, y: statScaleY, z: statScaleZ} = stateScale

      /* Sphere instance */
      if (el.children.length) {
        const sphere1 = el.children[0]
        const sphereRadius = sphere1.getAttribute('radius');

        sphere1.setAttribute('animation__spawn-sphere1', {
          property: 'radius',
          from: sphereRadius,
          to: 0.5,
          dur: 2000,
          delay: 2000,
          easing: 'easeInOutSine',
          startEvents: 'startSphereSpawn1'
        })

        document.querySelector(`#${data.jakID}`).children[1].addEventListener('animationcomplete__spawn-sphere2', () => {
          sphere1.emit('startSphereSpawn1', null, false)
        })

        if (data.rotate) {
          sphere1.addEventListener('animationcomplete__spawn-sphere1', () => {
            el.emit('startStat2Rotate', null, false)

            const dimers = document.querySelector(`#${data.dimerID}`)
            const dimersPosition = dimers.getAttribute('position')
    
            const {x: dimersX, y:dimersY, z:dimersZ } = dimersPosition
    
            dimers.setAttribute('animation__move-down-dimers', {
              property: 'position',
              from: `${dimersX} ${dimersY} ${dimersZ}`,
              to: `0 -4.868 0`,
              easing: 'easeInOutSine',
              startEvents: 'startMovingDimers'
            })

            const jaks = document.querySelector(`#${data.jakID}`).parentEl.children

            for (let i = 0; i < jaks.length; i++) {
              jaks[i].children[0].emit('startSphereShrink1', null, false)              
            }

            dimers.emit('startMovingDimers', null, false)
    
          })
        }
      }

      el.setAttribute('animation__move-stat-to-receptors', {
        property: 'position',
        from: `${statX} ${statY} ${statZ}`,
        to: data.finalPos,
        // dur: Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000,
        // delay: Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000,
        easing: 'easeInOutSine',
        startEvents: 'startStatMove'
      })
      if (data.rotate) {
        const rotation = el.getAttribute('rotation')
        el.setAttribute('animation__rotate-stat2', {
          property: 'rotation',
          from: rotation,
          to: '220 0 0',
          // dur: Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000,
          // delay: Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000,
          easing: 'easeInOutSine',
          startEvents: 'startStat2Rotate'
        })
        el.addEventListener('animationcomplete__rotate-stat2', () => {
          const dimers = document.querySelector(`#${data.dimerID}`)
          const [dimer1, dimer2] = dimers.children

          const {x: dimer1X, y:dimer1Y, z:dimer1Z } = dimer1.getAttribute('position')
          const {x: dimer2X, y:dimer2Y, z:dimer2Z } = dimer2.getAttribute('position')
    
          dimer1.setAttribute('animation__merge-to-stat2', {
            property: 'position',
            from: `${dimer1X} ${dimer1Y} ${dimer1Z}`,
            to: `0.454 ${dimer1Y} ${dimer1Z}`,
            easing: 'easeInOutSine',
            startEvents: 'startMergeDimer'
          })
          dimer2.setAttribute('animation__merge-to-stat1', {
            property: 'position',
            from: `${dimer2X} ${dimer2Y} ${dimer2Z}`,
            to: `-0.475 ${dimer2Y} ${dimer2Z}`,
            easing: 'easeInOutSine',
            startEvents: 'startMergeDimer'
          })

          dimer1.emit('startMergeDimer',null, false)
          dimer2.emit('startMergeDimer', null, false)

          dimer2.addEventListener('animationcomplete__merge-to-stat1', () => {

            dimers.emit('startMovingDimers', null, false)
            const {x: dimersX, y:dimersY, z:dimersZ } = dimers.getAttribute('position')

            const nucleus = document.querySelector('#nucleus')

            const nucleusWorldPosition = new THREE.Vector3()
            const dimersWorldPosition = new THREE.Vector3()

            nucleus.object3D.getWorldPosition(nucleusWorldPosition)
            dimers.object3D.getWorldPosition(dimersWorldPosition)

            const relativePosition = new THREE.Vector3()
            const randomX =  Math.floor(Math.random() * (-20 - -5)) + -5;
            relativePosition.subVectors({x: randomX, y:-67, z: 0}, dimersWorldPosition)

            const {x: targetsX, y:targetsY, z:targetsZ } = relativePosition

            dimers.setAttribute('animation__dimers-to-nucleus', {
              property: 'position',
              from: `${dimersX} ${dimersY} ${dimersZ}`,
              to: `${targetsX} ${targetsY} ${targetsZ}`,
              easing: 'easeInOutSine',
              dur: 2000,
              startEvents: 'startDimersToNucleus'
            })
            dimers.emit('startDimersToNucleus', null, false)
            const jaks = document.querySelector(`#${data.jakID}`).parentEl.children
            for (let i = 0; i < jaks.length; i++) {
              jaks[i].emit('startJakShrink', null, false)              
              jaks[i].setAttribute('visible', false)              
            }

            dimers.addEventListener('animationcomplete__dimers-to-nucleus', () => {
              setTimeout(() => {
                dimers.components.dimers.reset()
              }, 3000);
            })
          })
          
          // if (dimers.length) {
          //   for (let i = 0; i < dimers.length; i++) {
          //     dimers[i].emit('startMergeDimer', null, false)
              
          //   }
          // }
        })
      }

      document.querySelector(`#${data.jakID}`).children[1].addEventListener('animationcomplete__spawn-sphere2', () => {
        el.emit('startStatMove', null, false)
      })
    })
  }
});

AFRAME.registerComponent('dimers', {
  schema: {
    finalPos: { type: 'string', default: '-49.177 -67.746 -1.368' },
  },

  init: function () {
    // this.animate()
  },

  reset: function () {
    const el = this.el
    const data = this.data

    const [dimer1, dimer2] = el.children

    el.setAttribute('position',`0 0 0`)
    dimer1.setAttribute('position',`-49.177 -67.746 -1.368`)
    dimer1.setAttribute('scale',`0.600 0.600 0.600`)

    dimer1.children[0].setAttribute('radius', '0')

    dimer2.setAttribute('position', `48.237 -58.702 -1.368`)
    dimer2.setAttribute('scale',`0.600 0.600 0.600`)
    dimer2.children[0].setAttribute('radius', '0')
    dimer2.setAttribute('rotation',`0 0 0`)
  }
});


