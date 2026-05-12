import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';

const AVATAR_MAP = {
  pink:  '/models/pink_avatar.glb',
  green: '/models/green_avatar.glb',
};

export default function Avatar({ config, accessories = {} }) {
  const group = useRef();
  const modelPath = AVATAR_MAP[config?.skin] ?? '/models/base_avatar.glb';

  const { scene, animations } = useGLTF(modelPath);
  const { actions }           = useAnimations(animations, group);
  const { forward, backward, left, right } = useKeyboard();

  // Swap between idle and walk animations
  useEffect(() => {
    if (!actions || animations.length === 0) return;
    const isMoving    = forward || backward || left || right;
    const idleAction  = actions[animations[0]?.name];
    const walkAction  = actions[animations[1]?.name];

    if (isMoving && walkAction) {
      idleAction?.fadeOut(0.2);
      walkAction.reset().fadeIn(0.2).play();
    } else if (idleAction) {
      walkAction?.fadeOut(0.2);
      idleAction.reset().fadeIn(0.2).play();
    }
  }, [forward, backward, left, right, actions, animations]);

  // Movement & camera follow
  useFrame((state, delta) => {
    if (!group.current) return;
    const speed    = 4;
    const rotSpeed = 2.5;

    if (forward)  group.current.translateZ(-speed * delta);
    if (backward) group.current.translateZ(speed  * delta);
    if (left)     group.current.rotation.y += rotSpeed * delta;
    if (right)    group.current.rotation.y -= rotSpeed * delta;

    const cameraOffset = new THREE.Vector3(0, 3, 6)
      .applyQuaternion(group.current.quaternion)
      .add(group.current.position);
    state.camera.position.lerp(cameraOffset, 0.1);
    state.camera.lookAt(
      group.current.position.x - 1,
      group.current.position.y + 1,
      group.current.position.z,
    );
  });

  return (
    <group name="avatar-isolation-container">
      <primitive ref={group} object={scene} scale={2.5} position={[0, 0, 0]}>
        <group position={[0, 0.65, 0]}>
          {config?.acc  === 'cowboy'  && accessories.cowboy  && (
            <primitive object={accessories.cowboy.clone()}  scale={0.15} position={[0,  0.1,  0  ]} />
          )}
          {config?.acc  === 'glasses' && accessories.glasses && (
            <primitive object={accessories.glasses.clone()} scale={0.18} position={[0, -0.05, 0.1]} />
          )}
          {config?.hair === 'marilyn' && accessories.hair   && (
            <primitive object={accessories.hair.clone()}    scale={0.2}  position={[0,  0,    0  ]} />
          )}
        </group>
      </primitive>
    </group>
  );
}
