import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { PerspectiveCamera } from '@react-three/drei';
import FirstPersonControler from './libs/firstPersonControls';

const WorldCreator = props => {
  // Mobile device test
  const [isMobile, setMobile] = useState(false);

  useEffect(() => setMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), []);

  // background: '#3E3E3D'
  return (
    <>
      <Canvas
        style={{
          background: '#FF8923',
          //   position: "absolute",
          top: 0,
          left: 0,
          height: '500px',
          width: '1000px',
          zIndex: 1
        }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 3, 6]} />
          <FirstPersonControler />
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
        </Suspense>
      </Canvas>
    </>
  );
};

export default WorldCreator;
