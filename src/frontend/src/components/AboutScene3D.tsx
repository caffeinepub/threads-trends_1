import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import type * as THREE from "three";

function RotatingTorus() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.12;
      ref.current.rotation.y = t * 0.08;
      ref.current.rotation.z = t * 0.05;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.2, 0.06, 6, 80]} />
      <meshBasicMaterial color="#C9A84C" transparent opacity={0.2} />
    </mesh>
  );
}

function RotatingTorusKnot() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.1;
      ref.current.rotation.y = t * 0.15;
    }
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.2, 0.04, 128, 8, 2, 3]} />
      <meshBasicMaterial color="#E8C97A" transparent opacity={0.15} />
    </mesh>
  );
}

export default function AboutScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} color="#C9A84C" />
        <RotatingTorus />
        <RotatingTorusKnot />
      </Suspense>
    </Canvas>
  );
}
