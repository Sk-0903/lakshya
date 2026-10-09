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
      // Normalize pointer coordinates safely bounded within [-1, 1]
      const nx = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, -(e.clientY / window.innerHeight) * 2 + 1));
      pointerRef.current.x = nx;
      pointerRef.current.y = ny;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      // Safe clamped delta so frame drops or tab switching can NEVER cause explosion
      const safeDelta = Math.min(0.05, Math.max(0.001, delta));
      const lerpFactor = Math.min(0.1, safeDelta * 3);

      // Gentle, slow continuous rotation on Z axis
      groupRef.current.rotation.z += safeDelta * 0.2;

      // Subtle, strictly clamped tilt based on cursor
      const targetRotX = Math.max(-0.25, Math.min(0.25, pointerRef.current.y * 0.25));
      const targetRotY = Math.max(-0.25, Math.min(0.25, pointerRef.current.x * 0.3));

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, lerpFactor);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, lerpFactor);

      // Rings gently breathe along Z with very small amplitude (stay strictly near z=0)
      const time = state.clock.getElapsedTime();
      ringRefs.current.forEach((mesh, index) => {
        if (mesh) {
          mesh.position.z = Math.sin(time * 1.8 + index * 0.5) * 0.04;
        }
      });
    }
  });

  // Balanced ring radiuses scaled to stay safely inside camera frustum (max radius 1.85)
  const rings = [
    { radius: 1.85, tube: 0.06, color: '#1a1a24', metalness: 0.95, roughness: 0.2 },
    { radius: 1.5, tube: 0.05, color: '#B600A8', metalness: 0.5, roughness: 0.3 },
    { radius: 1.15, tube: 0.045, color: '#38bdf8', metalness: 0.6, roughness: 0.25 },
    { radius: 0.8, tube: 0.045, color: '#7621B0', metalness: 0.5, roughness: 0.3 },
    { radius: 0.45, tube: 0.04, color: '#BE4C00', metalness: 0.6, roughness: 0.25 },
  ];

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 5 Concentric Torus Rings (Flat & strictly bounded on Z) */}
      {rings.map((r, i) => (
        <mesh
          key={i}
          ref={(el) => { ringRefs.current[i] = el; }}
        >
          <torusGeometry args={[r.radius, r.tube, 20, 64]} />
          <meshStandardMaterial
            color={r.color}
            metalness={r.metalness}
            roughness={r.roughness}
            emissive={r.color.startsWith('#1') ? '#000000' : r.color}
            emissiveIntensity={r.color.startsWith('#1') ? 0 : 0.4}
          />
        </mesh>
      ))}

      {/* Bullseye Core: Glowing Emissive Center Disc */}
      <mesh position={[0, 0, 0.02]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 32]} />
        <meshStandardMaterial
          color="#BE4C00"
          emissive="#BE4C00"
          emissiveIntensity={1.5}
          roughness={0.2}
        />
      </mesh>

      {/* Center White Hot Bullseye Core */}
      <mesh position={[0, 0, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* 4 Reticle Crosshair Ticks on Outer Rim (Strictly flat at z = 0.02) */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
        <mesh
          key={idx}
          position={[
            Math.cos(angle) * 1.85,
            Math.sin(angle) * 1.85,
            0.02,
          ]}
          rotation={[0, 0, angle]}
        >
          <boxGeometry args={[0.18, 0.025, 0.02]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}

      {/* Ambient Lighting & Controlled Accents */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 4, 5]} intensity={2.0} color="#ffffff" />
      <pointLight position={[-3, -2, 3]} intensity={2.5} color="#B600A8" />
      <pointLight position={[3, -2, 3]} intensity={2.5} color="#38bdf8" />
      <pointLight position={[0, 0, 3]} intensity={1.8} color="#BE4C00" />
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
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      {/* Ambient Halo Glow behind Canvas */}
      <div className="absolute inset-4 bg-gradient-to-tr from-[#B600A8]/20 via-[#7621B0]/15 to-[#BE4C00]/20 rounded-full blur-2xl pointer-events-none" />

      <CanvasErrorBoundary fallback={<LakshyaTargetFallback className={className} />}>
        <Suspense fallback={<LakshyaTargetFallback className={className} />}>
          <Canvas
            camera={{ position: [0, 0, 6.0], fov: 42, near: 0.1, far: 50 }}
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
            className="w-full h-full pointer-events-none"
          >
            <TargetScene reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>
    </div>
  );
};
