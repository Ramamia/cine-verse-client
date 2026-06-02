import fs from 'fs';
import path from 'path';

const modelsDir = 'public/models';
const files = [
  'base_avatar.glb',
  'pink.glb',
  'green.glb'
];

function analyzeGLB(filename) {
  const filePath = path.join(modelsDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filename}`);
    return;
  }
  const buffer = fs.readFileSync(filePath);
  // Parse GLB header
  const magic = buffer.toString('utf8', 0, 4);
  const version = buffer.readUInt32LE(4);
  const length = buffer.readUInt32LE(8);

  if (magic !== 'glTF') {
    console.log(`${filename} is not a valid GLB`);
    return;
  }

  // Parse first chunk (JSON)
  const chunkLength = buffer.readUInt32LE(12);
  const chunkType = buffer.toString('utf8', 16, 20);
  if (chunkType !== 'JSON') {
    console.log(`${filename} chunk type is not JSON`);
    return;
  }

  const jsonStr = buffer.toString('utf8', 20, 20 + chunkLength);
  const gltf = JSON.parse(jsonStr);

  console.log(`\n==================================================`);
  console.log(`MODEL: ${filename} (Size: ${buffer.length} bytes)`);
  console.log(`==================================================`);
  
  if (!gltf.nodes) {
    console.log(`No nodes array found!`);
    return;
  }

  // Print all nodes with translation, scale, rotation or matrix
  gltf.nodes.forEach((node, index) => {
    console.log(`Node ${index}: name="${node.name}"`);
    if (node.children) console.log(`  children: ${JSON.stringify(node.children)}`);
    if (node.mesh !== undefined) console.log(`  mesh index: ${node.mesh} (Mesh name: "${gltf.meshes?.[node.mesh]?.name}")`);
    if (node.translation) console.log(`  translation: ${JSON.stringify(node.translation)}`);
    if (node.scale) console.log(`  scale: ${JSON.stringify(node.scale)}`);
    if (node.rotation) console.log(`  rotation: ${JSON.stringify(node.rotation)}`);
    if (node.matrix) console.log(`  matrix: ${JSON.stringify(node.matrix)}`);
  });

  if (gltf.meshes) {
    console.log(`\nMeshes:`);
    gltf.meshes.forEach((mesh, index) => {
      console.log(`  Mesh ${index}: "${mesh.name}"`);
      mesh.primitives.forEach((prim, pIndex) => {
        console.log(`    Prim ${pIndex}: attributes=${JSON.stringify(Object.keys(prim.attributes))} indices=${prim.indices} material=${prim.material}`);
      });
    });
  }

  if (gltf.accessors && gltf.meshes) {
    console.log(`\nAccessors for meshes:`);
    gltf.meshes.forEach((mesh) => {
      mesh.primitives.forEach((prim) => {
        const posAccessorIdx = prim.attributes.POSITION;
        if (posAccessorIdx !== undefined) {
          const acc = gltf.accessors[posAccessorIdx];
          console.log(`    POSITION bounds for mesh "${mesh.name}": min=${JSON.stringify(acc.min)} max=${JSON.stringify(acc.max)} count=${acc.count}`);
        }
      });
    });
  }
}

files.forEach(analyzeGLB);
