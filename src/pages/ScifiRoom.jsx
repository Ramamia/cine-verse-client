import React, { useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture, Html, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useKeyboard } from '../hooks/useKeyboard';

export const SCIFI_MOVIES = [
  {
    id: 'scifi-black-moon',
    title: 'Black Moon Rising',
    slogan: 'Meet Sam Quint… Stealing from him is the biggest mistake you can make.',
    description: 'An FBI free-lancer stashes a stolen Las Vegas-crime tape in a high-tech car stolen by someone else.',
    year: '1986',
    director: 'Harley Cokeliss',
    actors: 'Tommy Lee Jones, Linda Hamilton, Robert Vaughn, Richard Jaeckel',
    poster: '/images/scifiMovies/Black moon rising.png',
    side: 'left',
    z: 10
  },
  {
    id: 'scifi-hail-mary',
    title: 'Project Hail Mary',
    slogan: 'Believe in the Hail Mary.',
    description: 'Science teacher Ryland Grace wakes up on a spaceship light years from home with no recollection of who he is. He must use his scientific knowledge to save Earth from extinction with the help of an unexpected friend.',
    year: '2026',
    director: 'Phil Lord, Christopher Miller',
    actors: 'Ryan Gosling, Sandra Hüller, James Ortiz, Lionel Boyce',
    poster: '/images/scifiMovies/Project hail mary.png',
    side: 'right',
    z: 10
  },
  {
    id: 'scifi-avatar',
    title: 'Avatar',
    slogan: 'Enter the world of Pandora.',
    description: 'In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.',
    year: '2009',
    director: 'James Cameron',
    actors: 'Sam Worthington, Zoe Saldaña, Sigourney Weaver, Stephen Lang',
    poster: '/images/scifiMovies/Avatar.png',
    side: 'left',
    z: 3
  },
  {
    id: 'scifi-blade-runner',
    title: 'Blade Runner 2049',
    slogan: 'The key to the future is finally unearthed.',
    description: 'Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what’s left of society into chaos.',
    year: '2017',
    director: 'Denis Villeneuve',
    actors: 'Ryan Gosling, Harrison Ford, Ana de Armas, Dave Bautista',
    poster: '/images/scifiMovies/Blade runner 2049.png',
    side: 'right',
    z: 3
  },
  {
    id: 'scifi-lucy',
    title: 'Lucy',
    slogan: 'The average person uses 10% of their brain capacity. Imagine what she could do with 100%.',
    description: 'A woman, accidentally caught in a dark deal, turns the tables on her captors and transforms into a merciless warrior evolved beyond human logic.',
    year: '2014',
    director: 'Luc Besson',
    actors: 'Scarlett Johansson, Morgan Freeman, Choi Min-sik, Amr Waked',
    poster: '/images/scifiMovies/Lucy.png',
    side: 'left',
    z: -4
  },
  {
    id: 'scifi-28-days',
    title: '28 Days Later',
    slogan: 'The days are numbered.',
    description: 'Twenty-eight days after a killer virus is accidentally unleashed from a British research facility, a small group of London survivors are caught in a desperate struggle to protect themselves from the infected.',
    year: '2002',
    director: 'Danny Boyle',
    actors: 'Cillian Murphy, Naomie Harris, Brendan Gleeson, Megan Burns',
    poster: '/images/scifiMovies/28 days later.png',
    side: 'right',
    z: -4
  },
  {
    id: 'scifi-dune',
    title: 'Dune',
    slogan: 'It begins.',
    description: 'Paul Atreides, a brilliant and gifted young man, must travel to the most dangerous planet in the universe to ensure the future of his family and his people as malevolent forces explode into conflict.',
    year: '2021',
    director: 'Denis Villeneuve',
    actors: 'Timothée Chalamet, Rebecca Ferguson, Oscar Isaac, Jason Momoa',
    poster: '/images/scifiMovies/Dune.png',
    side: 'left',
    z: -11
  },
  {
    id: 'scifi-world-war-z',
    title: 'World War Z',
    slogan: 'There will come a day when the world we know will end.',
    description: 'Former UN investigator Gerry Lane must travel the world in a race against time to stop a pandemic that is toppling armies and governments and threatening to decimate humanity itself.',
    year: '2013',
    director: 'Marc Forster',
    actors: 'Brad Pitt, Mireille Enos, Daniella Kertesz, James Badge Dale',
    poster: '/images/scifiMovies/World war Z.png',
    side: 'right',
    z: -11
  },
  {
    id: 'scifi-guardians',
    title: 'Guardians of the Galaxy',
    slogan: 'When things get bad, they’ll do their worst.',
    description: 'Light years from Earth, Peter Quill finds himself the prime target of a manhunt after discovering an orb wanted by Ronan the Accuser, leading him to form an alliance with a group of extraterrestrial misfits.',
    year: '2014',
    director: 'James Gunn',
    actors: 'Chris Pratt, Zoe Saldaña, Dave Bautista, Vin Diesel',
    poster: '/images/scifiMovies/Guardians of the galaxy.png',
    side: 'left',
    z: -18
  },
  {
    id: 'scifi-inception',
    title: 'Inception',
    slogan: 'Your mind is the scene of the crime.',
    description: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious, is offered a chance to regain his old life by performing the "impossible" task of implantation.',
    year: '2010',
    director: 'Christopher Nolan',
    actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ken Watanabe, Tom Hardy',
    poster: '/images/scifiMovies/Inception.png',
    side: 'right',
    z: -18
  },
  {
    id: 'scifi-matrix',
    title: 'The Matrix',
    slogan: 'Believe the unbelievable.',
    description: 'A computer hacker joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth and keep humanity trapped in a simulated reality.',
    year: '1999',
    director: 'Lana Wachowski, Lilly Wachowski',
    actors: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving',
    poster: '/images/scifiMovies/The matrix.png',
    side: 'left',
    z: -25
  },
  {
    id: 'scifi-interstellar',
    title: 'Interstellar',
    slogan: 'Mankind was born on Earth. It was never meant to die here.',
    description: 'A group of explorers make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage to find a new home for humanity.',
    year: '2014',
    director: 'Christopher Nolan',
    actors: 'Matthew McConaughey, Anne Hathaway, Michael Caine, Jessica Chastain',
    poster: '/images/scifiMovies/Interstellar.png',
    side: 'right',
    z: -25
  }
];

