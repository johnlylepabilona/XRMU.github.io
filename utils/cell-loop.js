document.querySelector('a-scene').addEventListener('loaded', () => {
  const container = document.querySelector('#cell');

  const delay1 = 1000
  const delay2 = 500
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 40; i++) {
      const modelEntity = document.createElement('a-entity');
      modelEntity.setAttribute('gltf-model', '#Cell');
      const cellX = i * 1.5
      const cellZ = j * -1.5
      const initialPos = `${cellX} 1.100 ${cellZ}`;
      modelEntity.setAttribute('position', initialPos);
      modelEntity.setAttribute('scale', '1 1 1');
      
      const animationAttr = `
        property: position;
        from: ${initialPos};
        to: ${cellX} 1.5 ${cellZ};
        loop: true;
        dur: 900;
        dir: alternate;
        // elasticity: 0;
        delay: ${i * 100};
      `;
      modelEntity.setAttribute('animation', animationAttr);

      container.appendChild(modelEntity);
    }
  }
});