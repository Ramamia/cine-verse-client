import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';


import { MODEL_OFFSETS, getModelPath } from './AvatarConfig';

export default function Avatar({ config, isPreview = false }) {
  const group = useRef();

  // 1. figure out which model file to use based on what the user picked
  const modelPath = getModelPath(config);

  // 2. load the main skeleton and then the actual model they selected
  const baseAvatar = useGLTF('/models/base_avatar.glb');
  const { scene, animations: modelAnimations } = useGLTF(modelPath);

  // clone the scene so we can have multiple avatars at once without them breaking each other
  const clonedScene = React.useMemo(() => {
    if (!scene) return null;
    return clone(scene);
  }, [scene]);

  // grab animations from the base avatar if this custom one doesn't have its own
  const animations = modelAnimations.length > 0 ? modelAnimations : baseAvatar.animations;
  const { actions }           = useAnimations(animations, group);
  const { forward, backward, left, right } = useKeyboard();

  // 3. color the skin mesh to match whatever they chose
  const skinColorMap = {
    pink: '#cb186c',
    green: '#06973d',
    '#ffdbac': '#ffdbac'
  };
  const targetColor = skinColorMap[config?.skin] ?? '#ffdbac';

  useEffect(() => {
    if (!clonedScene) return;

    // check if the main skeleton is actually there
    let baseAvatarNodeExists = false;
    clonedScene.traverse((n) => {
      if (n.name === 'base_avatar') baseAvatarNodeExists = true;
    });

    clonedScene.traverse((child) => {
      // hide all the weird duplicated meshes that aren't attached to the main skeleton
      // so it doesn't look like a horror movie
      let isFromMainAvatar = true;
      if (baseAvatarNodeExists) {
        let curr = child;
        let found = false;
        while (curr) {
          if (curr.name === 'base_avatar') {
            found = true;
            break;
          }
          curr = curr.parent;
        }
        isFromMainAvatar = found;
      }

      if (child.isMesh) {
        if (!isFromMainAvatar) {
          child.visible = false;
          return;
        }

        if (child.name.includes('pCube35_lambert1')) {
          child.material = child.material.clone();
          child.material.color.set(new THREE.Color(targetColor));
        }

        const isBody = child.name.includes('pCube35_lambert1');
        const isCowboyHat = child.name.includes('Hat4_pasted__M_Hat') || child.name.includes('pCube32') || child.name.includes('pCube33') || child.name.includes('pCube34');
        const isGlasses = child.name.toLowerCase().includes('glass') || child.name.toLowerCase().includes('cinema');
        const isHair = child.name.toLowerCase().includes('hair') || child.name.toLowerCase().includes('monroe') || child.name.toLowerCase().includes('marilyn');

        if (isBody) {
          child.visible = true;
        } else if (isCowboyHat) {
          child.visible = (config?.acc === 'cowboy');
        } else if (isGlasses) {
          child.visible = (config?.acc === 'glasses');
        } else if (isHair) {
          child.visible = (config?.hair === 'marilyn');
        } else {
          child.visible = false;
        }
      }
    });
  }, [clonedScene, targetColor, config]);

  // swap between standing around and walking when you press keys
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

  // camera following logic for walking around the rooms
  useFrame((state, delta) => {
    if (isPreview) return;
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

  // 4. grab the position and scale tweaks we saved for this specific model
  const offsets = MODEL_OFFSETS[modelPath] ?? {
    position: [0, 0, 0],
    scale: 2.5,
    rotation: [0, 0, 0]
  };

  return (
    <group ref={group} name="avatar-isolation-container">
      {/* 
        using the path as a key so react properly remounts it when you change models
        otherwise the bones get all twisted up
      */}
      <primitive
        key={modelPath}
        object={clonedScene}
        scale={offsets.scale}
        position={offsets.position}
        rotation={offsets.rotation}
      />
    </group>
  );
}