function MoviePosterMesh({ movie, texture, index, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const isLeft = movie.side === 'left';
  
  const posX = isLeft ? -4.92 : 4.92;
  const posY = 1.8;
  const rotY = isLeft ? Math.PI / 2 : -Math.PI / 2;
  
  const lightRef = React.useRef();
  useFrame((state) => {
    if (lightRef.current) {
      // Sci-fi high-tech flickering
      const baseIntensity = hovered ? 22 : 12;
      const flicker = Math.random() > 0.95 ? -6 : 0;
      lightRef.current.intensity = Math.max(0, baseIntensity + flicker);
    }
  });

  return (
    <group position={[posX, posY, movie.z]}>
      {/* Sci-fi yellow poster light */}
      <pointLight 
        ref={lightRef}
        position={[isLeft ? 0.8 : -0.8, 1.4, 0]} 
        intensity={12} 
        distance={6} 
        color="#ffd700"
        decay={1.8}
      />

      <pointLight 
        position={[isLeft ? 0.3 : -0.3, 1.8, 0]} 
        intensity={4} 
        distance={5} 
        color="#ffffff"
        decay={2.5}
      />

      <mesh
        rotation={[0, rotY, 0]}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(movie)}
      >
        <boxGeometry args={[1.15, 1.65, 0.08]} />
        <meshStandardMaterial 
          color="#031520" 
          roughness={0.6} 
          metalness={0.8}
          emissive={hovered ? '#ffd700' : '#000000'}
          emissiveIntensity={hovered ? 0.8 : 0}
        />
      </mesh>

      <mesh position={[isLeft ? 0.045 : -0.045, 0, 0]} rotation={[0, rotY, 0]}>
        <planeGeometry args={[1.05, 1.55]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.2} 
          metalness={0.4} 
        />
      </mesh>

      {hovered && (
        <Html distanceFactor={6} position={[0, -1.0, 0]} center transform rotation={[0, rotY, 0]}>
          <div style={{
            background: 'rgba(255, 215, 0, 0.9)',
            color: '#000',
            fontFamily: 'monospace',
            fontSize: '11px',
            padding: '4px 10px',
            borderRadius: '2px',
            border: '1px solid #fff',
            whiteSpace: 'nowrap',
            letterSpacing: '1px',
            boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)',
            pointerEvents: 'none',
            textTransform: 'uppercase',
            fontWeight: 'bold'
          }}>
            SYSTEM: ACCESS DATA
          </div>
        </Html>
      )}
    </group>
  );
}

