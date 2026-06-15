export const MODEL_OFFSETS = {
  '/models/base_avatar.glb': {
    position: [-0.2, 1.5, 8.3],
    scale: 2.5,
    rotation: [0, 0, 0]
  },
  '/models/pink.glb': {
    position: [-7.28, 0.4, -4.9],
    scale: 2.5,
    rotation: [0, 0, 0]
  },
  '/models/green.glb': {
    position: [-7.28, 0.4, -4.9],
    scale: 2.5,
    rotation: [0, 0, 0]
  },
  '/models/cowboy pink.glb': {
    position:[-6.54, 0.32, -0.5],
    scale: 0.5,
    rotation: [0, 0, 0]
  },
  '/models/cowboy green.glb': {
    position: [-2.78, 0.62, -0.38],
    scale: 0.5,
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

export function getModelPath(config) {
  let modelPath = '/models/base_avatar.glb';
  if (config?.skin === 'pink') {
    if (config.acc === 'cowboy') {
      modelPath = '/models/cowboy pink.glb';
    } else if (config.acc === 'glasses') {
      modelPath = '/models/glasses pink.glb';
    } else if (config.hair === 'marilyn') {
      modelPath = '/models/monroe hair pink.glb';
    } else {
      modelPath = '/models/pink.glb';
    }
  } else if (config?.skin === 'green') {
    if (config.acc === 'cowboy') {
      modelPath = '/models/cowboy green.glb';
    } else if (config.acc === 'glasses') {
      modelPath = '/models/glasses green.glb';
    } else if (config.hair === 'marilyn') {
      modelPath = '/models/monroe hair green.glb';
    } else {
      modelPath = '/models/green.glb';
    }
  }
  return modelPath;
}
