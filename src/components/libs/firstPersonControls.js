import * as React from 'react';

import { Box, FirstPersonControls } from '@react-three/drei';

const FirstPersonControler = ({ ...args }) => {
  FirstPersonControls.args = {
    activeLook: true,
    autoForward: false,
    constrainVertical: false,
    enabled: true,
    heightCoef: 1,
    heightMax: 1,
    heightMin: 0,
    heightSpeed: false,
    lookVertical: true,
    lookSpeed: 0.005,
    movementSpeed: 1,
    verticalMax: Math.PI,
    verticalMin: 0
  };
  return (
    <>
      <FirstPersonControls {...args} />
      <Box>
        <meshBasicMaterial attach="material" wireframe />
      </Box>
    </>
  );
};

export default FirstPersonControler;
