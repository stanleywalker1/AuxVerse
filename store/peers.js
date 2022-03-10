import * as THREE from 'three';
import { proxy } from 'valtio';
import { mySocket } from './network';

// peers dataStore
export const peers = proxy({});

let lerpValue = 0;

//CRUD Functions
/******* Create ****************** */

export function addClient(id) {
  console.log('Add Client Called');
  let videoMaterial = makeVideoMaterial(id);
  const otherMat = new THREE.MeshNormalMaterial();

  const head = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), [otherMat, otherMat, otherMat, videoMaterial]);
  head.position.set(0, 0, 0);

  var group = new THREE.Group();
  group.add(head);

  peers[id].group = group;

  //this.scene.add(group); fix to work with React

  peers[id].previousPosition = new THREE.Vector3();
  peers[id].previousRotation = new THREE.Quaternion();
  peers[id].desiredPosition = new THREE.Vector3();
  peers[id].desiredRotation = new THREE.Quaternion();
}

/******* Read ****************** */
export function getPlayerPositions() {
  return proxy.positions;
}
/******* Update ****************** */

// overloaded function can deal with new info or not
export function updateClientPositions(clientProperties) {
  lerpValue = 0;
  for (let id in clientProperties) {
    if (id != mySocket.id) {
      peers[id].previousPosition.copy(peers[id].group.position);
      peers[id].previousRotation.copy(peers[id].group.quaternion);
      peers[id].desiredPosition = new THREE.Vector3().fromArray(clientProperties[id].position);
      peers[id].desiredRotation = new THREE.Quaternion().fromArray(clientProperties[id].rotation);
    }
  }
}

//Delete
export function removeClient(id) {
  delete peers[id];
  // scene.remove(peers[id].group);
}

// Utilities

function makeVideoMaterial(id) {
  let videoElement = document.getElementById(id + '_video');
  let videoTexture = new THREE.VideoTexture(videoElement);

  let videoMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
    overdraw: true,
    side: THREE.DoubleSide
  });

  return videoMaterial;
}
