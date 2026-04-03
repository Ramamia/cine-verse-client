import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useKeyboard } from '../../hooks/useKeyboard';
import * as THREE from 'three';

// We pass the accessories as separate scenes so the Avatar doesn't have to load them all
export default function Avatar({ config, accessories = {} }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/base_avatar.glb'); 
  const { actions } = useAnimations(animations, group);
  const { forward, backward, left, right } = useKeyboard();

  // Logic to change Skin Color
  useEffect(() => {
    if (!config?.skin || !scene) return;
    scene.traverse((child) => {
      // Check if child has material before checking name
      if (child.isMesh && child.material && child.material.name.toLowerCase().includes("skin")) {
        child.material.color.set(config.skin);
      }
    });
  }, [scene, config?.skin]);

  // Animation Controller (Your original logic)
  useEffect(() => {
    if (!actions || animations.length === 0) return;
    const isMoving = forward || backward || left || right;
    const idleAction = actions[animations[0]?.name];
    const walkAction = actions[animations[1]?.name];

    if (isMoving && walkAction) {
      idleAction?.fadeOut(0.2);
      walkAction.reset().fadeIn(0.2).play();
    } else if (idleAction) {
      walkAction?.fadeOut(0.2);
      idleAction.reset().fadeIn(0.2).play();
    }
  }, [forward, backward, left, right, actions, animations]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const speed = 4;
    const rotSpeed = 2.5;

    if (forward) group.current.translateZ(-speed * delta);
    if (backward) group.current.translateZ(speed * delta);
    if (left) group.current.rotation.y += rotSpeed * delta;
    if (right) group.current.rotation.y -= rotSpeed * delta;
    
    // Camera follow logic stays same
  });

  return (
    <primitive ref={group} object={scene} scale={2.5}>
       {/* THE FIX: No <Avatar /> inside here! Just the accessory slots */}
       <group position={[0, 0.65, 0]}>
          {config?.acc === 'cowboy' && accessories.cowboy && <primitive object={accessories.cowboy} scale={0.2} />}
          {config?.acc === 'astronaut' && accessories.astronaut && <primitive object={accessories.astronaut} scale={0.2} />}
          {config?.acc === 'glasses' && accessories.glasses && <primitive object={accessories.glasses} scale={0.2} position={[0, -0.05, 0.1]} />}
          {config?.hair === 'marilyn' && accessories.hair && <primitive object={accessories.hair} scale={0.2} />}
       </group>
    </primitive>
  );
}