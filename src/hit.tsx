import { useRef, useEffect } from 'react';
import { Mesh } from 'three';
import gsap from 'gsap';

export const HitEffect = ({ position, onFinish }) => {
  const ref = useRef<Mesh>(null);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;

    mesh.scale.set(0.1, 0.1, 0.1);
    mesh.material.opacity = 1;

    gsap.to(mesh.scale, {
      x: 2,
      y: 2,
      z: 2,
      duration: 0.3,
      ease: 'power2.out',
    });

    gsap.to(mesh.material, {
      opacity: 0,
      duration: 0.3,
      delay: 0,
      onComplete: () => onFinish?.(),
    });
  }, []);

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshBasicMaterial color="orange" transparent />
    </mesh>
  );
};