"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Project } from "@/types";

type ProjectVisualizationProps = {
  project: Project;
  onClick?: () => void;
};

export function ProjectShowcase({ project, onClick }: ProjectVisualizationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particleRefs = useRef<THREE.Points[]>([]);
  const timerRef = useRef<THREE.Timer>(new THREE.Timer());
  const [hovered, setHovered] = useState(false);

  // Create particle system for each project
  useEffect(() => {
    if (!groupRef.current) return;

    // Clear existing particles
    particleRefs.current.forEach(p => groupRef.current!.remove(p));
    particleRefs.current = [];

    // Create particle cloud around project
    const particleCount = 20;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 0.5 + Math.random() * 0.3;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Color based on project type
      let color = new THREE.Color(0x6366f1);
      if (project.type.includes("Computer Vision")) {
        color = new THREE.Color(0x22d3ee);
      } else if (project.type.includes("Reinforcement Learning")) {
        color = new THREE.Color(0xf472b6);
      } else if (project.type.includes("NLP")) {
        color = new THREE.Color(0xf472b6);
      } else if (project.type.includes("FinTech")) {
        color = new THREE.Color(0x10b981);
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particles.userData = { isParticles: true };
    groupRef.current.add(particles);
    particleRefs.current.push(particles);
  }, [project]);

  // Animation
  useFrame(() => {
    if (!groupRef.current) return;
    
    const elapsedTime = timerRef.current.getElapsed() / 1000;
    
    // Enhanced rotation with hover effect
    const rotationSpeed = hovered ? 0.2 : 0.1;
    groupRef.current.rotation.y = elapsedTime * rotationSpeed;
    
    // Gentle floating with more dynamic movement
    groupRef.current.position.z = Math.sin(elapsedTime * 0.5) * 0.1;
    groupRef.current.position.y = Math.sin(elapsedTime * 0.3) * 0.05;
    
    // Scale on hover with smooth transition
    const targetScale = hovered ? 1.15 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );

    // Animate particles
    particleRefs.current.forEach((particles, index) => {
      if (particles instanceof THREE.Points) {
        particles.rotation.y = elapsedTime * (0.5 + index * 0.1);
        particles.rotation.x = Math.sin(elapsedTime + index) * 0.1;
        
        // Pulse particles on hover
        const material = particles.material as THREE.PointsMaterial;
        if (material) {
          material.opacity = hovered ? 0.9 : 0.6;
          material.size = hovered ? 0.03 : 0.02;
        }
      }
    });
  });

  // Handle click
  const handleClick = () => {
    if (onClick) onClick();
  };

  // Handle pointer events
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  // Determine color based on project type
  let color = 0x6366f1; // default accent
  if (project.type.includes("Computer Vision")) {
    color = 0x22d3ee; // cyan
  } else if (project.type.includes("Reinforcement Learning")) {
    color = 0xf472b6; // pink
  } else if (project.type.includes("NLP")) {
    color = 0xf472b6; // pink
  } else if (project.type.includes("FinTech")) {
    color = 0x10b981; // emerald
  }

  return (
    <group 
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Project base - a floating platform */}
      <mesh>
        <cylinderGeometry args={[0.8, 0.1, 0.8, 32]} />
        <meshStandardMaterial color="#0d1117" opacity={0.6} transparent={true} />
      </mesh>
      
      {/* Project icon/shape based on type */}
      {project.type.includes("Computer Vision") && (
        <>
          {/* Camera-like shape for CV projects */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        </>
      )}
      
      {project.type.includes("Reinforcement Learning") && (
        <>
          {/* Brain-like shape for RL projects */}
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
          {/* Neural connections */}
          <mesh position={[0.15, 0.3, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[-0.15, 0.3, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[0, 0.35, 0.15]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
          </mesh>
        </>
      )}
      
      {project.type.includes("NLP") && (
        <>
          {/* Speech bubble/text shape for NLP projects */}
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <torusGeometry args={[0.15, 0.05, 16, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        </>
      )}
      
      {project.type.includes("FinTech") && (
        <>
          {/* Chart/graph shape for FinTech projects */}
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.4, 0.3, 0.05]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
          {/* Upward bars */}
          <mesh position={[-0.15, 0.4, 0]}>
            <boxGeometry args={[0.05, 0.2, 0.05]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[0.05, 0.25, 0.05]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.15, 0.35, 0]}>
            <boxGeometry args={[0.05, 0.15, 0.05]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        </>
      )}
      
      {/* Default shape for other projects */}
      {!project.type.includes("Computer Vision") && 
       !project.type.includes("Reinforcement Learning") && 
       !project.type.includes("NLP") && 
       !project.type.includes("FinTech") && (
        <mesh position={[0, 0.2, 0]}>
          <dodecahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
      )}
      
      {/* Project name as floating text (simplified as a floating plate) */}
      <mesh position={[0, -0.2, 0]}>
        <planeGeometry args={[0.6, 0.2]} />
        <meshStandardMaterial color="#0d1117" opacity={0.8} transparent={true} />
      </mesh>
      
      {/* Status indicator */}
      {project.status === "completed" && (
        <mesh position={[0.3, -0.2, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.5} />
        </mesh>
      )}
      {project.status === "ongoing" && (
        <mesh position={[0.3, -0.2, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
        </mesh>
      )}
      {project.status === "prototype" && (
        <mesh position={[0.3, -0.2, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5} />
        </mesh>
      )}
    </group>
  );
}
