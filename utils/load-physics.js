AFRAME.registerComponent("autofit-gltf-ammo", {
  init() {
    this.el.addEventListener("model-loaded", () => {
      console.log("Model loaded");

      // Apply ammo-body and ammo-shape attributes
      this.el.setAttribute("ammo-body", "type: static; emitCollisionEvents: true");

      // Delay physics shape update to ensure the model is fully loaded
      setTimeout(() => {
        this.updatePhysicsShape();
      }, 100); // Adjust the timeout as needed
    });
  },

  updatePhysicsShape() {
    const el = this.el;
    const mesh = el.getObject3D('mesh');
  
    if (!mesh) {
      console.warn('No mesh found');
      return;
    }
  
    // Ensure mesh matrix world is up-to-date
    mesh.updateMatrixWorld(true);
  
    // Get the scale of the mesh
    const scale = new THREE.Vector3();
    mesh.scale.copy(scale.setFromMatrixScale(mesh.matrixWorld));
  
    // Get the bounding box of the scaled mesh
    const boundingBox = new THREE.Box3().setFromObject(mesh);
    const size = boundingBox.getSize(new THREE.Vector3());
    const center = boundingBox.getCenter(new THREE.Vector3());
  
    // Apply scale to physics shape
    const scaledSize = new THREE.Vector3(
      size.x * mesh.scale.x,
      size.y * mesh.scale.y,
      size.z * mesh.scale.z
    );
    const halfExtents = new Ammo.btVector3(scaledSize.x / 2, scaledSize.y / 2, scaledSize.z / 2);
  
    // Create Ammo.js shape with scaled dimensions
    const shape = new Ammo.btBoxShape(halfExtents);
  
    // Create a new Ammo.js transform
    const transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(center.x, center.y, center.z));
    const motionState = new Ammo.btDefaultMotionState(transform);
    const localInertia = new Ammo.btVector3(0, 0, 0);
    shape.calculateLocalInertia(0, localInertia);
  
    // Create and add rigid body
    const rbInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, shape, localInertia);
    const rigidBody = new Ammo.btRigidBody(rbInfo);
  
    // Access the Ammo.js system and add the rigid body to the physics world
    const ammoSystem = this.el.sceneEl.systems['ammo-system'];
    if (ammoSystem && ammoSystem.physicsWorld) {
      ammoSystem.physicsWorld.addRigidBody(rigidBody);
    }
    el.setAttribute("ammo-shape", "type: mesh");
  
    // Cleanup
    Ammo.destroy(transform);
    Ammo.destroy(localInertia);
    Ammo.destroy(rbInfo);
  }
  
});
