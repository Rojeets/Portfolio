'use client'

import { useRef, useMemo, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import * as THREE from 'three'
import { useActiveSection } from '@/hooks/useActiveSection'
import { sectionConfig, sectionIds, type SectionConfig, type SectionId } from '@/lib/sectionConfig'

const MAX_NODES = 10
const PARTICLE_COUNT = 400

const restingColor = new THREE.Color('#9a9fac')
const activeColor = new THREE.Color('#3d63ff')

interface SpatialSceneProps {
  activeSection: SectionId
}

function SpatialScene({ activeSection }: SpatialSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const coreMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const innerMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const nodesRef = useRef<THREE.Mesh[]>([])
  const particlesRef = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const scrollRef = useRef({ progress: 0, velocity: 0 })

  const targetRef = useRef<SectionConfig>(sectionConfig.hero)
  const currentRef = useRef({
    cameraDist: 6,
    rotSpeed: 0.8,
    cyanBias: 0.6,
    coreOpacity: 1,
    targetCoreOpacity: 1,
  })

  const nodeData = useMemo(() => {
    return Array.from({ length: MAX_NODES }, () => ({
      radius: 3.2 + Math.random() * 1.4,
      theta: Math.random() * Math.PI * 2,
      phi: Math.acos(Math.random() * 2 - 1),
      orbitSpeed: 0.001 + Math.random() * 0.002,
    }))
  }, [])

  const particlePositions = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30
    }
    return positions
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  // Update target when section changes
  useEffect(() => {
    targetRef.current = sectionConfig[activeSection] || sectionConfig.hero
    currentRef.current.targetCoreOpacity = targetRef.current.showCore ? 1 : 0
  }, [activeSection])

  // Check reduced motion preference
  const prefersReducedMotion = useRef(false)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mql.matches
    const handler = (e: MediaQueryListEvent) => { prefersReducedMotion.current = e.matches }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  useFrame((state) => {
    if (prefersReducedMotion.current) {
      state.camera.position.z = targetRef.current.cameraDist
      return
    }

    const target = targetRef.current
    const current = currentRef.current
    const lerpFactor = 0.03

    // Read Lenis scroll state for reactive effects
    const lenis = (window as any).__lenis
    if (lenis) {
      scrollRef.current.progress = lenis.progress || 0
      scrollRef.current.velocity = Math.abs(lenis.velocity || 0)
    }
    const scrollVelocity = scrollRef.current.velocity

    // Lerp camera distance (scroll-reactive: zoom slightly on fast scroll)
    const velocityBoost = Math.min(scrollVelocity * 0.15, 0.8)
    current.cameraDist += (target.cameraDist + velocityBoost - current.cameraDist) * lerpFactor
    state.camera.position.z = current.cameraDist

    // Subtle camera y-drift based on scroll progress
    state.camera.position.y = (scrollRef.current.progress - 0.5) * -0.6

    // Lerp rotation speed
    current.rotSpeed += (target.rotSpeed - current.rotSpeed) * lerpFactor

    // Lerp cyan bias (wireframe color)
    current.cyanBias += (target.cyanBias - current.cyanBias) * lerpFactor
    const wireColor = restingColor.clone().lerp(activeColor, current.cyanBias)
    wireColor.multiplyScalar(Math.min(1, 0.7 + current.cyanBias * 0.3))

    // Lerp core opacity for showCore crossfade
    current.coreOpacity += (current.targetCoreOpacity - current.coreOpacity) * 0.05

    // Apply to core wireframe
    if (coreRef.current && coreMatRef.current) {
      coreRef.current.rotation.y += current.rotSpeed * 0.0018
      coreRef.current.rotation.x += current.rotSpeed * 0.0008
      coreMatRef.current.color.copy(wireColor)
      coreMatRef.current.opacity = 0.55 * current.coreOpacity
      coreRef.current.visible = current.coreOpacity > 0.01
    }

    // Apply to inner wireframe (counter-rotating)
    if (innerRef.current && innerMatRef.current) {
      innerRef.current.rotation.y -= current.rotSpeed * 0.0025
      innerMatRef.current.color.copy(wireColor).multiplyScalar(1.3)
      innerMatRef.current.opacity = 0.8 * current.coreOpacity
      innerRef.current.visible = current.coreOpacity > 0.01
    }

    // Orbiting nodes
    const visibleNodes = target.nodeCount
    nodesRef.current.forEach((node, i) => {
      if (!node) return
      const data = nodeData[i]
      const isVisible = i < visibleNodes

      if (isVisible) {
        node.visible = true
        data.theta += data.orbitSpeed * current.rotSpeed
        node.position.set(
          data.radius * Math.sin(data.phi) * Math.cos(data.theta),
          data.radius * Math.sin(data.phi) * Math.sin(data.theta),
          data.radius * Math.cos(data.phi)
        )
        // Tint nodes with cyan bias
        const nodeColor = restingColor.clone().lerp(activeColor, current.cyanBias * 0.5)
        ;(node.material as THREE.MeshBasicMaterial).color.copy(nodeColor)
      } else {
        node.visible = false
      }
    })

    // Ambient particles — speed reacts to scroll velocity
    if (particlesRef.current) {
      const particleSpeed = 0.0002 + scrollVelocity * 0.0008
      particlesRef.current.rotation.y += particleSpeed
      particlesRef.current.rotation.x += particleSpeed * 0.3
    }

    // Mouse parallax
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouseRef.current.x * 0.4 - groupRef.current.rotation.y) * 0.03
      groupRef.current.rotation.x += (mouseRef.current.y * 0.25 - groupRef.current.rotation.x) * 0.03
    }
  })

  return (
    <>
      <group ref={groupRef}>
        {/* Outer wireframe icosahedron */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial
            ref={coreMatRef}
            color="#9a9fac"
            wireframe
            transparent
            opacity={0.55}
          />
        </mesh>

        {/* Inner wireframe icosahedron (counter-rotating) */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshBasicMaterial
            ref={innerMatRef}
            color="#9fb4ff"
            wireframe
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Orbiting nodes */}
        {nodeData.map((data, i) => (
          <mesh
            key={i}
            ref={(el) => { if (el) nodesRef.current[i] = el }}
            position={[
              data.radius * Math.sin(data.phi) * Math.cos(data.theta),
              data.radius * Math.sin(data.phi) * Math.sin(data.theta),
              data.radius * Math.cos(data.phi),
            ]}
          >
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#9a9fac" />
          </mesh>
        ))}
      </group>

      {/* Ambient particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#444a5a" size={0.03} />
      </points>
    </>
  )
}

// Dynamic import wrapper
function R3FCanvas({ activeSection }: { activeSection: SectionId }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <SpatialScene activeSection={activeSection} />
    </Canvas>
  )
}

// Main exported component — handles routing and section tracking
export default function SpatialCore() {
  const pathname = usePathname()
  const { activeSection } = useActiveSection()
  const [isMobile, setIsMobile] = useState(true)

  // Detail page detection
  const isDetailPage = /^\/(projects|blog)\/[^/]+/.test(pathname)

  // Standalone pages — no section IDs for useActiveSection, so 3D scene would default to hero config
  const isStandalonePage = ['/skills', '/blog', '/contact', '/projects'].includes(pathname)

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)
  }, [])

  // Don't render on detail pages
  if (isDetailPage) return null

  // Static gradient fallback — standalone pages and mobile
  const staticGradient = (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-[#0a0a12] to-[#050507]" />
    </div>
  )

  if (isMobile || isStandalonePage) return staticGradient

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <R3FCanvas activeSection={activeSection} />
      <div className="absolute inset-0 bg-[#050510]/60 pointer-events-none" />
    </div>
  )
}
