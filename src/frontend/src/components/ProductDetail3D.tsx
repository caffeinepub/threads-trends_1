import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import type * as THREE from "three";

const PARTICLE_COUNT = 400;

function GoldParticlesSmall() {
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
      velocities[i] = Math.random() * 0.4 + 0.15;
    }
    return { positions, velocities };
  }, []);

  const pointsRef = useRef<THREE.Points>(null);
  const posRef = useRef(positions);
  const velRef = useRef(velocities);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!pointsRef.current) return;
    const pos = posRef.current;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3 + 1] += velRef.current[i] * 0.003;
      pos[i * 3] += Math.sin(t * 0.2 + i) * 0.0008;
      if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5;
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
        size={0.02}
        color="#C9A84C"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

const FRAME_EDGES: [number, number, number, number, number, number][] = [
  [0, 2.1, 0, 3.2, 0.04, 0.04],
  [0, -2.1, 0, 3.2, 0.04, 0.04],
  [-1.6, 0, 0, 0.04, 4.2, 0.04],
  [1.6, 0, 0, 0.04, 4.2, 0.04],
];

const CORNER_POSITIONS: [number, number, number][] = [
  [-1.6, 2.1, 0],
  [1.6, 2.1, 0],
  [-1.6, -2.1, 0],
  [1.6, -2.1, 0],
];

function ProductPanel({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.18;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main image panel */}
      <mesh>
        <planeGeometry args={[3, 4]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {/* Gold wireframe border */}
      <mesh>
        <boxGeometry args={[3.1, 4.1, 0.02]} />
        <meshBasicMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Thin gold frame edges */}
      {FRAME_EDGES.map((args) => (
        <mesh
          key={`edge-${args[0]}-${args[1]}`}
          position={[args[0], args[1], args[2]]}
        >
          <boxGeometry args={[args[3], args[4], args[5]]} />
          <meshStandardMaterial
            color="#C9A84C"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      ))}
      {/* Corner accents */}
      {CORNER_POSITIONS.map((pos) => (
        <mesh key={`corner-${pos[0]}-${pos[1]}`} position={pos}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial
            color="#E8C97A"
            metalness={0.98}
            roughness={0.05}
          />
        </mesh>
      ))}
      {/* Caption label */}
      <mesh position={[0, -2.45, 0]}>
        <planeGeometry args={[3, 0.25]} />
        <meshBasicMaterial color="#0d0b06" transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function SceneContent({ imageUrl }: { imageUrl: string }) {
  return (
    <>
      <ambientLight intensity={0.5} color="#fff5e0" />
      <pointLight position={[4, 4, 4]} intensity={3} color="#C9A84C" />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color="#e8c97a" />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#ffffff" />
      <GoldParticlesSmall />
      <ProductPanel imageUrl={imageUrl} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.25}
        autoRotate={false}
      />
    </>
  );
}

export default function ProductDetail3D({
  imageUrl,
  productName,
}: {
  imageUrl: string;
  productName: string;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ background: "oklch(0.06 0.005 60)" }}
      gl={{ antialias: true }}
      aria-label={`3D view of ${productName}`}
    >
      <Suspense fallback={null}>
        <SceneContent imageUrl={imageUrl} />
      </Suspense>
    </Canvas>
  );
}
