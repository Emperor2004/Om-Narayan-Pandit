"use client";

import { useRef, useEffect, useState, useCallback, memo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { skillCategories } from "@/data";

interface OptimizedAIBrainProps {
  onSkillSelect?: (skill: string) => void;
}

// Memoized AI brain component with performance optimizations
export const OptimizedAIBrain = memo(({ onSkillSelect }: OptimizedAIBrainProps) => {
  const brainRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<Map<string, THREE.Mesh>>(new Map());
  const connectionRefs = useRef<THREE.Line[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Flatten skills from categories
  const skillsData = skillCategories.flatMap(category => 
    category.skills.map(skill => ({
      name: skill,
      proficiency: 0.7 + Math.random() * 0.3,
      category: category.name,
      color: category.color === "accent" ? 0x6366f1 : 
             category.color === "cyan" ? 0x22d3ee : 
             category.color === "pink" ? 0xf472b6 : 0x6366f1,
    }))
  );

  // Optimized skill click handler
  const handleSkillClick = useCallback((skillName: string) => {
    setSelectedSkill(prev => prev === skillName ? null : skillName);
    onSkillSelect?.(skillName);
  }, [onSkillSelect]);

  // Optimized skill hover handler
  const handleSkillHover = useCallback((skillName: string | null) => {
    setHoveredSkill(skillName);
  }, []);

  // Create connections between related skills
  const createConnections = useCallback(() => {
    // Clear existing connections
    connectionRefs.current.forEach(line => {
      if (line.parent) {
        line.parent.remove(line);
      }
    });
    connectionRefs.current = [];

    if (!selectedSkill) return;

    // Find related skills
    const relatedSkills = skillsData.filter(skill => 
      skill.name !== selectedSkill && 
      (skill.category === skillsData.find(s => s.name === selectedSkill)?.category)
    );

    // Create connection lines
    relatedSkills.forEach(relatedSkill => {
      const selectedNode = nodeRefs.current.get(selectedSkill);
      const relatedNode = nodeRefs.current.get(relatedSkill.name);

      if (selectedNode && relatedNode) {
        const points = [];
        points.push(selectedNode.position);
        points.push(relatedNode.position);

        const geometry = new THREE.BufferGeometry();
      geometry.setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
          color: 0x6366f1, 
          opacity: 0.3, 
          transparent: true 
        });
        const line = new THREE.Line(geometry, material);
        
        if (brainRef.current) {
        brainRef.current.add(line);
      }
        connectionRefs.current.push(line);
      }
    });
  }, [selectedSkill, skillsData]);

  // Initialize skill nodes
  useEffect(() => {
    if (!brainRef.current) return;

    // Clear existing nodes
    nodeRefs.current.forEach(node => {
      if (node.parent) {
        node.parent.remove(node);
      }
    });
    nodeRefs.current.clear();

    // Create skill nodes on sphere
    skillsData.forEach((skill, index) => {
      const phi = Math.acos(-1 + (2 * index) / skillsData.length);
      const theta = Math.sqrt(skillsData.length * Math.PI) * phi;

      const x = Math.cos(theta) * Math.sin(phi) * 2;
      const y = Math.sin(theta) * Math.sin(phi) * 2;
      const z = Math.cos(phi) * 2;

      const geometry = new THREE.SphereGeometry(0.1, 16, 16);
      const material = new THREE.MeshStandardMaterial({ 
        color: skill.color,
        emissive: skill.color,
        emissiveIntensity: 0.2,
      });
      const node = new THREE.Mesh(geometry, material);
      
      node.position.set(x, y, z);
      node.castShadow = true;
      node.receiveShadow = true;
      
      // Add click handler
      const handleClick = () => {
        handleSkillClick(skill.name);
      };
      
      // Add hover handler
      const handleHover = () => {
        handleSkillHover(skill.name);
      };
      
      // Use Three.js event system properly
      node.userData = { 
        ...node.userData, 
        onClick: handleClick,
        onPointerEnter: handleHover,
        onPointerLeave: () => handleSkillHover(null)
      };
      
      if (brainRef.current) {
        brainRef.current.add(node);
      }
      nodeRefs.current.set(skill.name, node);
    });
  }, [skillsData, handleSkillClick, handleSkillHover]);

  // Update connections when skill selection changes
  useEffect(() => {
    createConnections();
  }, [createConnections]);

  // Optimized animation loop with requestAnimationFrame throttling
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);

  useFrame(({ clock }) => {
    if (!brainRef.current) return;

    const currentTime = clock.getElapsedTime();
    const deltaTime = currentTime - lastTimeRef.current;

    // Throttle animation updates to 60fps
    if (deltaTime < 1/60) return;
    
    lastTimeRef.current = currentTime;

    // Slow rotation of the brain
    brainRef.current.rotation.y = currentTime * 0.1;
    brainRef.current.rotation.x = Math.sin(currentTime * 0.1) * 0.1;

    // Enhanced node animations
    nodeRefs.current.forEach((node, skillName) => {
      const skill = skillsData.find((s) => s.name === skillName);
      if (!skill) return;
      
      // Base pulse based on proficiency
      const basePulse = Math.sin(currentTime * 2 + skill.proficiency) * 0.1 + 1;
      
      // Enhanced effects for selected/hovered skills
      let scaleMultiplier = 1;
      let emissiveIntensity = 0.5;
      
      if (selectedSkill === skillName) {
        scaleMultiplier = 1.5;
        emissiveIntensity = 1.0;
      } else if (hoveredSkill === skillName) {
        scaleMultiplier = 1.3;
        emissiveIntensity = 0.8;
      }
      
      const finalScale = basePulse * scaleMultiplier;
      node.scale.set(finalScale, finalScale, finalScale);
      
      // Update material properties dynamically
      if (node.material instanceof THREE.MeshStandardMaterial) {
        node.material.emissiveIntensity = emissiveIntensity;
      }
    });

    // Animate connections
    connectionRefs.current.forEach((line, index) => {
      if (line.material instanceof THREE.LineBasicMaterial) {
        const opacity = 0.3 + Math.sin(currentTime * 3 + index * 0.5) * 0.2;
        line.material.opacity = opacity;
      }
    });
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <group ref={brainRef}>
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        enableRotate={true}
        minDistance={2}
        maxDistance={5}
        dampingFactor={0.1}
      />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
    </group>
  );
});

OptimizedAIBrain.displayName = "OptimizedAIBrain";
