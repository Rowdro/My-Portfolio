"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ── Central sculpture: chrome torus knot, pointer-reactive ──────────── */
function Sculpture() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    // idle rotation
    const m = inner.current;
    if (m) {
      m.rotation.y += delta * 0.18;
      m.rotation.x = Math.sin(t * 0.25) * 0.18;
    }

    // pointer-reactive tilt (damped)
    const px = state.pointer.x;
    const py = state.pointer.y;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, px * 0.45, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -py * 0.3, 0.05);

    // subtle breathing scale
    const s = 1 + Math.sin(t * 0.8) * 0.02;
    g.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.9}>
        <mesh ref={inner} castShadow>
          <torusKnotGeometry args={[1.05, 0.34, 200, 32]} />
          <meshStandardMaterial
            color="#e8e6df"
            metalness={1}
            roughness={0.12}
            envMapIntensity={1.15}
          />
        </mesh>
        {/* signal ring */}
        <mesh rotation={[Math.PI / 2.4, 0.3, 0]}>
          <torusGeometry args={[1.95, 0.02, 16, 128]} />
          <meshBasicMaterial color="#cdfb4e" toneMapped={false} />
        </mesh>
        {/* secondary thin ring */}
        <mesh rotation={[Math.PI / 1.7, -0.5, 0.2]}>
          <torusGeometry args={[2.35, 0.008, 16, 128]} />
          <meshBasicMaterial color="#37e2a2" toneMapped={false} transparent opacity={0.55} />
        </mesh>
      </Float>
    </group>
  );
}

/* ── Floating shards around the sculpture ────────────────────────────── */
function Shards() {
  const shards = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        position: [
          Math.cos(i * 1.7) * (2.6 + (i % 3) * 0.5),
          Math.sin(i * 2.3) * 1.4,
          Math.sin(i * 1.1) * 1.8 - 0.5,
        ] as [number, number, number],
        scale: 0.08 + (i % 3) * 0.05,
        speed: 0.4 + (i % 4) * 0.25,
      })),
    []
  );
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.06;
    group.current.children.forEach((c, i) => {
      c.rotation.x += delta * (0.3 + i * 0.05);
      c.rotation.z += delta * (0.2 + i * 0.03);
    });
    // gentle pointer parallax
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      state.pointer.x * 0.25,
      0.04
    );
  });

  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.position} scale={s.scale}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#cdfb4e" : "#2a2a2e"}
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Full scene ──────────────────────────────────────────────────────── */
export function HeroScene({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop={paused ? "never" : "always"}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <spotLight position={[6, 6, 8]} intensity={40} angle={0.5} penumbra={1} color="#f0eee6" />
        <pointLight position={[-6, -3, -4]} intensity={12} color="#cdfb4e" />

        <Sculpture />
        <Shards />
        <Sparkles count={70} scale={[11, 7, 6]} size={2.2} speed={0.35} color="#cdfb4e" opacity={0.55} />

        {/* Local lightformer environment — no external HDR fetch */}
        <Environment resolution={256}>
          <group>
            <Lightformer form="rect" intensity={4} position={[0, 5, -6]} scale={[10, 6, 1]} color="#f0eee6" />
            <Lightformer form="rect" intensity={3} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[7, 2.5, 1]} color="#cdfb4e" />
            <Lightformer form="rect" intensity={2} position={[6, -1, 1]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} color="#37e2a2" />
            <Lightformer form="circle" intensity={2.4} position={[0, -5, 2]} scale={4} color="#ffffff" />
          </group>
        </Environment>
      </Suspense>
    </Canvas>
  );
}
