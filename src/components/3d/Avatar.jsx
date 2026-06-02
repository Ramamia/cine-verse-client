import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboard } from '../../hooks/useKeyboard';

// Expose model offsets here so they can be easily customized by the user.
// You can adjust position [x, y, z], scale, and rotation [x, y, z] (in radians) for each model.
const MODEL_OFFSETS = {
  '/models/base_avatar.glb': {
    position: [0, 0, 0],
    scale: 2.5,
    rotation: [0, 0, 0]
  },
  '/models/pink.glb': {
    position: [0, 0, 0],
    scale: 2.5,
    rotation: [0, 0, 0]
  },
  '/models/green.glb': {
    position: [0, 0, 0],
    scale: 2.5,
    rotation: [0, 0, 0]
  },
  '/models/cowboy pink.glb': {
    position: [-1.47, 0, -1.77],
    scale: 0.125,
    rotation: [0, 0, 0]
  },
  '/models/cowboy green.glb': {
    position: [-0.53, 0.07, -1.74],
    scale: 0.125,
    rotation: [0, 0, 0]
  },
  '/models/glasses pink.glb': {
    position: [-1.47, 0, -1.39],
    scale: 0.125,
    rotation: [0, 0, 0]
  },
  '/models/glasses green.glb': {
    position: [0, 0, 0],
    scale: 2.5,
    rotation: [0, 0, 0]
  },
  '/models/monroe hair pink.glb': {
    position: [-1.47, 0, -0.87],
    scale: 0.125,
    rotation: [0, 0, 0]
  },
  '/models/monroe hair green.glb': {
    position: [-0.51, 0, -0.87],
    scale: 0.125,
    rotation: [0, 0, 0]
  }
};

export default function Avatar({ config, accessories = {} }) {
  const group = useRef();

  // 1. Resolve the correct model path based on selected skin color and accessories,
  // and check if accessories need to be rendered manually (since some models do not contain geometry).
  let modelPath = '/models/base_avatar.glb';
  let renderAccessoryManually = false;

  if (config?.skin === 'pink') {
    if (config.acc === 'cowboy') {
      modelPath = '/models/cowboy pink.glb';
    } else if (config.acc === 'glasses') {
      modelPath = '/models/glasses pink.glb';
      renderAccessoryManually = true; // glasses pink.glb lacks glasses mesh
    } else if (config.hair === 'marilyn') {
      modelPath = '/models/monroe hair pink.glb';
      renderAccessoryManually = true; // monroe hair pink.glb lacks hair mesh
    } else {
      modelPath = '/models/pink.glb';
    }
  } else if (config?.skin === 'green') {
    if (config.acc === 'cowboy') {
      modelPath = '/models/cowboy green.glb';
    } else if (config.acc === 'glasses') {
      // 'glasses green.glb' in the workspace is empty (852 bytes, no meshes).
      // We fall back to the base green avatar and render the glasses manually on top.
      modelPath = '/models/green.glb';
      renderAccessoryManually = true;
    } else if (config.hair === 'marilyn') {
      modelPath = '/models/monroe hair green.glb';
      renderAccessoryManually = true; // monroe hair green.glb lacks hair mesh
    } else {
      modelPath = '/models/green.glb';
    }
  }

  // 2. Load the base avatar (for skeletal animations and reference sizing) and the selected model.
  const baseAvatar = useGLTF('/models/base_avatar.glb');
  const { scene, animations: modelAnimations } = useGLTF(modelPath);

  // Use the animations from base_avatar if the loaded model has no embedded clips.
  const animations = modelAnimations.length > 0 ? modelAnimations : baseAvatar.animations;
  const { actions }           = useAnimations(animations, group);
  const { forward, backward, left, right } = useKeyboard();

  // 3. Dynamically set the skin color of the body mesh to match the user config color.
  // This overrides the green skin baked into the accessory GLB files when pink is chosen.
  const skinColorMap = {
    pink: '#cb186c',
    green: '#06973d',
    '#ffdbac': '#ffdbac'
  };
  const targetColor = skinColorMap[config?.skin] ?? '#ffdbac';

  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh && child.name.includes('pCube35_lambert1')) {
        child.material = child.material.clone();
        child.material.color.set(new THREE.Color(targetColor));
      }
    });
  }, [scene, targetColor]);

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

  // 4. Retrieve position, scale, and rotation offsets from the user-customizable offsets config
  const offsets = MODEL_OFFSETS[modelPath] ?? {
    position: [0, 0, 0],
    scale: 2.5,
    rotation: [0, 0, 0]
  };

  return (
    <group ref={group} name="avatar-isolation-container">
      {/* 
        We use the modelPath as a key to force React Three Fiber to completely 
        unmount the old scene and mount the new scene, preventing stale references 
        and ensuring animations bind correctly to the new mesh structure.
      */}
      <primitive
        key={modelPath}
        object={scene}
        scale={offsets.scale}
        position={offsets.position}
        rotation={offsets.rotation}
      >
        {renderAccessoryManually && (
          <group position={[0, 0.65, 0]}>
            {config?.acc === 'glasses' && accessories.glasses && (
              <primitive object={accessories.glasses.clone()} scale={0.18} position={[0, -0.05, 0.1]} />
            )}
            {config?.hair === 'marilyn' && accessories.hair && (
              <primitive object={accessories.hair.clone()} scale={0.2} position={[0, 0, 0]} />
            )}
          </group>
        )}
      </primitive>
    </group>
  );
}
