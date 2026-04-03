import React, { useMemo } from 'react';
import { useGLTF, Float, OrbitControls } from '@react-three/drei';

export default function Entrance() {
  const { scene: booth } = useGLTF('/models/ticket_booth.glb');
  const { scene: seat } = useGLTF('/models/cinema_chair..glb');
  const { scene: rope } = useGLTF('/models/entrance_ropes.glb');

  const seatClones = useMemo(() => 
    Array.from({ length: 32 }, () => seat.clone()), [seat]);
  const ropeClones = useMemo(() => [0, 1, 2, 3, 4, 5].map(() => rope.clone()), [rope]);

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
      {/* --- CAMERA CONTROLS (Only for this page) --- */}
      <OrbitControls 
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
        // Horizontal peek (approx 10 degrees each way)
        minAzimuthAngle={-Math.PI / 18} 
        maxAzimuthAngle={Math.PI / 18}
        // Vertical peek (stops them from looking under the floor)
        minPolarAngle={Math.PI / 2.8} 
        maxPolarAngle={Math.PI / 2.6}
        // Zoom constraints (Camera is at 13, so 11 to 15 is a tiny range)
        minDistance={11}
        maxDistance={15}
      />
      
      {/* BOOTH */}
      <Float speed={0.5} rotationIntensity={0.1}>
        <primitive object={booth} position={[0, 0, -5]} scale={3.3} />
      </Float>
      {/* --- LEFT SIDE (Two Rows) --- */}
      <SeatRow x={-6} z={10} startIdx={0} rotationY={Math.PI} /> {/* Row 1 */}
      <SeatRow x={-9} z={10} startIdx={4} rotationY={Math.PI} /> {/* Row 2 */}
      <SeatRow x={-12} z={10} startIdx={8} rotationY={Math.PI} /> {/* Row 3 */}


      {/* --- RIGHT SIDE (Two Rows) --- */}
      <SeatRow x={6} z={10} startIdx={12} rotationY={Math.PI} />  {/* Row 1 */}
      <SeatRow x={9} z={10} startIdx={16} rotationY={Math.PI} /> {/* Row 2 */}
      <SeatRow x={12} z={10} startIdx={20} rotationY={Math.PI} /> {/* Row 3 */}


      {/* ROPES (Unchanged as requested) */}
      <primitive object={ropeClones[0]} position={[-4, 0, 1]} scale={2.8} rotation={[0, Math.PI /2, 0]} />
      <primitive object={ropeClones[1]} position={[-4, 0, 6]} scale={2.8} rotation={[0, Math.PI /2, 0]} />
      <primitive object={ropeClones[2]} position={[4, 0, 1]} scale={2.8} rotation={[0, Math.PI /2, 0]} />
      <primitive object={ropeClones[3]} position={[4, 0, 6]} scale={2.8} rotation={[0, Math.PI /2, 0]} />
      <primitive object={ropeClones[4]} position={[4, 0, 11]} scale={2.8} rotation={[0, Math.PI /2, 0]} />
      <primitive object={ropeClones[5]} position={[-4, 0, 11]} scale={2.8} rotation={[0, Math.PI /2, 0]} />

      <pointLight position={[0, 2, -2]} color="#760707" intensity={8} />
    </group>
    
  );
}