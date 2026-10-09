import React, { useRef, useState, useEffect, Suspense, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LakshyaTargetFallback } from './LakshyaTargetFallback';

interface TargetSceneProps {
  reducedMotion: boolean;
}

const TargetScene: React.FC<TargetSceneProps> = ({ reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      // Slow auto-rotation + mouse-driven tilt lerp
      groupRef.current.rotation.z += delta * 0.15;
      const targetRotX = pointerRef.current.y * 0.35 + 0.1;
      const targetRotY = pointerRef.current.x * 0.45;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);

      // Rings gently breathe with staggered sine wave
      const time = state.clock.getElapsedTime();
      ringRefs.current.forEach((mesh, index) => {
        if (mesh) {
          mesh.position.z = Math.sin(time * 2 + index * 0.6) * 0.08;
        }
      });
    }
  });

  // Ring configurations: radius, tube radius, color, isMetal
  const rings = [
    { radius: 2.1, tube: 0.11, color: '#1a1a1f', metalness: 0.95, roughness: 0.2 },
    { radius: 1.7, tube: 0.09, color: '#B600A8', metalness: 0.4, roughness: 0.35 },
    { radius: 1.3, tube: 0.08, color: '#1f2026', metalness: 0.95, roughness: 0.2 },
    { radius: 0.9, tube: 0.08, color: '#7621B0', metalness: 0.4, roughness: 0.35 },
    { radius: 0.5, tube: 0.07, color: '#BE4C00', metalness: 0.5, roughness: 0.3 },
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 5 Concentric Torus Rings */}
      {rings.map((r, i) => (
        <mesh
          key={i}
          ref={(el) => { ringRefs.current[i] = el; }}
        >
          <torusGeometry args={[r.radius, r.tube, 24, 64]} />
          <meshStandardMaterial
            color={r.color}
            metalness={r.metalness}
            roughness={r.roughness}
            emissive={r.color.startsWith('#1') ? '#000000' : r.color}
            emissiveIntensity={r.color.startsWith('#1') ? 0 : 0.3}
          />
        </mesh>
      ))}

      {/* Bullseye Core: Glowing Emissive Center Sphere / Disc */}
      <mesh position={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.26, 0.26, 0.12, 32]} />
        <meshStandardMaterial
          color="#BE4C00"
          emissive="#BE4C00"
          emissiveIntensity={1.8}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 0, 0.08]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2.5}
        />
      </mesh>

      {/* 3D Arrow Embedded in Bullseye at an Angle */}
      <group position={[0, 0, 0.05]} rotation={[0.4, -0.4, -0.75]}>
        {/* Shaft */}
        <mesh position={[0, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 2.2, 16]} />
          <meshStandardMaterial color="#D7E2EA" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Arrow Tip Cone */}
        <mesh position={[0, 0, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.09, 0.22, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Fins */}
        <mesh position={[0, 0.08, 1.9]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.015, 0.16, 0.3]} />
          <meshStandardMaterial color="#B600A8" emissive="#B600A8" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.08, 0, 1.9]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.015, 0.16, 0.3]} />
          <meshStandardMaterial color="#BE4C00" emissive="#BE4C00" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Ambient Lighting & Directional Accents */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-4, -3, 3]} intensity={3.5} color="#B600A8" />
      <pointLight position={[3, -4, 3]} intensity={3} color="#BE4C00" />
      <pointLight position={[0, 0, 2]} intensity={2} color="#38bdf8" />
    </group>
  );
};

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Canvas 3D WebGL context error caught, switching to fallback SVG:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const LakshyaTarget3D: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [useFallback, setUseFallback] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 640;
    const isLowEnd = typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 4) <= 2;

    setReducedMotion(prefersReducedMotion);

    if (prefersReducedMotion || isMobile || isLowEnd) {
      setUseFallback(true);
    }
  }, []);

  if (useFallback) {
    return <LakshyaTargetFallback className={className} />;
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Ambient Halo Glow behind Canvas */}
      <div className="absolute inset-4 bg-gradient-to-tr from-[#B600A8]/20 via-[#7621B0]/15 to-[#BE4C00]/20 rounded-full blur-3xl pointer-events-none" />

      <CanvasErrorBoundary fallback={<LakshyaTargetFallback className={className} />}>
        <Suspense fallback={<LakshyaTargetFallback className={className} />}>
          <Canvas
            camera={{ position: [0, 0, 5.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <TargetScene reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
};