export default function ScifiRoom({ onSelectMovie }) {
  const { camera } = useThree();
  const { forward, backward } = useKeyboard();
  const [showEndSign, setShowEndSign] = useState(false);

  const textures = useTexture(SCIFI_MOVIES.map(m => m.poster));

  useFrame((state, delta) => {
    const speed = 6;
    
    if (forward)  camera.position.z -= speed * delta;
    if (backward) camera.position.z += speed * delta;

    camera.position.z = Math.max(-25, Math.min(12.5, camera.position.z));
    camera.position.x = 0;
    camera.position.y = 2;

    camera.lookAt(0, 2, camera.position.z - 10);

    setShowEndSign(camera.position.z < -20);
  });

  return (
    <group>
      {/* Dark blue/green ambient */}
      <ambientLight intensity={0.08} color="#102a50" />

      {/* Ceiling lights - pale green/blue */}
      {[-25, -15, -5, 5, 12.5].map((zVal) => (
        <pointLight
          key={zVal}
          position={[0, 4.4, zVal]}
          intensity={6}
          distance={12}
          color="#1e5c43"
          decay={2}
        />
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 4.5, -8.75]}>
        <planeGeometry args={[10, 43.5]} />
        <meshStandardMaterial color="#0a1c36" roughness={0.8} metalness={0.5} side={THREE.DoubleSide} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.95, -8.75]}>
        <planeGeometry args={[10, 43.5]} />
        <meshStandardMaterial color="#061226" roughness={0.6} metalness={0.7} />
      </mesh>

      <mesh position={[-5, 1.8, -8.75]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[43.5, 6]} />
        <meshStandardMaterial color="#0c203f" roughness={0.7} metalness={0.4} />
      </mesh>

      <mesh position={[5, 1.8, -8.75]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[43.5, 6]} />
        <meshStandardMaterial color="#0c203f" roughness={0.7} metalness={0.4} />
      </mesh>

      <mesh position={[0, 1.8, -30.5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#08162e" roughness={0.9} metalness={0.2} />
      </mesh>

      {showEndSign && (
        <Html position={[0, 2.0, -30.4]} center transform zIndexRange={[0, 0]}>
          <div style={{
            textAlign: 'center',
            color: '#00ff41',
            fontFamily: '"Courier New", Courier, monospace',
            textShadow: '0 0 10px #00ff41, 0 0 20px #00aa00',
            userSelect: 'none',
            pointerEvents: 'none',
            background: 'rgba(0,20,0,0.8)',
            padding: '20px',
            border: '2px solid #00ff41'
          }}>
            <h1 style={{ fontSize: '32px', margin: '0 0 10px 0', letterSpacing: '6px', fontWeight: 'bold' }}>SYSTEM WARNING</h1>
            <p style={{
              fontSize: '12px',
              color: '#00cc33',
              letterSpacing: '2px',
              margin: 0,
              maxWidth: '300px',
              lineHeight: '1.5'
            }}>
              RESTRICTED AREA.
              <br/>
              NO FURTHER DATA AVAILABLE.
              <br/>
              TURN BACK IMMEDIATELY.
            </p>
          </div>
        </Html>
      )}

      <mesh position={[0, 1.8, 13.0]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[10, 6]} />
        <meshStandardMaterial color="#0a1c36" roughness={1.0} />
      </mesh>

      {SCIFI_MOVIES.map((movie, index) => (
        <MoviePosterMesh
          key={movie.id}
          movie={movie}
          texture={textures[index]}
          index={index}
          onSelect={onSelectMovie}
        />
      ))}

      {/* Green and blue sparks */}
      <Sparkles count={150} scale={15} size={1.2} speed={0.8} color="#00ff41" />
      <Sparkles count={100} scale={15} size={1.0} speed={0.5} color="#00aaff" />
    </group>
  );
}
