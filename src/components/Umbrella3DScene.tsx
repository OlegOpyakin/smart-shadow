import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Umbrella3D from './Umbrella3D';

interface Props {
  progress: number;
  theme: 'light' | 'dark';
}

const Lighting = ({ theme }: { theme: string }) => {
  const isLight = theme === 'light';
  return (
    <>
      <ambientLight intensity={isLight ? 1.2 : 0.8} color="#ffffff" />
      <directionalLight
        position={[5, 10, 5]}
        intensity={isLight ? 2.0 : 1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.3}
        color="#ffffff"
      />
    </>
  );
};

export default function Umbrella3DScene({ progress, theme }: Props) {
  return (
    <Suspense fallback={
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        Loading 3D...
      </div>
    }>
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 8], fov: 50, near: 0.1, far: 100 }}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Lighting theme={theme} />
        <Umbrella3D scrollProgress={progress} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial transparent opacity={0.15} />
        </mesh>
      </Canvas>
    </Suspense>
  );
}