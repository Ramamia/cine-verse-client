import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshReflectorMaterial, Environment } from '@react-three/drei';

import Entrance from '../../pages/Entrance';
import CharacterCreator from '../../pages/CharacterCreator';
import GrandRotunda from '../../pages/GrandRotunda';
import HorrorRoom from '../../pages/HorrorRoom';
import RomComRoom from '../../pages/RomComRoom';
import ScifiRoom from '../../pages/ScifiRoom';

// smooth zoom out animation for when you first enter
function EntranceCamera() {
  const initialized = useRef(false);
  useFrame((state) => {
    if (!initialized.current) {
      state.camera.position.set(2, 7, 7); // start zoomed-in closer
      initialized.current = true;
    }
    // smoothly pull the camera back further to zoom out
    state.camera.position.x += (2 - state.camera.position.x) * 0.025;
    state.camera.position.y += (8 - state.camera.position.y) * 0.025;
    state.camera.position.z += (20 - state.camera.position.z) * 0.025;
  });
  return null;
}

export default function RoomCanvas({
  step,
  activeGenre,
  config,
  enterGenrePortal,
  setSelectedMovie,
  currentSettings,
}) {
  return (
    <Canvas shadows camera={{ position: currentSettings.camPos, fov: 50 }}>
      <color attach="background" args={[currentSettings.bg]} />
      <fog attach="fog" args={[currentSettings.bg, currentSettings.fogNear, currentSettings.fogFar]} />

      {step === 'entrance' && (
        <OrbitControls
          enablePan={false} enableZoom={false} enableRotate
          minDistance={180} maxDistance={200}
          target={[-2, 10, 5]}
          minAzimuthAngle={-Math.PI / 16} maxAzimuthAngle={Math.PI / 16}
          minPolarAngle={Math.PI / 2.5}   maxPolarAngle={Math.PI / 2.1}
        />
      )}
      {step === 'customize' && (
        <OrbitControls
          enablePan={false} enableZoom={true} enableRotate
          minDistance={1} maxDistance={10}
          target={[-0.3, 2.67, 5.6]}
        />
      )}
      {step === 'hub' && (
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 2.5}
          minDistance={10} maxDistance={16}
          target={[3.5, 4, 2]}
          enableRotate
          minAzimuthAngle={-Math.PI / 12} maxAzimuthAngle={Math.PI / 12}
        />
      )}

      <Suspense fallback={null}>
        {/* horror room has its own spooky lighting so we turn off the main lights there */}
        {!(step === 'genrePage' && activeGenre === 'horror') && <ambientLight intensity={0.4} />}
        {!(step === 'genrePage' && activeGenre === 'horror') && (
          <spotLight
            position={[0, 10, 0]}
            intensity={step === 'hub' ? 30 : 20}
            angle={0.5}
            penumbra={1}
            castShadow
          />
        )}

        {step === 'entrance'  && (
          <>
            <EntranceCamera />
            <Entrance />
          </>
        )}
        {step === 'customize' && <CharacterCreator config={config} />}
        {step === 'hub'       && <GrandRotunda enterGenrePortal={enterGenrePortal} />}
        {step === 'genrePage' && activeGenre === 'horror' && (
          <HorrorRoom onSelectMovie={setSelectedMovie} />
        )}
        {step === 'genrePage' && activeGenre === 'romcom' && (
          <RomComRoom onSelectMovie={setSelectedMovie} />
        )}
        {step === 'genrePage' && activeGenre === 'scifi' && (
          <ScifiRoom onSelectMovie={setSelectedMovie} />
        )}

        {/* cool reflective floor to tie the rooms together */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[400, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            color={step === 'hub' ? '#696666' : '#312b2b'}
            metalness={0.5}
          />
        </mesh>

        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
