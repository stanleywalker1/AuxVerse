import * as THREE from 'three';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { proxy } from 'valtio';

//import { useControls } from "leva";
//attempt at reactVersion
//import FirstPersonControler from "./libs/firstPersonControls";
import { FirstPersonControls } from './libs/vanilla/firstPersonControls';
import { WaterPlane } from './Water';

//mport { init } from "../store/network";

//peers
import { peers } from '../store/peers';
export const cameraStore = proxy({ mainCamera: null });

let lerpValue = 0;

export default function Stage() {
  //const { bgColor } = useControls({ bgColor: "#15e9bb" });
  const style = {
    background: '#30A9A4',
    top: 0,
    left: 0,
    height: '600px',
    width: '100%',
    zIndex: 1
  };

  return (
    <>
      <Canvas style={style} camera={{ position: [0, 3, 6] }}>
        {/* <color attach="background" args={[bgColor]} /> */}
        <WorldCreator />
      </Canvas>
    </>
  );
}

/***
 * WORLD *******************
 */
const WorldCreator = props => {
  // Mobile device test
  const [isMobile, setMobile] = useState(false);
  /***   CONTROLS ********/
  // Controls Object
  const firstPersonRef = useRef();
  // Three.js objects
  const { scene, camera, gl, controls, ...rest } = useThree();

  // Establish our own custom controls
  useEffect(() => {
    //console.log("Scene", scene);
    //console.log("Rest", rest);
    //init();
    // scene, camera, renderer(gl)
    //set the camera for other utilites to have access
    cameraStore.mainCamera = camera;
    // hack to use our controls
    firstPersonRef.current = new FirstPersonControls(scene, camera, gl);
  }, []);

  //helper to smooth positions in frames
  function interpolatePositions() {
    lerpValue += 0.1; // updates are sent roughly every 1/5 second == 10 frames
    for (let id in peers) {
      if (peers[id].group) {
        peers[id].group.position.lerpVectors(peers[id].previousPosition, peers[id].desiredPosition, lerpValue);
        peers[id].group.quaternion.slerpQuaternions(peers[id].previousRotation, peers[id].desiredRotation, lerpValue);
      }
    }
  }
  useFrame((state, delta) => {
    // This function runs at the native refresh rate inside of a shared render-loop
    firstPersonRef.current.update();

    /* if (this.frameCount % 25 === 0) {
      this.updateClientVolumes();
    }
    */

    interpolatePositions();
    //controls.update();
  });

  useEffect(() => setMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), []);
  return (
    <Suspense fallback={null}>
      {/* <FirstPersonControler /> */}
      <Sky
        //  distance={450}
        sunPosition={[0, 0, 1000]}
        elevation={0}
        azimuth={0}
        turbidity={12}
        rayleigh={2.5}
        mieCoefficient={0.009}
        mieDirectionalG={0.988}
        exposure={0.5}
        {...props}
      />

      <WaterPlane />
    </Suspense>
  );
};

export function getPlayerPosition() {
  if (!cameraStore.mainCamera) return false;
  // TODO: use quaternion or are euler angles fine here?
  return [
    [cameraStore.mainCamera.position.x, cameraStore.mainCamera.position.y, cameraStore.mainCamera.position.z],
    [
      cameraStore.mainCamera.quaternion._x,
      cameraStore.mainCamera.quaternion._y,
      cameraStore.mainCamera.quaternion._z,
      cameraStore.mainCamera.quaternion._w
    ]
  ];
}
