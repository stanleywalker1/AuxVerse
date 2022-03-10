import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from 'three-stdlib';

export function WaterPlane({ size = 1000 }) {
  const waterRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    const waterGeometry = new THREE.PlaneGeometry(size, size);
    waterRef.current = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        '../static/waternormals.jpg',
        texture => (texture.wrapS = texture.wrapT = THREE.RepeatWrapping)
      ),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    });
    const sun = new THREE.Vector3(0, 0, 1000);
    waterRef.current.material.uniforms['sunDirection'].value.copy(sun).normalize();
    waterRef.current.rotation.x = -Math.PI / 2;
  }, []);
  // this.scene.add(waterRef.current );

  useFrame(() => {
    waterRef.current.material.uniforms['time'].value += 1.0 / 60.0;
  });
  return <>{waterRef.current && <primitive object={waterRef.current} />}</>;
}
