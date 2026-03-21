import { Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function GoldOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.1;
      wireRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Inner solid sphere with dark material */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.4, 64, 64]} />
        <meshStandardMaterial
          color="#1a1208"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Gold wireframe overlay */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[1.45, 16, 16]} />
        <meshBasicMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[1.55, 32, 32]} />
        <meshBasicMaterial
          color="#C9A84C"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function FloatingIcosahedron() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.3;
      ref.current.rotation.y = t * 0.2;
      ref.current.position.x = Math.sin(t * 0.4) * 3.2;
      ref.current.position.y = Math.cos(t * 0.3) * 0.8;
      ref.current.position.z = Math.sin(t * 0.25) * 1.0;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.45, 0]} />
      <meshBasicMaterial color="#C9A84C" wireframe transparent opacity={0.6} />
    </mesh>
  );
}

function FloatingTorus() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.z = t * 0.15;
      ref.current.position.x = Math.sin(t * 0.35 + Math.PI) * 3.0;
      ref.current.position.y = Math.cos(t * 0.28 + Math.PI) * 0.9;
      ref.current.position.z = Math.cos(t * 0.22) * 0.8;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[0.5, 0.15, 8, 24]} />
      <meshBasicMaterial color="#C9A84C" wireframe transparent opacity={0.5} />
    </mesh>
  );
}

function FloatingOctahedron() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.4;
      ref.current.rotation.y = t * 0.25;
      ref.current.position.x = Math.cos(t * 0.45 + 1) * 2.8;
      ref.current.position.y = Math.sin(t * 0.38 + 2) * 1.2 - 1.0;
      ref.current.position.z = Math.cos(t * 0.3 + 0.5) * 1.2;
    }
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.35, 0]} />
      <meshBasicMaterial color="#E8C97A" wireframe transparent opacity={0.55} />
    </mesh>
  );
}

function GoldParticles() {
  const count = 800;
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    velocities[i] = Math.random() * 0.5 + 0.2;
  }

  const pointsRef = useRef<THREE.Points>(null);
  const posRef = useRef(positions.slice());
  const velRef = useRef(velocities);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!pointsRef.current) return;
    const pos = posRef.current;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += velRef.current[i] * 0.004;
      pos[i * 3] += Math.sin(t * 0.3 + i) * 0.001;
      if (pos[i * 3 + 1] > 7) {
        pos[i * 3 + 1] = -7;
      }
    }
    (
      pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    ).set(pos);
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[posRef.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#C9A84C"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} color="#fff5e0" />
      <pointLight position={[5, 5, 5]} intensity={2} color="#C9A84C" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4a3010" />
      <Stars
        radius={60}
        depth={30}
        count={2000}
        factor={2}
        saturation={0.1}
        fade
        speed={0.3}
      />
      <GoldParticles />
      <GoldOrb />
      <FloatingIcosahedron />
      <FloatingTorus />
      <FloatingOctahedron />
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}
