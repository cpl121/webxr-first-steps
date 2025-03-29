import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

export const HitEffect = ({ position }) => {
  const { scene: explosionScene, animations } = useGLTF('/assets/explosion.glb');
  const explosionRef = useRef();
  const { actions } = useAnimations(animations, explosionScene);

  useEffect(() => {
    if (actions && actions.Explode) {
      const action = actions.Explode;
      action.reset().play();
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;

    }
  }, [actions]);

  return <primitive ref={explosionRef} object={explosionScene} position={position} />;
};
useGLTF.preload('/assets/explosion.glb');