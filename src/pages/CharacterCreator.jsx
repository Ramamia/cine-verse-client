import React from 'react';
import Avatar from '../components/3d/Avatar'; // Uses your animated Avatar
import { useGLTF } from '@react-three/drei';

export default function CharacterCreator() {
    // Load models here instead of in Avatar.jsx
  const { scene: cowboyHat } = useGLTF('/models/cowboy_hat.glb');
  const { scene: astronaut } = useGLTF('/models/astro_helmet.glb');
  const { scene: glasses } = useGLTF('/models/cinema_glasses.glb');
  const { scene: hair } = useGLTF('/models/monroe_hair.glb');

  const accessories = {
    cowboy: cowboyHat,
    astronaut: astronaut,
    glasses: glasses,
    hair: hair
  };
  return (
    <group>
      {/* CAMERA MOVEMENT DISABLED: 
          OrbitControls removed to lock the user's view 
      */}

      {/* 1. White Spotlight: Focused on the new Avatar position */}
      <spotLight 
        position={[-0.3, 10, 5.6]} // High above the avatar
        target-position={[-0.3, 2.67, 5.6]} // Aimed exactly at the model
        angle={0.4} 
        penumbra={0.5} 
        intensity={60} 
        color="#ffffff" 
        castShadow 
      />
      
      {/* 2. Red PointLight: Dramatic floor glow exactly beneath the feet */}
      {/* Positioned at Y: -1 to match your floor level from App.jsx */}
      <pointLight 
        position={[-3, 1.2, 7.8]} 
        color="#b18181" 
        intensity={850} 
        distance={8} 
      />

      {/* 3. Rim Light: Subtle light from behind to make the silhouette pop */}
      <pointLight 
        position={[-0.6, 2.67, 3]} 
        color="#ffffff" 
        intensity={10} 
      />

      <group position={[1.7, 6.1, 13]} rotation={[-0.1, 0.5, -0.1]}>
        <Avatar /> 
      </group>
    </group>
  );
}