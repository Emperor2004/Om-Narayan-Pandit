"use client";

import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState, useCallback } from "react";
import { skillCategories } from "@/data";

type Skill = {
  name: string;
  category: string;
  proficiency: number; // 0 to 1
};

// Extract all skills from skillCategories with a proficiency score
// For now, we'll assign a default proficiency, but this could be enhanced with actual data
const extractSkills = (): Skill[] => {
  const skills: Skill[] = [];
  skillCategories.forEach((category) => {
    category.skills.forEach((skillName) => {
      // Assign a proficiency based on some logic - for now using a fixed value per category
      // In a real implementation, this could come from proficiency data
      let proficiency = 0.7; // default
      switch (category.name) {
        case "ML / DL Frameworks":
          proficiency = 0.85;
          break;
        case "Computer Vision & NLP":
          proficiency = 0.8;
          break;
        case "Reinforcement Learning":
          proficiency = 0.75;
          break;
        case "Languages & Tools":
          proficiency = 0.9;
          break;
        case "Data & Visualization":
          proficiency = 0.8;
          break;
        case "Research & Gen AI":
          proficiency = 0.7;
          break;
      }
      skills.push({
        name: skillName,
        category: category.name,
        proficiency,
      });
    });
  });
  return skills;
};

const skillsData: Skill[] = extractSkills();

// Function to generate points on a sphere
function pointsOnSphere(count: number, radius: number) {
  const points = [];
  const increment = Math.PI * (3 - Math.sqrt(5)); // Golden angle
  const offset = 2 / count;

  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - Math.pow(y, 2));
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

export function AIBrain() {
  const brainRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<Map<string, THREE.Mesh>>(new Map());
  const connectionRefs = useRef<THREE.Line[]>([]);
  const timerRef = useRef<THREE.Timer>(new THREE.Timer());
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { camera, raycaster, mouse } = useThree();

  // Generate points for skills on a sphere
  const pointsData = useRef<THREE.Vector3[]>(pointsOnSphere(skillsData.length, 1.5)); // radius 1.5 for the brain

  // Handle skill node click
  const handleSkillClick = useCallback((skillName: string) => {
    setSelectedSkill(prev => prev === skillName ? null : skillName);
  }, []);

  // Handle skill node hover
  const handleSkillHover = useCallback((skillName: string | null) => {
    setHoveredSkill(skillName);
  }, []);

  // Create connections between related skills
  const createConnections = useCallback(() => {
    if (!brainRef.current) return;
    
    // Clear existing connections
    connectionRefs.current.forEach(line => {
      if (brainRef.current) brainRef.current.remove(line);
    });
    connectionRefs.current = [];

    if (!selectedSkill) return;

    const selectedSkillData = skillsData.find(s => s.name === selectedSkill);
    if (!selectedSkillData) return;

    // Find related skills (same category or high proficiency)
    const relatedSkills = skillsData.filter(skill => 
      skill.name !== selectedSkill && (
        skill.category === selectedSkillData.category || 
        skill.proficiency > 0.8
      )
    ).slice(0, 3); // Limit connections

    relatedSkills.forEach(relatedSkill => {
      const selectedNode = nodeRefs.current.get(selectedSkill);
      const relatedNode = nodeRefs.current.get(relatedSkill.name);
      
      if (!selectedNode || !relatedNode || !brainRef.current) return;

      const points = [
        selectedNode.position,
        relatedNode.position
      ];

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(geometry, material);
      
      brainRef.current.add(line);
      connectionRefs.current.push(line);
    });
  }, [selectedSkill, skillsData]);

  // We'll create a group for the brain and add nodes
  useEffect(() => {
    if (!brainRef.current) return;

    // Clear existing nodes
    brainRef.current.clear();
    nodeRefs.current.clear();

    // Add a sphere for the brain (just for visualization, we can make it subtle)
    const brainGeometry = new THREE.SphereGeometry(1.4, 32, 32);
    const brainMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d1117, // dark background color
      transparent: true,
      opacity: 0.1,
    });
    const brainMesh = new THREE.Mesh(brainGeometry, brainMaterial);
    brainRef.current.add(brainMesh);

    // Add skill nodes
    skillsData.forEach((skill, index) => {
      const point = pointsData.current[index];
      if (!point || !brainRef.current) return;

      // Create a sphere for the skill
      const geometry = new THREE.SphereGeometry(0.05 + skill.proficiency * 0.1, 16, 16);
      // Color based on category
      let color = 0x6366f1; // default accent
      switch (skill.category) {
        case "ML / DL Frameworks":
          color = 0x6366f1; // indigo
          break;
        case "Computer Vision & NLP":
          color = 0x22d3ee; // cyan
          break;
        case "Reinforcement Learning":
          color = 0xf472b6; // pink
          break;
        case "Languages & Tools":
          color = 0x10b981; // emerald
          break;
        case "Data & Visualization":
          color = 0x8b5cf6; // violet
          break;
        case "Research & Gen AI":
          color = 0xf59e0b; // amber
          break;
        default:
          color = 0x6366f1;
      }
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.8,
      });
      const node = new THREE.Mesh(geometry, material);
      node.position.copy(point);
      node.userData = { skill, index };
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
      
      brainRef.current.add(node);
      nodeRefs.current.set(skill.name, node);
    });
  }, [skillsData]);

  // Update connections when skill selection changes
  useEffect(() => {
    createConnections();
  }, [selectedSkill, createConnections]);

  // Animation loop
  useFrame(() => {
    if (!brainRef.current) return;

    const elapsedTime = timerRef.current.getElapsed() / 1000;

    // Slow rotation of the brain
    brainRef.current.rotation.y = elapsedTime * 0.1;
    brainRef.current.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;

    // Enhanced node animations
    nodeRefs.current.forEach((node, skillName) => {
      const skill = skillsData.find((s) => s.name === skillName);
      if (!skill) return;
      
      // Base pulse based on proficiency
      const basePulse = Math.sin(elapsedTime * 2 + skill.proficiency) * 0.1 + 1;
      
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
        const opacity = 0.3 + Math.sin(elapsedTime * 3 + index * 0.5) * 0.2;
        line.material.opacity = opacity;
      }
    });
  });

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
}
