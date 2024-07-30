document.querySelector('a-scene').addEventListener('loaded', () => {
  const container = document.querySelector('#cell');

  for (let i = 0; i < 100; i++) {
    const modelEntity = document.createElement('a-entity');
    modelEntity.setAttribute('gltf-model', '#Cell');
    const initialPos = `${i * 0.400} 1.472 0`
    modelEntity.setAttribute('position', initialPos);
    modelEntity.setAttribute('scale', `0.300 0.300 0.300`);
    modelEntity.setAttribute('animation', `property: position; from:${initialPos}; to: ${i * 0.400} 1 0; loop: true; dur: 1000; dir: alternate; elasticity: 0; delay: ${Math.floor(Math.random() * 1000)}`);
    container.appendChild(modelEntity);
  }
});