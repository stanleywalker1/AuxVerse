import { WaterPlane } from './components/Water';
import React, { Suspense, useEffect, useState} from 'react';
import { Canvas, useThree} from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import './App.css';

const WorldCreator = props => {
  
  //const [isMobile, setMobile] = useState(false);
  //const { scene, camera, gl, controls, ...rest } = useThree();
  //useEffect(() => setMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), []);
  return (
    <Suspense fallback={null}>
    
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


const Scene = () => {
  const style = {
    background: '#ffffff',
    top: 0,
    left: 0,
    height: '700px',
    width: '100%',
    zIndex: 1
  };

  return (
    <>
    <Canvas style={style} camera={{ position: [0, 3, 10] }}>
    {/* <color attach="background" args={[bgColor]} /> */}
     <WorldCreator />
    </Canvas>
  </>

  ) 
};

const App = () => {
  return <Scene />;
};

export default App;
