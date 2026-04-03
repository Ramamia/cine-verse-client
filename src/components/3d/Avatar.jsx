import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useKeyboard } from '../../hooks/useKeyboard';
import * as THREE from 'three';

export default function Avatar() {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/base_avatar.glb'); 
  const { actions } = useAnimations(animations, group);
  const { forward, backward, left, right } = useKeyboard();

  // Animation Controller
  useEffect(() => {
    // Replace 'Walk' with the actual name of the animation in your file
    // Check console to see available names: console.log(animations)
    const isMoving = forward || backward || left || right;
    if (isMoving) {
      actions[animations[0]?.name]?.fadeIn(0.2).play();
    } else {
      actions[animations[0]?.name]?.fadeOut(0.2);
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

    const cameraOffset = new THREE.Vector3(0, 3, 6).applyQuaternion(group.current.quaternion).add(group.current.position);
    state.camera.position.lerp(cameraOffset, 0.1);
    state.camera.lookAt(group.current.position.x, group.current.position.y + 1, group.current.position.z);
  });

  return <primitive ref={group} object={scene} scale={2.5} position={[0, 0, 0]} />;
}