import React, { useMemo } from 'react';
import { useGLTF, Float, OrbitControls } from '@react-three/drei';

export default function Entrance() {
  const { scene: booth } = useGLTF('/models/ticket_booth.glb');
  const { scene: seat  } = useGLTF('/models/cinema_chair..glb');
  const { scene: rope  } = useGLTF('/models/entrance_ropes.glb');

  const seatClones = useMemo(() => Array.from({ length: 32 }, () => seat.clone()), [seat]);
  const ropeClones = useMemo(() => Array.from({ length: 6  }, () => rope.clone()), [rope]);

  const SeatRow = ({ x, z, startIdx, rotationY }) => (
    <group position={[x, 1, z]}>
      {[0, 1, 2, 3].map((i) => (
        <primitive
          key={`seat-${startIdx + i}`}
          object={seatClones[startIdx + i]}
          position={[0, 0, i * -1.8]}
          rotation={[0, rotationY, 0]}
          scale={0.006}
        />
      ))}
    </group>
  );

  return (
    <group>
      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        minAzimuthAngle={-Math.PI / 18}
        maxAzimuthAngle={Math.PI  / 18}
        minPolarAngle={Math.PI / 2.8}
        maxPolarAngle={Math.PI / 2.6}
        minDistance={11}
        maxDistance={15}
      />

      {/* Ticket booth */}
      <Float speed={0.5} rotationIntensity={0.1}>
        <primitive object={booth} position={[0, 0, -5]} scale={3.3} />
      </Float>

      {/* Left seat rows */}
      <SeatRow x={-6}  z={10} startIdx={0}  rotationY={Math.PI} />
      <SeatRow x={-9}  z={10} startIdx={4}  rotationY={Math.PI} />
      <SeatRow x={-12} z={10} startIdx={8}  rotationY={Math.PI} />

      {/* Right seat rows */}
      <SeatRow x={6}   z={10} startIdx={12} rotationY={Math.PI} />
      <SeatRow x={9}   z={10} startIdx={16} rotationY={Math.PI} />
      <SeatRow x={12}  z={10} startIdx={20} rotationY={Math.PI} />

      {/* Velvet ropes */}
      {[
        [-4, 0,  1], [-4, 0,  6],
        [ 4, 0,  1], [ 4, 0,  6],
        [ 4, 0, 11], [-4, 0, 11],
      ].map(([x, y, z], i) => (
        <primitive
          key={`rope-${i}`}
          object={ropeClones[i]}
          position={[x, y, z]}
          scale={2.8}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}

      <pointLight position={[0, 2, -2]} color="#760707" intensity={8} />
    </group>
  );
}
