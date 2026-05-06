import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  scrollProgress: number;
}

export default function Umbrella3D({ scrollProgress }: Props) {
  const spinRef = useRef<THREE.Group>(null);   // только вращение
  const modelRef = useRef<THREE.Group>(null);  // позиция + масштаб
  const { scene } = useGLTF('/models/umbrella.glb');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Делаем всю модель белой
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#ffffff',
          roughness: 0.3,
          metalness: 0.1,
        });
      }
    });

    // Вычисляем bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 5;   // желаемая высота модели
    const scale = targetSize / maxDim;

    if (modelRef.current) {
      // Смещаем модель так, чтобы её геометрический центр оказался в (0,0,0) родительской группы
      // Смещение умножаем на scale, так как модель потом масштабируется
      modelRef.current.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
      modelRef.current.scale.setScalar(scale);
    }
    setReady(true);
  }, [scene]);

    useFrame(() => {
    if (ready && spinRef.current) {
        const targetRotation = scrollProgress * 1.5 * Math.PI;
        // плавное приближение (чем меньше 0.08, тем мягче)
        spinRef.current.rotation.y = THREE.MathUtils.lerp(
        spinRef.current.rotation.y,
        targetRotation,
        0.08
        );
    }
    });


  return (
    <group ref={spinRef}>
      <group ref={modelRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}