document.querySelector('a-scene').addEventListener('loaded', () => {
  const container = document.querySelector('#cell');

  const delay1 = 1000
  const delay2 = 500
  for (let j = 0; j < 8; j++) {
    for (let i = 0; i < 50; i++) {
      const modelEntity = document.createElement('a-entity');
      modelEntity.setAttribute('gltf-model', '#Cell');
      const cellX = i * 0.500
      const cellY = j * -0.400
      const initialPos = `${cellX} 1.100 ${cellY}`;
      modelEntity.setAttribute('position', initialPos);
      modelEntity.setAttribute('scale', '0.300 0.300 0.300');
      
      const animationAttr = `
        property: position;
        from: ${initialPos};
        to: ${cellX} 1 ${cellY};
        loop: true;
        dur: 1000;
        dir: alternate;
        elasticity: 0;
        delay: ${i%2 === 0 ? delay1 :  delay2};
      `;
      modelEntity.setAttribute('animation', animationAttr);

      container.appendChild(modelEntity);
    }
  }
});