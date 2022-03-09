import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { PerspectiveCamera } from '@react-three/drei';
import FirstPersonControler from "./libs/firstPersonControls";

// *********** Starting to try and merge from three.js project **************
// first take at video function
// const makeVideoMaterial = () => {
//   let videoElement = document.getElementById(id + "_video");
//   let videoTexture = new THREE.VideoTexture(videoElement);

//   let videoMaterial = new THREE.MeshBasicMaterial({
//     map: videoTexture,
//     overdraw: true,
//     side: THREE.DoubleSide,
//   });
//   };

//   // second take at video function
//   const videoElementRef = useRef();

  const setVideoElementRef = (videoElement) => {
    if (!videoElementRef.current) {
      videoElementRef.current = videoElement;
      const videoTexture = new THREE.VideoTexture(videoElement);
  
      const videoMaterial = new THREE.MeshBasicMaterial({
        map: videoTexture,
        overdraw: true,
        side: THREE.DoubleSide,
      });
    }
    return (
      <Video ref={setVideoElementRef} />
    );
  };

const addClient = (videoElement) => {
  const videoMaterial = setVideoElementRef(videoElement);
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

const removeClient = (videoElement) => {
 // this.scene.remove(peers[id].group); fix to work with React
}


// ***********  ************** ************** ************** **************

const WorldCreator = (props) => {
  // Mobile device test
  const [isMobile, setMobile] = useState(false);

  useEffect(
    () => setMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)),
    []
  );

  // background: '#3E3E3D'
  return (
    <>
      <Canvas
        style={{
          background: "#FF8923",
        //   position: "absolute",
          top: 0,
          left: 0,
          height: "500px",
          width: "1000px",
          zIndex: 1,
        }}
      >


        <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 3, 6]} />
            <FirstPersonControler/>
            <Sky
            //  distance={450}
             sunPosition={[0, 0, 1000]}
             elevation={0}
             azimuth={0}
             turbidity = {12}
             rayleigh= {2.5}
             mieCoefficient = {0.009}
             mieDirectionalG = {0.988}
             exposure={0.5}
             {...props}
         />
        </Suspense>
      </Canvas>
      
    </>
  );
};

export default WorldCreator;