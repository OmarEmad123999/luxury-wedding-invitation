import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshDistortMaterial, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

/* ── The ring geometry ─────────────────────────────────────── */
function RingMesh({ mouseX = 0, mouseY = 0 }) {
  const ringRef   = useRef()
  const innerRef  = useRef()
  const stoneRef  = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Slow auto-rotation + gentle mouse tilt
    if (ringRef.current) {
      ringRef.current.rotation.y  = t * 0.25 + mouseX * 0.4
      ringRef.current.rotation.x  = Math.sin(t * 0.15) * 0.15 + mouseY * 0.25
      ringRef.current.rotation.z  = Math.sin(t * 0.1)  * 0.05
    }

    // Subtle gem pulse
    if (stoneRef.current) {
      stoneRef.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.02)
    }
  })

  // Outer band
  const torusGeo = useMemo(() => new THREE.TorusGeometry(1.1, 0.22, 64, 128), [])
  // Inner highlight band
  const innerGeo = useMemo(() => new THREE.TorusGeometry(1.1, 0.08, 32, 128), [])
  // Diamond stone
  const stoneGeo = useMemo(() => new THREE.OctahedronGeometry(0.22, 2), [])
  // Stone mount
  const mountGeo = useMemo(() => new THREE.CylinderGeometry(0.14, 0.18, 0.12, 6), [])

  const goldMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c9a96e'),
    metalness: 0.96,
    roughness: 0.08,
    envMapIntensity: 2.2,
  }), [])

  const innerMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#f0d9a8'),
    metalness: 1,
    roughness: 0.02,
    envMapIntensity: 3,
  }), [])

  const stoneMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff'),
    metalness: 0,
    roughness: 0,
    transmission: 0.95,
    thickness: 0.5,
    ior: 2.4,
    reflectivity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    envMapIntensity: 4,
  }), [])

  return (
    <group ref={ringRef}>
      {/* Main band */}
      <mesh geometry={torusGeo} material={goldMat} />
      {/* Highlight inner rim */}
      <mesh ref={innerRef} geometry={innerGeo} material={innerMat} />
      {/* Stone mount */}
      <mesh geometry={mountGeo} material={goldMat} position={[0, 1.1, 0]} />
      {/* Diamond */}
      <mesh ref={stoneRef} geometry={stoneGeo} material={stoneMat} position={[0, 1.36, 0]} />
    </group>
  )
}

/* ── Scene wrapper ─────────────────────────────────────────── */
function Scene({ mouseX, mouseY }) {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[3, 4, 3]}
        intensity={1.8}
        color="#fff8e8"
        castShadow
      />
      <pointLight position={[-3, 2, -2]} intensity={0.8} color="#c9a96e" />
      <pointLight position={[0, -3, 2]} intensity={0.4} color="#8a6a3a" />
      <pointLight position={[2, 1, 4]} intensity={0.6} color="#ffffff" />

      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.3}>
        <RingMesh mouseX={mouseX} mouseY={mouseY} />
      </Float>

      <Sparkles
        count={50}
        scale={5}
        size={0.8}
        speed={0.15}
        opacity={0.4}
        color="#c9a96e"
      />

      <Environment preset="studio" />
    </>
  )
}

/* ── Exported component ───────────────────────────────────── */
export default function WeddingRing3D({ mouseX = 0, mouseY = 0, className = '' }) {
  return (
    <div className={`${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 38 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <Suspense fallback={null}>
          <Scene mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
      </Canvas>
    </div>
  )
}
