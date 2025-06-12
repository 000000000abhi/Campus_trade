"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text3D, MeshDistortMaterial, Stars, Sparkles } from "@react-three/drei"
import { Suspense, useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Users, Leaf, Zap, Shield, SparklesIcon } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/footer"

// Floating particles component
function FloatingParticles() {
  return <Sparkles count={100} scale={[20, 20, 20]} size={2} speed={0.5} opacity={0.6} color="#3b82f6" />
}

// Enhanced animated sphere with more complex animations
function EnhancedSphere({
  position,
  color,
  scale = 1,
}: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.5

      // Scale animation on hover
      const targetScale = hovered ? scale * 1.2 : scale
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale } as THREE.Vector3, 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[1 * scale, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

// Enhanced 3D text with glow effect
function GlowingText() {
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <Text3D
        ref={textRef}
        font="/fonts/helvetiker_regular.typeface.json"
        size={1.2}
        height={0.2}
        curveSegments={32}
        position={[-3.5, 1, 0]}
      >
        CampusTrade
        <meshStandardMaterial
          color="#ffffff"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </Text3D>
    </Float>
  )
}

// Enhanced 3D scene
function EnhancedScene() {
  return (
    <>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[0, 0, 10]} intensity={1.5} color="#06b6d4" />
      <spotLight position={[0, 20, 0]} intensity={2} angle={0.3} penumbra={1} color="#f59e0b" />

      {/* 3D Elements */}
      <GlowingText />
      <EnhancedSphere position={[4, 0, -2]} color="#3b82f6" scale={1.2} />
      <EnhancedSphere position={[-4, -1, -1]} color="#8b5cf6" scale={0.8} />
      <EnhancedSphere position={[2, 3, -3]} color="#06b6d4" scale={1} />
      <EnhancedSphere position={[-2, -2, -4]} color="#f59e0b" scale={0.6} />
      <EnhancedSphere position={[0, -3, -2]} color="#ef4444" scale={0.9} />

      {/* Particle effects */}
      <FloatingParticles />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Environment */}
      <Environment preset="night" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

// Animated background particles
function BackgroundParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; size: string }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      size: `${Math.random() * 4 + 2}px`,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      <BackgroundParticles />

      {/* Enhanced Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-2xl px-6 py-3 border border-white/20 dark:border-white/10">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-heading">
              CampusTrade
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="backdrop-blur-sm text-slate-900 dark:text-white hover:bg-white/20 dark:hover:bg-white/10 font-medium"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg font-medium"
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        {/* 3D Canvas Background */}
        <div className="absolute inset-0 opacity-30 dark:opacity-50">
          <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
            <Suspense fallback={null}>
              <EnhancedScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Hero Content with enhanced styling and better dark mode support */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="animate-float">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight font-heading">
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-2xl">
                Trade Smart,
              </span>
              <span className="block bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent drop-shadow-2xl">
                Live Green
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl lg:text-3xl text-slate-700 dark:text-slate-100 mb-12 max-w-4xl mx-auto leading-relaxed font-light drop-shadow-lg">
            The ultimate <span className="font-semibold text-blue-600 dark:text-blue-300">AI-powered</span> peer-to-peer
            marketplace for students. Buy, sell, and trade second-hand goods within your campus community.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl animate-glow transform hover:scale-105 transition-all duration-300 shadow-2xl font-medium"
              asChild
            >
              <Link href="/marketplace">
                <SparklesIcon className="mr-3 h-6 w-6" />
                Explore Marketplace
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-xl px-12 py-6 backdrop-blur-md bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/20 rounded-2xl hover:bg-white/30 dark:hover:bg-black/30 transform hover:scale-105 transition-all duration-300 text-slate-900 dark:text-white shadow-lg font-medium"
              asChild
            >
              <Link href="/sell">Start Selling</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-white/80 to-blue-50/80 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 font-heading">
            <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              Why Choose CampusTrade?
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/30 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-glow">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-800 dark:text-white font-heading">
                Campus Community
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-200 leading-relaxed">
                Trade exclusively with verified students from your university. Build trust within your campus community.
              </p>
            </div>

            <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 backdrop-blur-sm border border-green-200/50 dark:border-green-700/30 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-glow">
                <Leaf className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-800 dark:text-white font-heading">
                Eco-Friendly
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-200 leading-relaxed">
                Track your environmental impact and contribute to sustainability by giving items a second life.
              </p>
            </div>

            <div className="text-center p-10 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/30 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-glow">
                <Zap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-800 dark:text-white font-heading">
                AI-Powered
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-200 leading-relaxed">
                Smart item detection and pricing suggestions make listing your items quick and effortless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-slate-900 to-blue-900 dark:from-slate-950 dark:to-blue-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-20 font-heading">
            <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Join the Movement
            </span>
          </h2>
          <div className="grid md:grid-cols-4 gap-12">
            <div className="transform hover:scale-110 transition-all duration-300">
              <div className="text-5xl md:text-6xl font-bold text-blue-400 mb-4 drop-shadow-lg font-heading">10K+</div>
              <div className="text-xl text-blue-200">Active Students</div>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300">
              <div className="text-5xl md:text-6xl font-bold text-green-400 mb-4 drop-shadow-lg font-heading">50K+</div>
              <div className="text-xl text-green-200">Items Traded</div>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300">
              <div className="text-5xl md:text-6xl font-bold text-purple-400 mb-4 drop-shadow-lg font-heading">
                100+
              </div>
              <div className="text-xl text-purple-200">Universities</div>
            </div>
            <div className="transform hover:scale-110 transition-all duration-300">
              <div className="text-5xl md:text-6xl font-bold text-cyan-400 mb-4 drop-shadow-lg font-heading">2M kg</div>
              <div className="text-xl text-cyan-200">CO2 Saved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-lg font-heading">
            Ready to Start Trading?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed drop-shadow-lg">
            Join thousands of students already using CampusTrade to buy, sell, and save money while helping the
            environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-xl px-12 py-6 bg-white text-blue-600 hover:bg-blue-50 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl font-medium"
              asChild
            >
              <Link href="/signup">
                <Shield className="mr-3 h-6 w-6" />
                Create Your Account
                <ArrowRight className="ml-3 h-6 w-6" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-xl px-12 py-6 border-white/30 text-white hover:bg-white/10 rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-lg font-medium"
              asChild
            >
              <Link href="/marketplace">Browse Items</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
