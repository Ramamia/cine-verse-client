import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Html, Sparkles } from '@react-three/drei';
import '../styles/rooms.css';

const GENRES = [
  {
    id: 'romcom',
    name: 'ROM-COM',
    desc: 'Love, digital style. Find your cinematic match.',
    color: 'rgb(160, 31, 117)',
    modelPath: '/models/romcom_door2.glb',
    pos: [-5, 0, -8],
    scale: 2.6,
    rotY: -5.7,
    lightPos: [0, -1, 3],
    popupPos: [-5, 5.5, -5],
    actionText: 'CLICK TO ENTER THIS LOVEY DOVEY ROOM',
  },
  {
    id: 'horror',
    name: 'HORROR',
    desc: 'Face the glitches in the dark. Dare to enter?',
    color: '#433636',
    modelPath: '/models/horror_door2.glb',
    pos: [-3, 0, -6],
    scale: 2.6,
    rotY: 0,
    lightPos: [9, 1, 1.2],
    popupPos: [5, 5.5, 0],
    actionText: 'ENTER IF YOU DARE',
  },
  {
    id: 'scifi',
    name: 'SCI-FI',
    desc: 'Beyond the code. Explore the future of film.',
    color: '#00d4ff',
    modelPath: '/models/scifi_door2.glb',
    pos: [0, 0, -11],
    scale: 2.6,
    rotY: 5.9,
    lightPos: [15.5, 5, 7],
    popupPos: [15.5, 5.5, -4],
    actionText: 'CLICK TO EXPLORE SOMETHING SPOOKY',
    distanceFactor: 12,
  },
];

// Load each door model individually so they're cached by drei
function GenreDoor({ genre, onEnter }) {
  const { scene } = useGLTF(genre.modelPath);
  return (
    <group
      position={genre.pos}
      onClick={() => onEnter(genre.id)}
    >
      <pointLight
        position={genre.lightPos}
        intensity={300}
        color={genre.color}
        distance={15}
        decay={2}
      />
      <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.6}>
        <primitive object={scene.clone()} scale={genre.scale} rotation={[0, genre.rotY, 0]} />
      </Float>
    </group>
  );
}

export default function GrandRotunda({ enterGenrePortal }) {
  const [hoveredGenre, setHoveredGenre] = useState(null);
  const compassRef = useRef();

  const { scene: compass } = useGLTF('/models/compass_floor.glb');

  // Make the compass floor semi-transparent
  useEffect(() => {
    if (!compass) return;
    compass.traverse((child) => {
      if (child.isMesh) {
        child.material.transparent = true;
        child.material.opacity = 0.1;
      }
    });
  }, [compass]);

  // Slowly spin the compass
  useFrame((_, delta) => {
    if (compassRef.current) compassRef.current.rotation.y += 0.15 * delta;
  });

  return (
    <group>
      {/* Compass floor decoration */}
      <primitive
        ref={compassRef}
        object={compass}
        position={[4.8, 19, -5]}
        scale={30.2}
      />

      {/* Genre portal doors with hover popups */}
      {GENRES.map((g) => (
        <group
          key={g.id}
          onPointerOver={(e) => { e.stopPropagation(); setHoveredGenre(g); }}
          onPointerOut={() => setHoveredGenre(null)}
          onClick={() => enterGenrePortal(g.id)}
        >
          <GenreDoor genre={g} onEnter={enterGenrePortal} />

          {hoveredGenre?.id === g.id && (
            <Html
              distanceFactor={g.distanceFactor || 10}
              position={g.popupPos}
              center
              transform
              sprite={false}
            >
              <div
                style={{ '--genre-color': g.color }}
                className="rotunda-genre-popup"
                onClick={(e) => { e.stopPropagation(); enterGenrePortal(g.id); }}
              >
                <h3 className="rotunda-card-title">{g.name}</h3>
                <h4 className="rotunda-card-sub">{g.desc}</h4>
                <div style={{ height: '1px', background: 'var(--genre-color)', margin: '10px 0', opacity: 0.5 }} />
                <p className="rotunda-card-desc" style={{ color: 'var(--genre-color)' }}>
                  {g.actionText}
                </p>
              </div>
            </Html>
          )}
        </group>
      ))}

      <Sparkles count={200} scale={25} size={1.5} speed={0.6} color="#760707" />
    </group>
  );
}


